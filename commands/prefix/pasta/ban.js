const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    embedInfo: {
        title: "Banimento",
        description: `Descrição: Bane um membro
        **Utilização:**
        !ban (membro) (motivo)
        !ban (membro)
        **Exemplo:**
        !ban @Mercury muito noob`,
        color: "#add8e6",  // Cor personalizada (opcional)
      },
    aliases: ['banir', 'b'],
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            const ErrorRole = new Discord.EmbedBuilder()
                .setDescription(`<:Recused_Emoji:1061019407725363280> **Você não possui permissão para usar este comando.**`)
                .setColor("Red");
            return message.reply({ embeds: [ErrorRole] });
        }

        if (!args[0]) {
            let embed = new Discord.EmbedBuilder()
                .setDescription(`**<:Recused_Emoji:1061019407725363280> Não foi possível encontrar o usuário**`)
                .setColor('Red');
            return message.reply({ embeds: [embed] });
        }

        // Variáveis
        let motivo = args.slice(1).join(' ');
        if (!motivo) motivo = "Sem motivo";

        if (args[0]) {
            let user;

            try {
                // Tenta buscar o usuário pelo ID
                user = await client.users.fetch(args[0]);
            } catch (error) {
                // Se falhar, tenta encontrar o membro no cache do servidor
                user = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]);
            }

            const embed1818 = new Discord.EmbedBuilder()
                .setDescription(`<:Recused_Emoji:1061019407725363280> Não foi possível encontrar o usuário`)
                .setColor("Red");

            if (!user) {
                return message.reply({ embeds: [embed1818] });
            }

            message.guild.members.ban(user, { reason: motivo }).then(async () => {
                const confirmedBan = new Discord.EmbedBuilder()
                    .setDescription(`<:dynoSuccess:1197601332677320870> ${user.tag} foi banido.`)
                    .setColor('Green');

                    const embedprivador = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`Você foi banido em ${message.guild.name}
                    \nRazão: ${reason}
                    Moderador: ${message.author.id}`)

                // Envia mensagem privada ao usuário banido
                const userDM = await user.createDM();
                userDM.send({embeds: [embedprivador]});

                message.reply({ embeds: [confirmedBan] }).catch(e => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setDescription(`<:dynoError:1197601537048973372> Não foi possível banir o usuário ${user.tag}.`)
                        .setColor('Red');

                    message.reply({ embeds: [errorEmbed] });
                });
            }).catch(error => {
                console.error(error);
                const errorEmbed = new Discord.EmbedBuilder()
                    .setDescription(`**<:dynoError:1197601537048973372> Ocorreu um erro ao banir o usuário ${user.tag} do servidor!**`)
                    .setColor('Red');

                message.reply({ embeds: [errorEmbed] });
            });
        }
    }
}