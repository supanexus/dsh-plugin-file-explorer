/** Compact toolbar icons for the explorer header. */

import type { ReactElement } from 'react'
import css from './explorer.module.css'

function IconShell(props: { readonly children: ReactElement; readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <button
      type="button"
      className={css.iconBtn}
      title={props.title}
      aria-label={props.title}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

const svgProps = {
  className: css.toolIcon,
  viewBox: '0 0 16 16',
  fill: 'none',
  'aria-hidden': true as const,
}

/** Document with corner plus — new file. */
export function NewFileIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path d="M4 2.5h5.2L12 5.3V13.5H4V2.5Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 2.5V5.5H12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 8v4M6 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </IconShell>
  )
}

/** Folder with plus — new folder. */
export function NewFolderIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path
          d="M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M9.5 7.8v3.2M7.9 9.4h3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </IconShell>
  )
}

/** Circular arrows — refresh. */
export function RefreshIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path
          d="M13 8a5 5 0 1 1-1.4-3.4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M13 3.2V6.5H9.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  )
}

/** Nested chevrons — expand all. */
export function ExpandAllIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path d="M3 4.5 8 9l5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 8.5 8 13l5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  )
}

/** Nested chevrons up — collapse all. */
export function CollapseAllIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path d="M3 7.5 8 3l5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11.5 8 7l5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  )
}

/** Plain folder — reveal in OS file manager. */
export function RevealIconButton(props: { readonly title: string; readonly onClick: () => void }): ReactElement {
  return (
    <IconShell title={props.title} onClick={props.onClick}>
      <svg {...svgProps}>
        <path
          d="M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </IconShell>
  )
}
