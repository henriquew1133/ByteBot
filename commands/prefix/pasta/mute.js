const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    embedInfo: {
        title: "Mutar membros",
        description: `Descrição: Muta um membro utilizando o castigo do sistema do Discord.
        **Utilização:**
        !mute (membro) (tempo) (motivo)
        !mute (membro) (tempo)
        **Exemplo:**
        !mute @Mercury 1m opa`,
        color: "#add8e6",  // Cor personalizada (opcional)
      },
    aliases: ['mutar', 'm'],
    run: async (client, message, args) => {
        // Verificar permissões
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.MuteMembers)) {
            const ErrorRole = new Discord.EmbedBuilder()
                .setDescription(`<:dynoError:1197601537048973372> Você não possui permissão para usar este comando.`)
                .setColor("Red");
            return message.reply({ embeds: [ErrorRole] });
        }

        if (!args[0]) {
            let embed = new Discord.EmbedBuilder()
                .setDescription(`<:dynoError:1197601537048973372> Não foi possível encontrar o usuário`)
                .setColor('Red');
            return message.reply({ embeds: [embed] });
        }
            const embedtempo = new Discord.EmbedBuilder()
            .setDescription(`<:dynoError:1197601537048973372> Forneça um tempo para o mute.`)
            .setColor("Red")
        // Verificar se o argumento do tempo existe
        if (!args[1]) {
            return message.reply({embeds: [embedtempo]});
        }

        // Variáveis
        let motivo = args.slice(2).join(' ');
        if (!motivo) motivo = "Sem motivo";

        let tempo;

        if (args[1].endsWith('s')) tempo = args[1].replace("s", "") * 1000;
        if (args[1].endsWith('m')) tempo = args[1].replace("m", "") * 60000;
        if (args[1].endsWith('h')) tempo = args[1].replace("h", "") * 3600000;
        if (args[1].endsWith('d')) tempo = args[1].replace("d", "") * 86400000;

        const embed12 = new Discord.EmbedBuilder()
        .setDescription(`<:dynoError:1197601537048973372> Mutes não podem ser tempos menores de 6 segundos.`)
        .setColor("Red")

        const embed13 = new Discord.EmbedBuilder()
        .setDescription(`<:dynoError:1197601537048973372> Mutes não podem ser tempos maiores do que 24 dias.`)
        .setColor("Red")

        const embed14 = new Discord.EmbedBuilder()
        .setDescription(`<:dynoError:1197601537048973372> Formato de tempo inválido. Use \`s\` para segundos, \`m\` para minutos, \`h\` para horas e \`d\` para dias.`)
        .setColor("Red")

        if (tempo < 5000) return message.reply({embeds: [embed12]});
        if (tempo > 2073600000) return message.reply({embeds: [embed13]});

        if (!args[1].endsWith('s') && !args[1].endsWith('m') && !args[1].endsWith('h') && !args[1].endsWith('d')) {
            return message.reply({embeds: [embed14]});
        }

        if (args[0]) {
            const user = message.mentions.members.first() || await message.guild.members.fetch(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]);

            if (message.member.roles.highest.position < user.roles.highest.position) {
                const lowerRole = new Discord.EmbedBuilder()
                    .setDescription('<:dynoError:1197601537048973372> você não pode punir membros de cargo mais alto que o seu.')
                    .setColor('Red');
                message.reply({ embeds: [lowerRole] });
            }

            if (!user.moderatable) {
                const adminEmbed = new Discord.EmbedBuilder()
                    .setDescription(`<:dynoError:1197601537048973372> ${user} é um adminsitrador.`)
                    .setColor('Red');
                message.reply({ embeds: [adminEmbed] });
            } else {
                user.timeout(tempo, motivo).then(async () => {
                    const confirmedBan = new Discord.EmbedBuilder()
                        .setDescription(`<:dynoSuccess:1197601332677320870> ${user} foi mutado.`)
                        .setColor('Green');

                        const embedprivador = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`Você foi mutado em ${message.guild.name}
                    Razão: ${motivo}
                    Tempo: ${tempo / 1000} segundos.
                    Moderador: ${message.author.id}`)

                    

                    message.reply({ embeds: [confirmedBan] });
                });
            }
        }
    }
};