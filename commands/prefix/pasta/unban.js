const Discord = require('discord.js');

module.exports = {
  name: 'unban',
  embedInfo: {
    title: "Desbanir membros",
    description: `Descrição: Desbane um membro do seu servidor.
    **Utilização:**
    !unban (id do banido) (motivo)
    **Exemplo:**
    !lock #chat-geral`,
    color: "#add8e6", 
  },
  aliases: ['desbanir', 'ub'],
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
      const ErrorRole = new Discord.EmbedBuilder()
        .setDescription(`<:dynoError:1197601537048973372> Você não possuí permissão para usar este comando.`)
        .setColor("Red")
      return message.reply({ embeds: [ErrorRole] })
    }
    if (!args[0]) {
      let embed = new Discord.EmbedBuilder()
        .setDescription(`<:dynoError:1197601537048973372> Não foi possível encontrar o usuário.`)
        .setColor('Red')
      return message.reply({ embeds: [embed] })
    }
    // Variaveis \\

    // Motivo \\
    let motivo = args.slice(1).join(' ')
    if (!motivo) motivo = "Motivo não fornecido" // Se o motivo não for especificado, fica automaticamente Sem motivo

    if(args[0]) {
        const user = message.mentions.members.first() || await message.guild.users.fetch(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0])
        message.guild.members.unban(user, motivo).then(() => {
            const confirmedUnBan = new Discord.EmbedBuilder()
              .setDescription(`<:dynoSuccess:1197601332677320870> ${user} foi desbanido.`)
              .setColor('Green')
    
            message.reply({ embeds: [confirmedUnBan] }).catch(e => {
              const errorEmbed = new Discord.EmbedBuilder()
                .setDescription(`<:dynoError:1197601537048973372> Não foi desbanir ${user}.`)
                .setColor('Red')
    
              message.reply({ embeds: [errorEmbed] })
    
            })
          })
    }
    
      
    }
  }