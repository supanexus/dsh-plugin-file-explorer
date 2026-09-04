/**
 * Single tree node with lazy children; rename/create via inline edit + context menu.
 */
import { type ReactElement } from 'react';
import type { ExplorerApi } from '../rpc.ts';
import type { FsEntry } from '../../shared/rpc-contract.ts';
import type { ExplorerTranslate } from '../locales.ts';
export interface TreeNodeProps {
    readonly entry: FsEntry;
    readonly depth: number;
    readonly api: ExplorerApi;
    readonly t: ExplorerTranslate;
    readonly activePath: string | null;
    readonly selectedPath: string | null;
    readonly onSelect: (path: string) => void;
    readonly onOpenFile: (path: string) => void;
    readonly onError: (message: string) => void;
    readonly onTreeMutated: () => void;
    readonly refreshToken: number;
    /** Bumped by toolbar «expand all»; non-zero values force directories open. */
    readonly expandSignal: number;
    /** Bumped by toolbar «collapse all»; non-zero values force directories closed. */
    readonly collapseSignal: number;
}
/**
 * Render one filesystem entry; directories expand lazily via `api.list`.
 */
export declare function TreeNode(props: TreeNodeProps): ReactElement;
//# sourceMappingURL=TreeNode.d.ts.map