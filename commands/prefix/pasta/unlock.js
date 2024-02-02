const { MessageEmbed, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lock",
    aliases: ["lc"],
    run: async (client, interaction, args) => {

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            const ErrorRole = new Discord.EmbedBuilder()
                .setDescription(`:x: Você não possui permissão para usar este comando.`)
                .setColor("Red");
            return message.reply({ embeds: [ErrorRole] });
        }
        
        const embed = new EmbedBuilder()
            .setDescription(`<:Correct:1061058269109559326> O canal foi fechado com sucesso.`)
            .setColor("Green");

        interaction.reply({ embeds: [embed] }).then(() => {
            const channel = interaction.channel;

            // Editar as permissões do canal para bloquear o envio de mensagens
            channel.permissionOverwrites.edit(interaction.guild.id, {
                SendMessages: true,
            })
        });
    },
};