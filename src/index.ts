import {
      registerCommands,
      registerEvents,
      registerAutoModeratorEvents,
} from './utils/registry';
import DiscordClient from './classes/client';
import { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { InitCache, InitModules } from './utils/Initializers';
const intents = new Intents([Intents.ALL]);
const client = new DiscordClient({
      partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
      ws: { intents },
});
dotenv.config();
(async () => {
      await registerCommands(client, '../commands');
      await registerEvents(client, '../events');
      await InitModules(client);
      await registerAutoModeratorEvents(client, '../DisModEvents');
      await client.login(process.env.BOT_TOKEN);
      await InitCache(client);
})();
