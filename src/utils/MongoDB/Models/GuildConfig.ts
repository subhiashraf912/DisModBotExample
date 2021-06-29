import mongoose from 'mongoose';
import {
      AntiCapsCheckDefaultConfig,
      AntiEmojiSpamDefaultConfig,
      AntiExternalLinksDefaultConfig,
      AntiRepeatedTextDefaultConfig,
      AntiSpamMentionDefaultConfig,
      antiSpoilersSpamDefaultConfig,
      defaultModeratorConfig,
} from '../../constants';

const guildSchema = new mongoose.Schema({
      guildId: { type: String, required: true, unique: true },
      prefix: {
            type: String,
            required: true,
            unique: false,
            default: process.env.PREFIX,
      },
      autoModerator: {
            type: Object,
            required: true,
            unique: false,
            default: {
                  antiBadWords: defaultModeratorConfig,
                  antiCapsCheck: AntiCapsCheckDefaultConfig,
                  antiEmojiSpam: AntiEmojiSpamDefaultConfig,
                  antiExternalLink: AntiExternalLinksDefaultConfig,
                  antiFastMessageSpam: defaultModeratorConfig,
                  antiMentionSpam: AntiSpamMentionDefaultConfig,
                  antiRepeatedText: AntiRepeatedTextDefaultConfig,
                  antiServerInvite: defaultModeratorConfig,
                  antiSpoilersSpam: antiSpoilersSpamDefaultConfig,
            },
      },
      maxBotWarns: {
            type: Number,
            required: false,
            default: 0,
            unique: false,
      },
});

export default mongoose.model('Guild', guildSchema, 'guilds');
