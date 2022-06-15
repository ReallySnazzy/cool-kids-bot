class DiscordBotExecutor {
    constructor(logger) {
        this.bots = [];
        this.logger = logger;
    }

    addBot(bot) {
        this.bots.push(bot);
    }

    async onReady() {
        this.logger.log('debug', 'onReady(...)');
        this.executeAllBotsAsync(bot => bot.onReady());
    }

    async onMessageReactionAdd(reaction, user) {
        this.logger.log('debug', 'onMessageReactionAdd(...)');
        await this.executeAllBotsAsync(bot => bot.onMessageReactionAdd(reaction, user));
    }

    async onInteractionCreate(interaction) {
        this.logger.log('debug', 'onInteractionCreate(...)');
        await this.executeAllBotsAsync(bot => bot.onInteractionCreate(interaction));
    }

    executeAllBots(cb) {
        for (var bot of this.bots) {
            let botName = "NONE";
            try {
                botName = bot.name();
                cb(bot);
            } catch (ex) {
                this.logger.log('error', `${botName} - ${ex.message}`);
            }
        }
    }

    async executeAllBotsAsync(cb) {
        let promises = [];
        let botNames = [];
        for (let bot of this.bots) {
            try {
                const promise = cb(bot);
                const name = bot.name();
                // Make sure there was no error in cb or .name() before adding both to list.
                // promises are matched to bot names by index.
                promises.push(promise);
                botNames.push(name);
            } catch (ex) {
                this.logger.log('error', `Promise initialization failed - ${ex.message}`);
            }
        }
        let settledPromiseResults = await Promise.allSettled(promises);
        for (let i = 0; i < settledPromiseResults.length; i++) {
            let settledPromiseResult = settledPromiseResults[i];
            let botName = botNames[i];
            if (settledPromiseResult.status === 'rejected') {
                this.logger.log('error', `${botName} - ${settledPromiseResult.reason}`);
            }
        }
    }
}

module.exports = DiscordBotExecutor;