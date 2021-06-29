import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiEmojiSpamCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-external-links',
                  category: 'AutoModerator',
                  aliases: ['enableantiexternallinks'],
                  description:
                        'Using this command you can enable the anti external links system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}enable-anti-emoji-spam`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiExternalLink.enabled === true)
                  return message.channel.send(
                        'The anti external links system is already enabled!',
                  );
            autoModerator.antiExternalLink.enabled = true;
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
                  'The anti external links system has been enabled!',
            );
      }
}
