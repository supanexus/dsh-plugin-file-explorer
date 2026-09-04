/**
 * Center-column editor: tabs + Monaco/textarea + markdown preview.
 */
import { type ReactElement } from 'react';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ExplorerApi } from '../rpc.ts';
import type { TabsStore } from '../state/tabs.ts';
import type { BuffersStore } from '../state/buffers.ts';
import { type MdModeStore } from '../state/md-mode.ts';
export interface EditorSurfaceProps {
    readonly ctx: ClientContext;
    readonly api: ExplorerApi;
    readonly tabs: TabsStore;
    readonly buffers: BuffersStore;
    readonly mdModes: MdModeStore;
}
/**
 * Multi-tab editor surface bound to explorer RPC + local stores.
 */
export declare function EditorSurface(props: EditorSurfaceProps): ReactElement;
/** Dispatch a cross-component open request. */
export declare function requestOpenPath(path: string): void;
//# sourceMappingURL=EditorSurface.d.ts.map