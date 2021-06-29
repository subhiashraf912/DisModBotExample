import BaseEvent from '../../utils/structures/BaseEvent';
import { Message } from 'discord.js';
import DiscordClient from '../../classes/client';
import { GetPerms } from '../../utils/Functions';
export default class MessageEvent extends BaseEvent {
      constructor() {
            super('message');
      }

      async run(client: DiscordClient, message: Message) {
            if (message.author.bot) return;
            if (!message.guild) return;
            if (!client.configs.get(message.guild?.id)) return;
            const config = client.configs.get(message.guild.id);
            if (!config) return;
            const { prefix } = config;
            if (message.content.startsWith(prefix)) {
                  const [cmdName, ...cmdArgs] = message.content
                        .slice(prefix.length)
                        .trim()
                        .split(/\s+/);
                  let command =
                        client.commands.get(cmdName.toLowerCase()) ||
                        client.aliases.get(cmdName.toLowerCase());
                  if (command) {
                        const permissions = command.getPermissions();
                        permissions.forEach((perm) => {
                              if (!message.member?.hasPermission(perm))
                                    return message.channel.send(
                                          `You need \`${GetPerms(
                                                perm,
                                          )}\` Permissions to run this command!`,
                                    );
                              if (!message.guild?.me?.hasPermission(perm))
                                    return message.channel.send(
                                          `I need \`${GetPerms(
                                                perm,
                                          )}\` Permissions to run this command!`,
                                    );
                        });
                        command.run(client, message, cmdArgs);
                  }
            }
      }
}
