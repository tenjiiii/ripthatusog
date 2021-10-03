const schema = require("../../../models/heistrole")

module.exports = {
    name: 'reset-heist',
    description: 'Disable Auto Role Module of a server',
    category: 'setup',
    aliases: ['r-heist'],
    run: async(client, message, args) => {
        try{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("<:wrong:893330231954386984> You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`<:wrong:893330231954386984> Heist role for this server is reseted already`)
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`<:right:893330260295311360> Heist role has been disabled`)
            }
        })
    } catch (error) {
        console.log(error)
    }
    }
}