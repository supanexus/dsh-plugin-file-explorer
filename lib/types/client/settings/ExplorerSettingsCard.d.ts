/**
 * Plugins page contribution for file explorer preferences.
 */
import { type ReactElement } from 'react';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { FileExplorerSettings } from '../../shared/settings-contract.ts';
export interface ExplorerSettingsCardProps extends PropsRuntime<'plugins.item'>, PropsLocale<'file-explorer'> {
    readonly ctx: ClientContext;
    readonly scope: ConfigForm<FileExplorerSettings>;
}
/** Summary one-liner or settings form body for the Plugins page. */
export declare function ExplorerSettingsCard(props: ExplorerSettingsCardProps): ReactElement | null;
//# sourceMappingURL=ExplorerSettingsCard.d.ts.map