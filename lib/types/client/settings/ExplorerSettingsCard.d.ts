/**
 * Settings → Plugins card for file explorer preferences.
 */
import { type ReactElement } from 'react';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { FileExplorerSettings } from '../../shared/settings-contract.ts';
export interface ExplorerSettingsCardProps extends PropsRuntime<'settings.plugin.item'> {
    readonly ctx: ClientContext;
    readonly scope: SettingsScope<FileExplorerSettings>;
}
/** Collapsed-by-default plugin configuration card. */
export declare function ExplorerSettingsCard(props: ExplorerSettingsCardProps): ReactElement | null;
//# sourceMappingURL=ExplorerSettingsCard.d.ts.map