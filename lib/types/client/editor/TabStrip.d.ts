/**
 * Tab strip for open editor buffers, with close + context-menu actions.
 */
import { type ReactElement } from 'react';
import type { EditorTab } from '../state/tabs.ts';
import type { BuffersStore } from '../state/buffers.ts';
import type { ExplorerTranslate } from '../locales.ts';
export interface TabStripProps {
    readonly tabs: readonly EditorTab[];
    readonly activePath: string | null;
    readonly buffers: BuffersStore;
    readonly t: ExplorerTranslate;
    readonly onActivate: (path: string) => void;
    readonly onClose: (path: string) => void;
    readonly onClosePaths: (paths: readonly string[]) => void;
}
/**
 * Horizontal list of open paths with dirty marks, close buttons, and
 * right-click: close / close to the right / close all.
 */
export declare function TabStrip(props: TabStripProps): ReactElement;
//# sourceMappingURL=TabStrip.d.ts.map