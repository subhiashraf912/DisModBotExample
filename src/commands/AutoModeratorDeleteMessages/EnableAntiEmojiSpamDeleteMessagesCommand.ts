import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../../utils/MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../../utils/Types';

export default class EnableAntiEmojiSpamCommand extends BaseCommand {
      constructor() {
            super({
                  name: 'enable-anti-emoji-spam-message-delete',
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
            if (autoModerator.antiEmojiSpam.deleteMessage === true)
                  return message.channel.send(
                        'lazy to type :v replace this with your message',
                  );
            autoModerator.antiEmojiSpam.deleteMessage = true;
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
