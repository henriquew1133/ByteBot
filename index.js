const config = require('./config.json')
const Discord = require("discord.js")
const fs = require('fs')
const mongoose = require("mongoose")


mongoose.set("strictQuery", true);
mongoose.connect(config.MONGO_URL, {}).then(() => {

});

const client = new Discord.Client({ 
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildModeration,
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.IntentsBitField.Flags.DirectMessageTyping
    ]
})

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
module.exports = client

require('./handler')(client);
client.login(config.token)

fs.readdir('./events', (err, file) => {
    for(let evento of file) {
        require(`./events/${evento}`)
    }
})

client.on('messageCreate', async (message) => {
    let prefixo = "!"

    if (message.author.bot) return
    if (message.channel.type == 'DM') return
    if (!message.content.toLowerCase().startsWith(prefixo.toLowerCase())) return

    const args = message.content.slice(prefixo.length).trim().split(/ +/g)

    let cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command) {
       try {
          command.run(client, message, args)
       } catch(e) {
           console.log(e)
       }
        
    }
})

client.on('messageCreate', (message) => {

    const author = message.author;

   
    const authorName = author.username; // Nome do autor
    const authorID = author.id; // ID do autor

    // Verifica se a mensagem menciona o bot
    if (message.mentions.has(client.user)) {
        // Responde à menção com a mensagem desejada
        message.reply(`<a:Roxo_ggNuvem:1197562856942616696> | Olá <@${authorID}>! Meu prefixo neste servidor é **!**, para ver o que posso fazer digite **!ajuda**!`);
    }
});



client.on('ready', async () => {
    console.log(`Bot está online como ${client.user.tag}`);
  
