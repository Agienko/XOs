import {game} from './game.js'
import {bot} from './bot.js'
import { player } from './player.js'
import {audios} from './audios.js'

export let table = document.querySelector('tbody')

let btn = document.querySelectorAll('button') // кнопки главного экрана
let menu = document.querySelector('.menu')

btn[0].addEventListener('pointerdown', mainBtn)

btn[1].addEventListener('pointerdown', function() {
    btn[1].textContent = 'Стоп';
    game.tds.forEach(i => i.classList.remove('winner'))
    game.h1.remove();
    game.clear()
    game.render()
    menu.style.display = 'grid' // показать меню
    btn[0].style.opacity = '1'
    table.removeEventListener('pointerdown', startGame);
})

function startGame(){
    if (player.myMove && event.target.textContent === '' && !game.checkAll()) {// если ход игрока и клетка пустая
        player.myMove = false;
        game.mainTable[+event.target.className] = player.point;
        audios.bot.pause()  // защита от наложения звуков
        audios.bot.currentTime = '0'
        audios.player.play()
        game.render();
        setTimeout(() => bot.move(),700)
    }
}
function mainBtn() {
    btn[1].textContent = 'Очистить';
    menu.style.display = 'none'
    btn[0].style.opacity = '0.3'
    if(game.moveLength() === 9) {// провкрка первого хода, тогда записываем условия
        (player.point === 'X') ? bot.point = 'O' : bot.point = 'X';
        (player.point === 'X') ? player.myMove = true : player.myMove = false;
    }
    if(player.myMove){
        table.addEventListener('pointerdown', startGame)
    } else {
        bot.move()
        table.addEventListener('pointerdown', startGame)
    } 
}