import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class DisableAntiCapsCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'disable-anti-caps-delete-message',
                  category: 'AutoModerator',
                  aliases: [],
                  permissions: ['ADMINISTRATOR'],
            });
      }
      async run(client: DiscordClient, message: Message, args: Array<string>) {
            if (!message.guild || !message.member) return;
            const config = client.configs.get(message.guild?.id);
            if (!config) return;
            const { autoModerator } = config;
            if (autoModerator.antiCapsCheck.deleteMessage === false)
                  return message.channel.send(
                        'lazy to type :v replace this with your message',
                  );
            autoModerator.antiCapsCheck.deleteMessage = false;
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
                  'lazy to type :v replace this with your message',
            );
      }
}
