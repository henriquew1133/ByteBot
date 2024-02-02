const Discord = require("discord.js")
const WarnModel = require("../../../schema/warn")

module.exports = {
    name: "unwarn",
    aliases: ["desaviso"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            const ErrorRole = new Discord.EmbedBuilder()
              .setDescription(`<:Recused_Emoji:1061019407725363280> **Você não possuí permissão para usar este comando.**`)
              .setColor("Red")
            return message.reply({ embeds: [ErrorRole] })}

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const invalido = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`<:Recused_Emoji:1061019407725363280> Forneça um ID ou menção válida para a verificação dos avisos.`)
        if (!user) {
            return message.reply("Por favor, mencione um usuário ou forneça um ID válido para remover um aviso.");
        }
        const warnNumber = parseInt(args[1]);

        if (isNaN(warnNumber) || warnNumber <= 0) {
            return message.reply("Por favor, forneça um número de aviso válido.");
        }

        try {
            
            const warns = await WarnModel.find({ userId: user.id });

            const naotemaviso = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`Este usuário não tem avisos com este número.`)

            if (!warns || warns.length === 0 || warnNumber > warns.length) {
                return message.channel.send({embeds: [naotemaviso]});
            }

            const removedWarn = warns[warnNumber - 1];
            await WarnModel.deleteOne({ _id: removedWarn._id });

            const embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`<:Correct:1061058269109559326> O aviso número ${warnNumber} de <@${user.id}> foi removido com sucesso!`)

                const erroaoremoveraviso = new Discord.EmbedBuilder()
                .setDescription(`<:Recused_Emoji:1061019407725363280> Houve um erro ao remover o aviso, tente novamente.`)

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Erro ao remover aviso na MongoDB:", error);
            message.channel.send({embeds: [erroaoremoveraviso]});
        }
    },
};