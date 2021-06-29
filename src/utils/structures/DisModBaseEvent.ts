import DiscordClient from '../../classes/client';
import { AutoModeratorManagerEvents } from 'dismod/src/interfaces';
export default abstract class DisModBaseEvent {
      constructor(private name: keyof AutoModeratorManagerEvents) {}

      getName(): keyof AutoModeratorManagerEvents {
            return this.name;
      }
      abstract run(client: DiscordClient, ...args: any): Promise<void>;
}
