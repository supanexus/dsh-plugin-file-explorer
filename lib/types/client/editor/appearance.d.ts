/**
 * Persisted Monaco / textarea appearance (theme, optional custom bg, font size, schemes).
 * Intentionally not named themeStore — keep clear of upstream naming.
 */
export type EditorChromeTheme = 'vs-dark' | 'vs' | 'hc-black';
/** Saved color + font pair (localStorage). */
export interface AppearanceScheme {
    readonly id: string;
    readonly background: string;
    readonly fontSize: number;
}
export interface EditorAppearance {
    readonly theme: EditorChromeTheme;
    /** Custom editor background as `#RGB` / `#RRGGBB` / `#RRGGBBAA`; null uses preset theme. */
    readonly customBackground: string | null;
    readonly fontSize: number;
    readonly schemes: readonly AppearanceScheme[];
}
export type AppearanceListener = () => void;
/** Normalize and validate an HTML hex color; returns null when invalid. */
export declare function normalizeHexColor(raw: string): string | null;
/** Color input (`#rrggbb`) value derived from a stored custom color. */
export declare function hexForColorInput(custom: string | null, theme: EditorChromeTheme): string;
/**
 * Mutable appearance prefs with subscribe semantics for React.
 * `getSnapshot` MUST return a stable reference between mutations.
 */
export declare class EditorAppearanceStore {
    #private;
    getSnapshot: () => EditorAppearance;
    subscribe: (listener: AppearanceListener) => (() => void);
    /** Load from localStorage once on the client. */
    hydrate(): void;
    setTheme(theme: EditorChromeTheme): void;
    /**
     * Set or clear a custom background hex.
     * @returns whether the value was accepted (invalid hex ignored when non-empty).
     */
    setCustomBackground(raw: string | null): boolean;
    setFontSize(size: number): void;
    bumpFont(delta: number): void;
    /**
     * Persist current color + font as a named scheme.
     * @param backgroundOverride optional hex (e.g. menu draft) instead of current store color.
     * @returns whether a scheme was written.
     */
    saveScheme(backgroundOverride?: string): boolean;
    /** Apply a saved scheme (color + font). */
    applyScheme(id: string): boolean;
    removeScheme(id: string): void;
}
export declare const EDITOR_FONT_MIN = 11;
export declare const EDITOR_FONT_MAX = 24;
export declare const EDITOR_THEMES: readonly EditorChromeTheme[];
export declare const EDITOR_CUSTOM_THEME_ID = "supanexus-file-explorer-custom";
export declare const EDITOR_SCHEMES_MAX = 12;
//# sourceMappingURL=appearance.d.ts.map