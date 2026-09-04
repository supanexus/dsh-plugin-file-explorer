/** Local SlotMap augmentation for settings.plugin.item. */

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'settings.plugin.item': {
      kind: 'keyed'
      scope: 'root'
      owner: { children?: never }
    }
  }

  interface LocaleNamespaceMap {
    'file-explorer': import('../locales.ts').ExplorerKey
  }
}

export {}
