/**
 * Center-column editor: tabs + Monaco/textarea + markdown preview.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactElement,
} from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ExplorerApi } from '../rpc.ts'
import type { TabsStore } from '../state/tabs.ts'
import type { BuffersStore } from '../state/buffers.ts'
import { isMarkdownPath, type MdModeStore } from '../state/md-mode.ts'
import { useExplorerT } from '../use-explorer-t.ts'
import { languageForPath, loadMonaco, type MonacoEditorApi } from './monaco-loader.ts'
import { EDITOR_CUSTOM_THEME_ID, EditorAppearanceStore } from './appearance.ts'
import { applyMonacoAppearance } from './apply-monaco-appearance.ts'
import { AppearanceMenu } from './AppearanceMenu.tsx'
import { TabStrip } from './TabStrip.tsx'
import { MarkdownPreview } from './MarkdownPreview.tsx'
import css from './editor.module.css'

export interface EditorSurfaceProps {
  readonly ctx: ClientContext
  readonly api: ExplorerApi
  readonly tabs: TabsStore
  readonly buffers: BuffersStore
  readonly mdModes: MdModeStore
}

const appearanceStore = new EditorAppearanceStore()

/**
 * Multi-tab editor surface bound to explorer RPC + local stores.
 */
export function EditorSurface(props: EditorSurfaceProps): ReactElement {
  const { ctx, api, tabs, buffers, mdModes } = props
  const t = useExplorerT(ctx)
  const tabState = useSyncExternalStore(tabs.subscribe, tabs.getSnapshot)
  useSyncExternalStore(buffers.subscribe, () => buffers.get(tabState.activePath ?? '')?.content ?? '')
  useSyncExternalStore(mdModes.subscribe, () => (
    tabState.activePath === null ? 'source' : mdModes.get(tabState.activePath)
  ))
  const appearance = useSyncExternalStore(appearanceStore.subscribe, appearanceStore.getSnapshot)

  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('')
  const [monacoReady, setMonacoReady] = useState(false)
  const [monacoFailed, setMonacoFailed] = useState(false)
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  const hostRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<MonacoEditorApi | null>(null)
  const applyingExternal = useRef(false)
  const activePath = tabState.activePath
  const buffer = activePath === null ? undefined : buffers.get(activePath)
  const mdMode = activePath !== null && isMarkdownPath(activePath)
    ? mdModes.get(activePath)
    : 'source'

  useLayoutEffect(() => {
    appearanceStore.hydrate()
  }, [])

  const openPath = useCallback(async (path: string): Promise<void> => {
    tabs.open(path)
    if (buffers.get(path) !== undefined) return
    const result = await api.read(path)
    if (!result.ok) {
      setError(result.error.message)
      tabs.close(path)
      return
    }
    setError(null)
    buffers.load(path, result.value.content)
  }, [api, buffers, tabs])

  useEffect(() => {
    const handler = (event: Event): void => {
      const detail = (event as CustomEvent<{ path: string }>).detail
      if (detail?.path) void openPath(detail.path)
    }
    window.addEventListener('file-explorer:open', handler as EventListener)
    return () => window.removeEventListener('file-explorer:open', handler as EventListener)
  }, [openPath])

  const saveActive = useCallback(async (): Promise<void> => {
    if (activePath === null) return
    const entry = buffers.get(activePath)
    if (entry === undefined) return
    const result = await api.write(activePath, entry.content)
    if (!result.ok) {
      setError(result.error.message)
      return
    }
    buffers.markSaved(activePath)
    setError(null)
    setStatus(t('editorSaved'))
    window.setTimeout(() => setStatus(''), 1200)
  }, [activePath, api, buffers, t])

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        void saveActive()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [saveActive])

  useEffect(() => {
    let cancelled = false
    void loadMonaco()
      .then(() => {
        if (!cancelled) setMonacoReady(true)
      })
      .catch(() => {
        if (!cancelled) setMonacoFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!monacoReady || monacoFailed || hostRef.current === null || activePath === null) {
      editorRef.current?.dispose()
      editorRef.current = null
      return
    }
    if (mdMode === 'preview') {
      editorRef.current?.dispose()
      editorRef.current = null
      return
    }

    let disposed = false
    const snap = appearanceStore.getSnapshot()
    void loadMonaco().then((monaco) => {
      if (disposed || hostRef.current === null) return
      editorRef.current?.dispose()
      const content = buffers.get(activePath)?.content ?? ''
      applyMonacoAppearance(monaco, snap)
      const editor = monaco.editor.create(hostRef.current, {
        value: content,
        language: languageForPath(activePath),
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: snap.fontSize,
        theme: snap.customBackground === null ? snap.theme : EDITOR_CUSTOM_THEME_ID,
        scrollBeyondLastLine: false,
      })
      editorRef.current = editor
      editor.onDidChangeModelContent(() => {
        if (applyingExternal.current) return
        buffers.setContent(activePath, editor.getValue())
      })
    })

    return () => {
      disposed = true
      editorRef.current?.dispose()
      editorRef.current = null
    }
  }, [monacoReady, monacoFailed, activePath, mdMode, buffers])

  // Live-apply theme / custom bg / font without remounting the model.
  useEffect(() => {
    if (!monacoReady || monacoFailed) return
    void loadMonaco().then((monaco) => {
      applyMonacoAppearance(monaco, appearance)
      editorRef.current?.updateOptions({ fontSize: appearance.fontSize })
    })
  }, [appearance.theme, appearance.customBackground, appearance.fontSize, monacoReady, monacoFailed])

  useEffect(() => {
    if (activePath === null || editorRef.current === null) return
    const next = buffers.get(activePath)?.content ?? ''
    if (editorRef.current.getValue() === next) return
    applyingExternal.current = true
    try {
      editorRef.current.setValue(next)
    } finally {
      applyingExternal.current = false
    }
  }, [activePath, buffer?.content, buffers])

  const dropTab = useCallback((path: string): void => {
    tabs.close(path)
    buffers.drop(path)
    mdModes.drop(path)
  }, [buffers, mdModes, tabs])

  const onClose = useCallback((path: string): void => {
    if (buffers.isDirty(path)) {
      if (!window.confirm(t('confirmCloseDirty'))) return
    }
    dropTab(path)
  }, [buffers, dropTab, t])

  const onClosePaths = useCallback((paths: readonly string[]): void => {
    if (paths.length === 0) return
    const dirty = paths.some((path) => buffers.isDirty(path))
    if (dirty && !window.confirm(t('confirmCloseDirty'))) return
    for (const path of paths) dropTab(path)
  }, [buffers, dropTab, t])

  if (tabState.open.length === 0 || activePath === null) {
    return (
      <div className={css.surface} data-file-explorer-editor="">
        <div className={css.empty}>{t('editorEmpty')}</div>
      </div>
    )
  }

  return (
    <div className={css.surface} data-file-explorer-editor="">
      <TabStrip
        tabs={tabState.open}
        activePath={activePath}
        buffers={buffers}
        t={t}
        onActivate={(path) => tabs.activate(path)}
        onClose={onClose}
        onClosePaths={onClosePaths}
      />
      {error !== null ? <div className={css.errorBanner}>{error}</div> : null}
      <div className={css.toolbar}>
        <button type="button" className={css.toolBtn} onClick={() => void saveActive()}>
          {t('editorSave')}
        </button>
        {isMarkdownPath(activePath) ? (
          <>
            <button
              type="button"
              className={mdMode === 'source' ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn}
              onClick={() => mdModes.set(activePath, 'source')}
            >
              {t('editorSource')}
            </button>
            <button
              type="button"
              className={mdMode === 'preview' ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn}
              onClick={() => mdModes.set(activePath, 'preview')}
            >
              {t('editorPreview')}
            </button>
          </>
        ) : null}
        <span className={css.status}>
          {status || (monacoFailed ? t('editorTextareaMode') : '')}
        </span>
        <div className={css.toolbarEnd}>
          <button
            type="button"
            className={appearanceOpen ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn}
            aria-expanded={appearanceOpen}
            aria-haspopup="dialog"
            onClick={() => setAppearanceOpen((open) => !open)}
          >
            {t('editorAppearance')}
          </button>
          {appearanceOpen ? (
            <AppearanceMenu
              t={t}
              appearance={appearance}
              store={appearanceStore}
              onClose={() => setAppearanceOpen(false)}
            />
          ) : null}
        </div>
      </div>
      <div className={css.pathBar} title={activePath} aria-label={t('editorFilePath')}>
        {activePath}
      </div>
      <div className={css.body}>
        {mdMode === 'preview' ? (
          <MarkdownPreview content={buffer?.content ?? ''} />
        ) : monacoReady && !monacoFailed ? (
          <div className={css.monacoHost} ref={hostRef} />
        ) : (
          <textarea
            className={css.textarea}
            style={{
              fontSize: appearance.fontSize,
              ...(appearance.customBackground !== null
                ? { background: appearance.customBackground }
                : {}),
            }}
            value={buffer?.content ?? ''}
            onChange={(event) => buffers.setContent(activePath, event.target.value)}
            spellCheck={false}
          />
        )}
      </div>
    </div>
  )
}

/** Dispatch a cross-component open request. */
export function requestOpenPath(path: string): void {
  window.dispatchEvent(new CustomEvent('file-explorer:open', { detail: { path } }))
}
