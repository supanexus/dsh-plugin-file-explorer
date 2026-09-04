/**
 * Shared basename sanitizer and inline name editor for the file tree.
 */
import { type ReactElement } from 'react';
/** Reject empty / path-segment / traversal names; strip parent path if pasted. */
export declare function sanitizeBasename(raw: string): string | null;
export interface InlineNameInputProps {
    readonly depth: number;
    readonly kind: 'file' | 'dir';
    readonly initialValue: string;
    readonly placeholder: string;
    readonly ariaLabel: string;
    readonly onCommit: (name: string) => void;
    readonly onCancel: () => void;
}
/**
 * Tree row with a focused text field. Enter commits; Escape cancels;
 * blur commits when non-empty, otherwise cancels.
 */
export declare function InlineNameInput(props: InlineNameInputProps): ReactElement;
//# sourceMappingURL=InlineNameInput.d.ts.map