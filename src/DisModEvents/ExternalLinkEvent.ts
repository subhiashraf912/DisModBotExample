import { Guild, GuildMember, Message, User } from 'discord.js';
import DiscordClient from '../classes/client';
import WarnsSchema from '../utils/MongoDB/Models/WarnsSchema';
import DisModBaseEvent from '../utils/structures/DisModBaseEvent';
import { warn } from '../utils/Types';
export default class ExternalLinkEvent extends DisModBaseEvent {
      constructor() {
            super('externalLink');
      }

      async run(client: DiscordClient, message: Message, links: string[]) {
            if (!message.guild) return;
            const { member } = message;
            const config = client.configs.get(message.guild.id);
            if (!config) return;
            let continueEvent = false;
            config.autoModerator.antiExternalLink.externalLinks.forEach(
                  (link) => {
                        links.forEach((l) => {
                              if (
                                    link
                                          .toLowerCase()
                                          .includes(
                                                l
                                                      .toLowerCase()
                                                      .replace('https://', '')
                                                      .replace('http://', '')
                                                      .replace('www.', ''),
                                          )
                              )
                                    continueEvent = true;
                        });
                  },
            );
            if (!continueEvent) return;
            if (config?.autoModerator.antiExternalLink.enabled) {
                  if (config?.autoModerator.antiExternalLink.warnMember) {
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
                              reason: 'Sending external links!',
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
                  if (config?.autoModerator.antiExternalLink.deleteMessage) {
                        message.deletable && (await message.delete());
                  }
            }
      }
}
