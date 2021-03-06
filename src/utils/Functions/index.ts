import {
      Guild,
      GuildChannel,
      GuildMember,
      Message,
      PermissionString,
      User,
} from 'discord.js';
import DiscordClient from '../../classes/client';
import { GuildConfig } from '../MongoDB/Models';
import { GuildConfig as GuildConfigType } from '../Types';

export const GetBirthday = (bd: string) => {
      let day = bd.split('-')[0];
      let month = bd.split('-')[1];
      let year = bd.split('-')[2];

      if (month === '1' || month === '01') month = 'January';
      if (month === '2' || month === '02') month = 'February';
      if (month === '3' || month === '03') month = 'March';
      if (month === '4' || month === '04') month = 'April';
      if (month === '5' || month === '05') month = 'May';
      if (month === '6' || month === '06') month = 'June';
      if (month === '7' || month === '07') month = 'July';
      if (month === '8' || month === '08') month = 'August';
      if (month === '9' || month === '09') month = 'September';
      if (month === '10') month = 'October';
      if (month === '11') month = 'November';
      if (month === '12') month = 'December';

      if (day === '1' || day === '01') day = '1st';
      if (day === '2' || day === '02') day = '2nd';
      if (day === '3' || day === '03') day = '3rd';
      if (day === '4' || day === '04') day = '4th';
      if (day === '5' || day === '05') day = '5th';
      if (day === '6' || day === '06') day = '6th';
      if (day === '7' || day === '07') day = '7th';
      if (day === '8' || day === '08') day = '8th';
      if (day === '9' || day === '09') day = '9th';
      if (day === '10') day = '10th';
      if (day === '11') day = '11th';
      if (day === '12') day = '12th';
      if (day === '13') day = '13th';
      if (day === '14') day = '14th';
      if (day === '15') day = '15th';
      if (day === '16') day = '16th';
      if (day === '17') day = '17th';
      if (day === '18') day = '18th';
      if (day === '19') day = '19th';
      if (day === '20') day = '20th';
      if (day === '21') day = '21st';
      if (day === '22') day = '22nd';
      if (day === '23') day = '23rd';
      if (day === '24') day = '24th';
      if (day === '25') day = '25th';
      if (day === '26') day = '26th';
      if (day === '27') day = '27th';
      if (day === '28') day = '28th';
      if (day === '29') day = '29th';
      if (day === '30') day = '30th';
      if (day === '31') day = '31st';
      return `${day} of ${month} ${year}`;
};

export const GetPerms = (perms: PermissionString) => {
      let NewPermissionsText = '';
      if (perms === 'ADD_REACTIONS') NewPermissionsText = 'Add Reactions';
      else if (perms === 'ADMINISTRATOR') NewPermissionsText = 'Administartor';
      else if (perms === 'ATTACH_FILES') NewPermissionsText = 'Attach Files';
      else if (perms === 'BAN_MEMBERS') NewPermissionsText = 'Ban Members';
      else if (perms === 'CHANGE_NICKNAME')
            NewPermissionsText = 'Change Nickname';
      else if (perms === 'CONNECT')
            NewPermissionsText = 'Connect to voice chat';
      else if (perms === 'CREATE_INSTANT_INVITE')
            NewPermissionsText = 'Create Invite';
      else if (perms === 'DEAFEN_MEMBERS')
            NewPermissionsText = 'Deafen Members';
      else if (perms === 'EMBED_LINKS') NewPermissionsText = 'Embed Links';
      else if (perms === 'KICK_MEMBERS') NewPermissionsText = 'Kick Members';
      else if (perms === 'MANAGE_CHANNELS')
            NewPermissionsText = 'Manage Channels';
      else if (perms === 'MANAGE_EMOJIS') NewPermissionsText = 'Manage Emojis';
      else if (perms === 'MANAGE_GUILD') NewPermissionsText = 'Manage Server';
      else if (perms === 'MANAGE_MESSAGES')
            NewPermissionsText = 'Manage Messages';
      else if (perms === 'MANAGE_NICKNAMES')
            NewPermissionsText = 'Manage Nicknames';
      else if (perms === 'MANAGE_ROLES') NewPermissionsText = 'Manage Roles';
      else if (perms === 'MANAGE_WEBHOOKS')
            NewPermissionsText = 'Manage Webhooks';
      else if (perms === 'MENTION_EVERYONE')
            NewPermissionsText = 'Mention Everyone';
      else if (perms === 'MOVE_MEMBERS') NewPermissionsText = 'Move Members';
      else if (perms === 'MUTE_MEMBERS') NewPermissionsText = 'Mute Members';
      else if (perms === 'PRIORITY_SPEAKER')
            NewPermissionsText = 'Priority Speaker';
      else if (perms === 'READ_MESSAGE_HISTORY')
            NewPermissionsText = 'Read Message History';
      else if (perms === 'SEND_MESSAGES') NewPermissionsText = 'Send Messages';
      else if (perms === 'SEND_TTS_MESSAGES')
            NewPermissionsText = 'Send TTS Messages';
      else if (perms === 'SPEAK') NewPermissionsText = 'Speak';
      else if (perms === 'STREAM') NewPermissionsText = 'Stream';
      else if (perms === 'USE_EXTERNAL_EMOJIS')
            NewPermissionsText = 'Use External Emojis';
      else if (perms === 'USE_VAD') NewPermissionsText = 'Use VAD';
      else if (perms === 'VIEW_AUDIT_LOG')
            NewPermissionsText = 'View Adit Logs';
      else if (perms === 'VIEW_CHANNEL') NewPermissionsText = 'View Channel';
      else if (perms === 'VIEW_GUILD_INSIGHTS')
            NewPermissionsText = 'View Server Insights';
      return NewPermissionsText;
};

