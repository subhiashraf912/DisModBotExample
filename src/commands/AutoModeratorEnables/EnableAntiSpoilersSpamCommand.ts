import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiSpoilersSpamCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-spoilers-spam',
                  category: 'AutoModerator',
                  aliases: ['enableantispoilersspam'],
                  description:
                        'Using this command you can enable the anti spoilers spam system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}enable-anti-spoilers-spam`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiSpoilersSpam.enabled === true)
                  return message.channel.send(
                        'The anti spoilers spam system is already enabled!',
                  );
            autoModerator.antiSpoilersSpam.enabled = true;
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
                  'The anti spoilers spam system has been enabled!',
            );
      }
}
