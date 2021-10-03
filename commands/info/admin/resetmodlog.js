const Schema = require("../../../models/modlogChannel")

module.exports = {
    name: 'reset-modlog',
    description: 'Disable Auto Role Module of a server',
    category: 'setup',
    aliases: ['r-modlog'],
    run: async(client, message, args) => {
        try{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("<:wrong:893330231954386984> You don\'t have permission to use this command")
        Schema.findOne({ Guildlog: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`<:wrong:893330231954386984> Heist role for this server is reseted already`)
            } else {
                await Schema.findOneAndDelete({ Guildlog: message.guild.id })
                message.channel.send(`<:right:893330260295311360> Heist role has been disabled`)
            }
        })
    } catch (error) {
        console.log(error)
    }
    }
}