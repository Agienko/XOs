export const audios = {
    player : new Audio(), // звук хода игрока
    bot : new Audio(), // звук хода бота
    end : new Audio(), // звук перечеркивания в случае чьей-либо победы
}
audios.player.src = 'audio/1.wav'
audios.bot.src = 'audio/2.wav'
audios.end.src = 'audio/end.wav'
