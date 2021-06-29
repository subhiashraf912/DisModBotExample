import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import mongooseInit from '../utils/MongoDB/mongoose';
import { GuildConfig, WarnsConfig } from '../utils/Types';
import { Manager as DisMod } from 'dismod';
import DisModBaseEvent from '../utils/structures/DisModBaseEvent';
import { AutoModeratorManagerEvents } from 'dismod/src/interfaces';
export default class DiscordClient extends Client {
      private _commands = new Collection<string, BaseCommand>();
      private _aliases = new Collection<string, BaseCommand>();
      private _events = new Collection<string, BaseEvent>();
      private _configs = new Collection<string, GuildConfig | null>();
      private _warns = new Collection<string, WarnsConfig>();
      private _mongoose: () => Promise<void> = mongooseInit;
      private _AutoModerator: DisMod | null = null;
      private _DisModEvents = new Collection<
            keyof AutoModeratorManagerEvents,
            DisModBaseEvent
      >();
      constructor(options?: ClientOptions) {
            super(options);
      }
      get commands(): Collection<string, BaseCommand> {
            return this._commands;
      }
      get aliases(): Collection<string, BaseCommand> {
            return this._aliases;
      }
      get events(): Collection<string, BaseEvent> {
            return this._events;
      }
      get configs(): Collection<string, GuildConfig | null> {
            return this._configs;
      }
      get warns(): Collection<string, WarnsConfig> {
            return this._warns;
      }
      set mongoose(param: () => Promise<void>) {
            this._mongoose = param;
      }

      get mongoose(): () => Promise<void> {
            return this._mongoose;
      }
      set AutoModerator(param: DisMod | null) {
            this._AutoModerator = param;
      }
      get AutoModerator(): DisMod | null {
            return this._AutoModerator;
      }
      get AutoModeratorEvents(): Collection<
            keyof AutoModeratorManagerEvents,
            DisModBaseEvent
      > {
            return this._DisModEvents;
      }
}

//