export const getMember = (message: Message, args: string) => {
      const { guild } = message;
      let member: GuildMember | null = null;
      if (!guild) return member;
      member =
            message.mentions.members?.first() ||
            guild.member(args) ||
            guild.members.cache.find(
                  (mem) =>
                        mem.user.username.toLowerCase() === args.toLowerCase(),
            ) ||
            guild.members.cache.find(
                  (mem) => mem.user.tag.toLowerCase() === args.toLowerCase(),
            ) ||
            guild.members.cache.find(
                  (mem) => mem.nickname?.toLowerCase() === args.toLowerCase(),
            ) ||
            null;
      return member;
};

export const getUser = (message: Message, args: string) => {
      const { guild } = message;
      const { client } = message;
      let user: User | undefined = undefined;
      if (guild) {
            user =
                  message.mentions.users?.first() ||
                  guild.member(args)?.user ||
                  guild.members.cache.find(
                        (mem) =>
                              mem.user.username.toLowerCase() ===
                              args.toLowerCase(),
                  )?.user ||
                  guild.members.cache.find(
                        (mem) =>
                              mem.user.tag.toLowerCase() === args.toLowerCase(),
                  )?.user ||
                  guild.members.cache.find(
                        (mem) =>
                              mem.nickname?.toLowerCase() ===
                              args.toLowerCase(),
                  )?.user ||
                  client.users.cache.get(args) ||
                  client.users.cache.find(
                        (user) =>
                              user.username.toLowerCase() ===
                              args.toLowerCase(),
                  ) ||
                  client.users.cache.find(
                        (user) => user.tag.toLowerCase() === args.toLowerCase(),
                  );
            undefined;
      } else {
            user =
                  client.users.cache.get(args) ||
                  client.users.cache.find(
                        (user) =>
                              user.username.toLowerCase() ===
                              args.toLowerCase(),
                  ) ||
                  client.users.cache.find(
                        (user) => user.tag.toLowerCase() === args.toLowerCase(),
                  ) ||
                  undefined;
      }
      return user;
};

export const getChannel = (message: Message, args: string) => {
      let channel: GuildChannel | undefined = undefined;
      if (!message.guild) return channel;
      channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args) ||
            message.guild.channels.cache.find(
                  (ch) => ch.name.toLowerCase() === args.toLowerCase(),
            ) ||
            undefined;

      return channel;
};

export const updateGuildPrefix = async (guild: Guild, prefix: string) => {
      let config: GuildConfigType | undefined = await GuildConfig.findOne({
            guildId: guild.id,
      });
      if (config) {
            config = await GuildConfig.findOneAndUpdate(
                  { guildId: guild.id },
                  { prefix },
                  { new: true },
            );
      } else {
            config = await GuildConfig.create({
                  guildId: guild.id,
                  prefix,
            });
      }
      (guild.client as DiscordClient).configs.set(
            guild.id,
            config as GuildConfigType,
      );
      return config as GuildConfigType;
};
export const getGuildPrefix = (guild: Guild) => {
      const client = guild.client as DiscordClient;
      const configs = client.configs.get(guild.id);
      return configs && configs.prefix
            ? configs.prefix
            : (process.env.PREFIX as string);
};
