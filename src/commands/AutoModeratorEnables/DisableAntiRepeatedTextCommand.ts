import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class DisableAntiRepeatedTextCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'disable-anti-repeated-text',
                  category: 'AutoModerator',
                  aliases: ['disableantirepeatedtext'],
                  description:
                        'Using this command you can disable the anti repeated text system using DisMod module!',
                  permissions: ['ADMINISTRATOR'],
                  usage: `{prefix}disable-anti-repeated-text`,
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiRepeatedText.enabled === false)
                  return message.channel.send(
                        'The anti repeated text system is already disabled!',
                  );
            autoModerator.antiRepeatedText.enabled = false;
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
                  'The anti repeated text system has been disabled!',
            );
      }
}
