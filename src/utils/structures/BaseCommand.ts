import { Message, PermissionString } from 'discord.js';
import DiscordClient from '../../classes/client';
type settingsType = {
      name: string;
      category: string;
      aliases?: string[];
      description?: string;
      usage?: string;
      permissions?: PermissionString[];
};
export default abstract class BaseCommand {
      constructor(private settings: settingsType) {}

      getName(): string {
            return this.settings.name.toLowerCase();
      }
      getCategory(): string {
            return this.settings.category.toLowerCase();
      }
      getAliases(): Array<string> {
            return this.settings.aliases || [];
      }
      getPermissions(): PermissionString[] {
            return this.settings.permissions || [];
      }
      getDescription(): string {
            return this.settings.description || 'No Description!';
      }
      getUsage(): string {
            return this.settings.usage || 'No Usage!';
      }

      abstract run(
            client: DiscordClient,
            message: Message,
            args: Array<string> | null,
      ): Promise<any>;
}
