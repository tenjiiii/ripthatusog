const { Guild } = require("discord.js")
const GuildConfig = require("../../../models/GuildConfig")

module.exports = {
    name: "prefix",
    run: async(client, message, args) => {
        const res = await args.join(" ")
        if (!res) return message.channel.send("Please specify a prefix to change to")

        GuildConfig.findOne({ guildId: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if (data) {
                GuildConfig.findOneAndDelete({ guildId: message.guild.id })
                data = new GuildConfig({
                    guildId: message.guild.id,
                    prefix: res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
                data = new GuildConfig({
                    guildId: message.guild.id,
                    prefix: res
                })
                data.save()
                message.channel.send(`Custom prefix for this server is now set to **${res}**`)
            }
        })
    }
}