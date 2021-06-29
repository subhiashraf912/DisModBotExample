import {
      AntiCapsCheckConfig,
      AntiEmojiSpamConfig,
      AntiExternalLinksConfig,
      AntiRepeatedTextConfig,
      AntiSpamMentionConfig,
      antiSpoilersSpamConfig,
      AutoModeratorEventBaseConfig,
} from '../Types';

export const defaultModeratorConfig: AutoModeratorEventBaseConfig = {
      deleteMessage: true,
      enabled: false,
      warnMember: true,
};

export const AntiCapsCheckDefaultConfig: AntiCapsCheckConfig = {
      deleteMessage: false,
      enabled: false,
      warnMember: true,
      capsAmount: 70,
};

export const AntiEmojiSpamDefaultConfig: AntiEmojiSpamConfig = {
      enabled: false,
      deleteMessage: false,
      warnMember: true,
      maxEmojisCount: 6,
};

export const AntiExternalLinksDefaultConfig: AntiExternalLinksConfig = {
      enabled: false,
      deleteMessage: true,
      warnMember: true,
      externalLinks: [],
};

export const AntiRepeatedTextDefaultConfig: AntiRepeatedTextConfig = {
      enabled: false,
      deleteMessage: false,
      warnMember: true,
      repeatedTextAmount: 5,
};
export const AntiSpamMentionDefaultConfig: AntiSpamMentionConfig = {
      enabled: false,
      deleteMessage: false,
      warnMember: true,
      mentionsCount: 4,
};
export const antiSpoilersSpamDefaultConfig: antiSpoilersSpamConfig = {
      enabled: false,
      deleteMessage: false,
      warnMember: true,
      spoilersCount: 4,
};
