const Discord = require("discord.js");
const WarnModel = require("../../../schema/warn");


module.exports = {
    name: "warnings",
    aliases: ["avisos", "mod", "warns", "listaavisos"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            const ErrorRole = new Discord.EmbedBuilder()
              .setDescription(`<:Recused_Emoji:1061019407725363280> **Você não possuí permissão para usar este comando.**`)
              .setColor("Red")
            return message.reply({ embeds: [ErrorRole] })}

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const embeduser = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`<:Recused_Emoji:1061019407725363280> Forneça um ID ou uma menção válida para verificar os avisos.`)
        if (!user) {
            return message.reply({embeds: [embeduser]});
        }

        try {
            const warns = await WarnModel.find({ userId: user.id });

            const naoavisos = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("Este usuário não tem avisos registrados.")

            if (!warns || warns.length === 0) {
                return message.channel.send({ embeds: [naoavisos]});
            }

            const embed = new Discord.EmbedBuilder()
                .setColor("Blue")
                .setTitle(`Avisos para ${user.user ? user.user.tag : user.id}`)
                .setDescription(warns.map((warn, index) => {
                    let display = `**Aviso #${index + 1}**\nModerador: ${client.users.cache.get(warn.moderatorId)?.tag || 'Não encontrado'}\nRazão: ${warn.reason}\n`;
                    if (warn.attachments.length > 0) {
                        display += `Anexos: ${warn.attachments.join('\n')}\n`;
                    }
                    display += `Data: ${warn.timestamp.toUTCString()}`;
                    return display;
                }).join("\n"))
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Erro ao consultar avisos na MongoDB:", error);
            const erro = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`Ocorreu um erro ao consultar os avisos.`)
            message.channel.send({embeds: [erro]});
        }
    },
};
