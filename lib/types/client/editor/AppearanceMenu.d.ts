/**
 * Popover for Monaco theme + custom hex background + font size + saved schemes.
 */
import { type ReactElement } from 'react';
import type { ExplorerTranslate } from '../locales.ts';
import type { EditorAppearance, EditorAppearanceStore } from './appearance.ts';
export interface AppearanceMenuProps {
    readonly t: ExplorerTranslate;
    readonly appearance: EditorAppearance;
    readonly store: EditorAppearanceStore;
    readonly onClose: () => void;
}
/**
 * Floating panel: preset themes, custom HTML hex, font size, saved schemes.
 */
export declare function AppearanceMenu(props: AppearanceMenuProps): ReactElement;
//# sourceMappingURL=AppearanceMenu.d.ts.map