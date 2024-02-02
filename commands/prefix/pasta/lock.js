const { MessageEmbed, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "lock",
    embedInfo: {
        title: "Trancar canal",
        description: `Descrição: Tranca um canal para a permissão "everyone"
        **Utilização:**
        !lock (canal)
        **Exemplo:**
        !lock #chat-geral`,
        color: "#add8e6",  // Cor personalizada (opcional)
      },
    aliases: ["lc"],
    run: async (client, interaction, args) => {

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            const ErrorRole = new Discord.EmbedBuilder()
                .setDescription(`<:dynoError:1197601537048973372> Você não possui permissão para usar este comando.`)
                .setColor("Red");
            return message.reply({ embeds: [ErrorRole] });
        }

        const embed = new EmbedBuilder()
            .setDescription(`<:dynoSuccess:1197601332677320870> Canal fechado.`)
            .setColor("Green");

        interaction.reply({ embeds: [embed] }).then(() => {
            const channel = interaction.channel;

            channel.permissionOverwrites.edit(interaction.guild.id, {
                SendMessages: false,
            })
        });
    },
};