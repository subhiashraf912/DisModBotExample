import { Guild, GuildMember, Message, User } from 'discord.js';
import DiscordClient from '../classes/client';
import WarnsSchema from '../utils/MongoDB/Models/WarnsSchema';
import DisModBaseEvent from '../utils/structures/DisModBaseEvent';
import { GuildConfig, warn } from '../utils/Types';
export default class EmojiSpamEvent extends DisModBaseEvent {
      constructor() {
            super('emojisSpam');
      }

      async run(client: DiscordClient, message: Message, emojisCount: number) {
            if (!message.guild) return;
            const { member } = message;
            const config = client.configs.get(message.guild.id);
            if (!config) return;
            if (
                  emojisCount <
                  (config as GuildConfig).autoModerator.antiEmojiSpam
                        .maxEmojisCount
            )
                  return;
            if (config?.autoModerator.antiEmojiSpam.enabled) {
                  if (config?.autoModerator.antiEmojiSpam.warnMember) {
                        let warns = client.warns.find(
                              (warn) =>
                                    warn.user === (member as GuildMember).id &&
                                    warn.guild === (message.guild as Guild).id,
                        );
                        if (!warns) {
                              warns = await WarnsSchema.findOne({
                                    user: (member as GuildMember).id,
                                    guild: message.guild.id,
                              });
                              if (!warns) {
                                    warns = {
                                          user: (member as GuildMember).id,
                                          guild: message.guild.id,
                                          botWarns: [],
                                          humanWarns: [],
                                    };
                                    await WarnsSchema.create(warns);
                              }
                        }
                        const newWarn: warn = {
                              reason: 'Sending a lot of emojis!',
                              date: Date.now(),
                              moderator: (client.user as User).id,
                        };
                        warns.botWarns.push(newWarn);
                        await WarnsSchema.findOneAndUpdate(
                              {
                                    user: (member as GuildMember).id,
                                    guild: message.guild.id,
                              },
                              warns,
                        );
                        client.warns.set(
                              `${(member as GuildMember).id}-${
                                    message.guild.id
                              }`,
                              warns,
                        );
                        if (
                              config.maxBotWarns &&
                              config.maxBotWarns !== 0 &&
                              config.maxBotWarns >= warns.botWarns.length
                        ) {
                              member?.bannable &&
                                    (await member.ban({
                                          reason: 'Reached the max warnings count!',
                                    }));
                        }
                  }
                  if (config?.autoModerator.antiEmojiSpam.deleteMessage) {
                        message.deletable && (await message.delete());
                  }
            }
      }
}
