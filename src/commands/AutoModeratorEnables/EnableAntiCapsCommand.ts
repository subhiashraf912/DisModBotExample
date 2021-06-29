import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiCapsCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-caps',
                  category: 'AutoModerator',
                  aliases: ['enableanticaps'],
                  description:
                        'Using this command you can enable the anti caps system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}enable-anti-caps`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiCapsCheck.enabled === true)
                  return message.channel.send(
                        'The anti emoji spam system is already enabled!',
                  );
            autoModerator.antiCapsCheck.enabled = true;
            const newConfig: GuildConfigType =
                  await GuildConfig.findOneAndUpdate(
                        {
                              guildId: message.guild?.id,
                        },
                        {
                              autoModerator,
                        },
                        { new: true },
                  );
            client.configs.set(message.guild?.id, newConfig);
            await message.channel.send(
                  'The anti anti caps system has been enabled!',
            );
      }
}
