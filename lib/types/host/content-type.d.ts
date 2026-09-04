/**
 * Decide whether a path should be treated as editable text.
 */
/**
 * Extension-based text hint (case-insensitive). Dotfiles without extension
 * that match known names are treated as text.
 */
export declare function isLikelyTextPath(filePath: string): boolean;
/**
 * Probe a buffer for a NUL byte (strong binary signal).
 */
export declare function bufferLooksBinary(sample: Uint8Array): boolean;
/**
 * Combined decision: known text extension → text; otherwise probe sample.
 */
export declare function isEditableText(filePath: string, sample: Uint8Array): boolean;
//# sourceMappingURL=content-type.d.ts.map