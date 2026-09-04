/**
 * Floating context menu for explorer rows (rename / delete).
 */
import { type ReactElement } from 'react';
export interface ContextMenuItem {
    readonly id: string;
    readonly label: string;
    readonly danger?: boolean;
    readonly disabled?: boolean;
    readonly onSelect: () => void;
}
export interface ExplorerContextMenuProps {
    readonly x: number;
    readonly y: number;
    readonly items: readonly ContextMenuItem[];
    readonly onClose: () => void;
}
/**
 * Fixed-position menu; closes on outside click, Escape, or item select.
 */
export declare function ExplorerContextMenu(props: ExplorerContextMenuProps): ReactElement;
//# sourceMappingURL=ExplorerContextMenu.d.ts.map