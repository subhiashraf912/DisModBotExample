import DiscordClient from '../../classes/client';
import { Manager } from 'dismod';
import { GuildConfig } from '../MongoDB/Models';
import { GuildConfig as GuildConfigType, WarnsConfig } from '../Types';
import WarnsSchema from '../MongoDB/Models/WarnsSchema';
export const InitModules = async (client: DiscordClient): Promise<void> => {
      await client.mongoose();
      client.AutoModerator = new Manager(client, {
            adminCheck: false,
            botCheck: false,
      });
};

export const InitCache = async (client: DiscordClient): Promise<void> => {
      const guilds = client.guilds.cache.array();
      for (const guild of guilds) {
            const guildId = guild.id;
            const guildConfigDB: GuildConfigType = await GuildConfig.findOne({
                  guildId,
            });
            if (guildConfigDB) {
                  await client.configs.set(guildId, guildConfigDB);
            } else {
                  const config: GuildConfigType = await GuildConfig.create({
                        guildId,
                        prefix: process.env.PREFIX || '.',
                  });
                  await client.configs.set(guildId, config);
            }
            const guildWarnsDB: WarnsConfig[] = await WarnsSchema.find({
                  guild: guildId,
            });
            if (guildWarnsDB) {
                  guildWarnsDB.forEach((warn) => {
                        client.warns.set(`${warn.user}-${warn.guild}`, warn);
                  });
            }
      }
};
