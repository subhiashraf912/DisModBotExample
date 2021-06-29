import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiFastMessageSpamCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-fast-message-spam',
                  category: 'AutoModerator',
                  aliases: ['enableantifastmessagespams'],
                  description:
                        'Using this command you can enable the anti fast message spam system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}enable-anti-fast-message-spam`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiFastMessageSpam.enabled === true)
                  return message.channel.send(
                        'The anti fast message spam system is already enabled!',
                  );
            autoModerator.antiFastMessageSpam.enabled = true;
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
                  'The anti fast message spam system has been enabled!',
            );
      }
}
