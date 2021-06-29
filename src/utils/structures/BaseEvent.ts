import { ClientEvents } from 'discord.js';
import DiscordClient from '../../classes/client';

export default abstract class BaseEvent {
      constructor(private name: keyof ClientEvents) {}

      getName(): string {
            return this.name;
      }
      abstract run(client: DiscordClient, ...args: any): void;
}
