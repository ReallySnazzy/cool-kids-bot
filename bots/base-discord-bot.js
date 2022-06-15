class BaseDiscordBot {
    constructor(client, logger) {

    }

    name() {
        return "BaseDiscordBot";
    }

    async onReady() {}

    async onMessageReactionAdd(reaction, user) {}

    async onInteractionCreate(interaction) {}
}

module.exports = BaseDiscordBot;