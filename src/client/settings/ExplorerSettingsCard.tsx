/**
 * Plugins page contribution for file explorer preferences.
 */

import { useCallback, useState, useSyncExternalStore, type ReactElement } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { FileExplorerSettings } from '../../shared/settings-contract.ts'
import { explorerT } from '../locales.ts'
import css from './settings-card.module.css'

export interface ExplorerSettingsCardProps extends PropsRuntime<'plugins.item'>, PropsLocale<'file-explorer'> {
  readonly ctx: ClientContext
  readonly scope: ConfigForm<FileExplorerSettings>
}

/** Summary one-liner or settings form body for the Plugins page. */
export function ExplorerSettingsCard(props: ExplorerSettingsCardProps): ReactElement | null {
  const { ctx, scope, view, t: slotT } = props
  const snap = useSyncExternalStore(scope.subscribe, () => scope.getSnapshot())
  const locale = useSyncExternalStore(
    (listener) => ctx.locale.subscribe(listener),
    () => ctx.locale.getSnapshot().active,
  )
  const t = explorerT(locale)
  const [draftRoot, setDraftRoot] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  if (view === 'summary') return slotT('settingsDescription')

  const available = snap.status === 'ready'
  const writable = snap.writable
  const value = snap.value
  if (!available || value === undefined) return null

  const rootValue = draftRoot ?? value.root
  const openLinks = value.openLinksInEditor

  const commitRoot = useCallback(async (): Promise<void> => {
    if (!writable || saving || draftRoot === null) return
    setSaving(true)
    try {
      await scope.set('root', draftRoot)
      setDraftRoot(null)
    } finally {
      setSaving(false)
    }
  }, [draftRoot, saving, scope, writable])

  const toggleLinks = useCallback(async (checked: boolean): Promise<void> => {
    if (!writable || saving) return
    setSaving(true)
    try {
      await scope.set('openLinksInEditor', checked)
    } finally {
      setSaving(false)
    }
  }, [saving, scope, writable])

  return (
    <div className={css.body}>
      {!writable ? <p className={css.readOnly} role="status">{t('readOnly')}</p> : null}
      <div className={css.field}>
        <label className={css.label} htmlFor="fe-root">{t('settingsRoot')}</label>
        <input
          id="fe-root"
          className={css.textInput}
          value={rootValue}
          disabled={!writable || saving}
          onChange={(event) => setDraftRoot(event.target.value)}
          onBlur={() => { void commitRoot() }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void commitRoot()
          }}
        />
        <p className={css.hint}>{t('settingsRootHint')}</p>
      </div>
      <div className={css.field}>
        <label className={writable ? css.row : `${css.row} ${css.rowDisabled}`}>
          <input
            className={css.checkbox}
            type="checkbox"
            checked={openLinks}
            disabled={!writable || saving}
            onChange={(event) => { void toggleLinks(event.target.checked) }}
          />
          <span>{t('settingsOpenLinks')}</span>
        </label>
        <p className={css.hint}>{t('settingsOpenLinksHint')}</p>
      </div>
    </div>
  )
}
