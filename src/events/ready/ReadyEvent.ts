import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../classes/client';
export default class ReadyEvent extends BaseEvent {
      constructor() {
            super('ready');
      }
      async run(client: DiscordClient) {
            console.log(client.user?.tag + ' has logged in.');
            client.user?.setStatus('idle');
            let i = 0;
            setInterval(() => {
                  const acts = [
                        `${client.guilds.cache.size} servers!`,
                        `${client.channels.cache.size} channels!`,
                        `${client.guilds.cache.reduce(
                              (a, g) => a + g.memberCount,
                              0,
                        )} users!`,
                  ];

                  client.user?.setActivity(`${acts[i++ % acts.length]}`, {
                        type: 'PLAYING',
                  });
            }, 15000);
      }
}
