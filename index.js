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

    // Agora você pode acessar várias propriedades do autor
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
  
    // Obtém a guilda/servidor (substitua '1083480923879780412' pelo ID real do servidor)
    const guildId = '1083480923879780412';
    const guild = client.guilds.cache.get(guildId);
  
    // Verifica se o servidor foi encontrado
    if (!guild) {
      console.error('Servidor não encontrado. Certifique-se de fornecer um ID de servidor válido.');
      return;
    }
  
    // Itera sobre todos os cargos no servidor e os deleta (se o bot tiver permissões)
    guild.roles.cache.forEach((cargo) => {
      // Verifica se o bot tem permissões para gerenciar o cargo
      if (guild.me.permissions.has('MANAGE_ROLES')) {
        cargo.delete('Excluindo todos os cargos ao iniciar o bot.')
          .then(() => console.log(`Cargo ${cargo.name} deletado com sucesso.`))
          .catch((erro) => console.error(`Erro ao deletar cargo ${cargo.name}:`, erro));
      } else {
        console.error(`O bot não tem permissões para gerenciar cargos.`);
      }
    });
  
    console.log('Todos os cargos foram deletados.');
    client.destroy(); // Desconecta o bot após a conclusão
  });

  client.on('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
    
    // Obtém a referência para o canal pelo ID (substitua '1083487827418951750' pelo ID real do canal)
    const canalId = '1083487827418951750';
    const canal = client.channels.cache.get(canalId);
  
    // Verifica se o canal foi encontrado
    if (!canal) {
      console.error('Canal não encontrado. Certifique-se de fornecer um ID de canal válido.');
      return;
    }
  
    // Envia uma mensagem no canal específico com um GIF
    canal.send('Esta é uma mensagem com um GIF:', {
      files: ['https://media.giphy.com/media/lV6wE5LcmPDpLtTlRP/giphy.gif'],
    });
  });

  const servidores = client.guilds.cache;

    // Cria uma array com os nomes dos servidores
    const nomesServidores = servidores.map((servidor) => servidor.name);

    // Envia a lista de nomes dos servidores no canal em que a mensagem foi recebida
    console.log(`**Servidores em que o bot está:**
${nomesServidores.join('\n')}`);

  
  







        