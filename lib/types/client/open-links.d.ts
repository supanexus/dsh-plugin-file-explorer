/**
 * Capture clicks on conversation file-looking links and open them in the editor.
 */
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { FileExplorerSettings } from '../shared/settings-contract.ts';
/**
 * Install a capture-phase click interceptor while settings allow it.
 * @returns disposer.
 */
export declare function installOpenLinksInterceptor(scope: ConfigForm<FileExplorerSettings>): () => void;
//# sourceMappingURL=open-links.d.ts.map