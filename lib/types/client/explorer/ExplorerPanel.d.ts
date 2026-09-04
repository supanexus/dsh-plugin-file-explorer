/**
 * Sidebar explorer panel: workspace header + icon actions + root listing.
 */
import { type ReactElement } from 'react';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ExplorerApi } from '../rpc.ts';
import type { TabsStore } from '../state/tabs.ts';
export interface ExplorerPanelProps {
    readonly ctx: ClientContext;
    readonly api: ExplorerApi;
    readonly tabs: TabsStore;
    readonly onOpenFile: (path: string) => void;
    readonly onRenamed?: (from: string, to: string) => void;
}
/**
 * Root listing with create-file / create-dir actions.
 */
export declare function ExplorerPanel(props: ExplorerPanelProps): ReactElement;
//# sourceMappingURL=ExplorerPanel.d.ts.map