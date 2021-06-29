export type GuildConfig = {
      guildId: string;
      prefix: string;
      autoModerator: AutoModeratorGuildConfig;
      maxBotWarns: number;
};

export type AutoModeratorGuildConfig = {
      antiBadWords: AutoModeratorEventBaseConfig;
      antiCapsCheck: AntiCapsCheckConfig;
      antiEmojiSpam: AntiEmojiSpamConfig;
      antiExternalLink: AntiExternalLinksConfig;
      antiFastMessageSpam: AutoModeratorEventBaseConfig;
      antiRepeatedText: AntiRepeatedTextConfig;
      antiServerInvite: AutoModeratorEventBaseConfig;
      antiMentionSpam: AntiSpamMentionConfig;
      antiSpoilersSpam: antiSpoilersSpamConfig;
};

export type AutoModeratorEventBaseConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
};

export type AntiCapsCheckConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      capsAmount: number;
};
export type AntiEmojiSpamConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      maxEmojisCount: number;
};

export type AntiExternalLinksConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      externalLinks: string[];
};

export type AntiRepeatedTextConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      repeatedTextAmount: number;
};
export type AntiSpamMentionConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      mentionsCount: number;
};
export type antiSpoilersSpamConfig = {
      enabled: boolean;
      deleteMessage: boolean;
      warnMember: boolean;
      spoilersCount: number;
};

export type WarnsConfig = {
      user: string;
      guild: string;
      botWarns: warn[];
      humanWarns: warn[];
};

export type warn = {
      reason: string;
      date: number;
      moderator: string;
};
