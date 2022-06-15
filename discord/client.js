const discord = require('discord.js');
const DiscordBotExecutor = require('./discord-bot-executor.js');

class Client {
    constructor(token, logger, options) {
        this.logger = logger;
        this.token = token;
        this.intents = [];
        this.executor = new DiscordBotExecutor(logger);
        this.client = new discord.Client(options);
    }
    
    addIntent(intent) {
        this.intents.push(intent);
    }

    addBot(bot) {
        this.executor.addBot(new bot(this.client, this.logger));
    }

    start() {
        this.client.on('ready', async () => {
            await this.executor.onReady();
        });

        this.client.on('interactionCreate', async (interaction) => {
            await this.executor.onInteractionCreate(interaction);
        });

        this.client.on('messageReactionAdd', async (reaction, user) => {
            await this.executor.onMessageReactionAdd(reaction, user);
        });

        this.client.login(this.token);
    }
}

module.exports = Client;