import {player} from './player.js'
import {bot} from './bot.js'
import {audios} from './audios.js'

let radios = document.querySelector('.checkboxes')
let checkText = document.querySelector('.under').firstElementChild
let level = document.querySelector('.level')
let volImg = document.querySelector('#imgvol')
let volume = document.querySelector('#volume')
let visible = false;

radios.addEventListener('change', function(){
    checkText.textContent = `Вы ${event.path[1].innerText.split(' ')[2]}`// интерактив под таблицей
    player.point = event.target.id;
    (player.point === 'X') ? bot.point = 'O' : bot.point = 'X';
    (player.point === 'X') ? player.myMove = true : player.myMove = false;
})
level.addEventListener('change', function(){
    bot.level = event.target.id // уровень ходов бота
})

volImg.addEventListener('pointerdown', function(){ // спрятать, показать громкость
    if (visible) {
        volume.style.display = 'none'
        visible = false
    } else {
        volume.style.display = 'inline'
        visible = true
        
        }
})

volume.addEventListener('change', function(){ // обработчик громкости
    audios.bot.volume = event.target.value/100
    audios.player.volume = event.target.value/100
    audios.end.volume = event.target.value/100
})
