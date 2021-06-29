import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiBadWordsCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-bad-words',
                  category: 'AutoModerator',
                  aliases: ['enableantibadwords'],
                  description:
                        'Using this command you can enable the anti bad words system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}enable-anti-bad-words`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiBadWords.enabled === true)
                  return message.channel.send(
                        'The anti bad words system is already enabled!',
                  );
            autoModerator.antiBadWords.enabled = true;
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
                  'The anti bad words system has been enabled!',
            );
      }
}
