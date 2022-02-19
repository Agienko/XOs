import { game } from "./game.js";
import {audios} from './audios.js'
import { player } from "./player.js";
export const bot = {
    point : 'O',
    level: 'easy',
    move() { 
        if (this.level === 'easy'){   // выбор режима "новичек"\"продвинутый"
            if(!game.checkAll()) {  
                let i;
                do {
                i = Math.floor(Math.random() * 9); 
                }  while(game.mainTable[i] !== '' && !game.isFull()) // поиск пустой клетки
                    game.mainTable[i] = this.point;
                    audios.player.pause()             //страховка от быстрого нажатия игроком, чтоб звуки не накладывались
                    audios.player.currentTime = '0'
                    audios.bot.play()
                    player.myMove = true; // маркер перехода хода
                    game.render()   // визуализация ходов
            }
        } else {
            this.hardMove()   // вызов функции продвинутого хода
            }
        },
    hardMove() {
       let i;
    if (game.moveLength() >= 8 ) {
        do {
             // выбор первого хода только из диагональных и центрального хода. Центральный ход(4) выпадает с большей вероятностью
            i = [0, 2, 4, 6, 8, 4, 4].sort(i => Math.random() - 0.5)[0]; 
            }  while(game.mainTable[i] !== '' && !game.isFull())
                game.mainTable[i] = this.point;
                audios.player.pause()
                audios.player.currentTime = '0'
                audios.bot.play()
                player.myMove = true
                game.render() 
           } else {
               let arr =[];// массив возможных лучших ходов
                for (let j = 1; j <= 3; j++) {
                    // добавляем ходы по горизонтали и вертикали
                    arr.push([game.h(j).filter( k => k === this.point), [(j - 1) * 3,(j - 1) * 3 + 1, (j - 1) * 3 + 2]])
                    arr.push([game.h(j).filter( k => k === player.point), [(j - 1) * 3,(j - 1) * 3 + 1, (j - 1) * 3 + 2]])
                    arr.push([game.v(j).filter( k => k === this.point), [j - 1, j + 2, j + 5]])
                    arr.push([game.v(j).filter( k => k === player.point), [j - 1, j + 2, j + 5]])
                }
                for (let j = 1; j <= 2; j++) {
                    //добавляем диагональные ходы
                    arr.push([game.d(j).filter( k => k === this.point), [2*(j-1), 4, 8 - 2*(j-1)]])
                    arr.push([game.d(j).filter( k => k === player.point), [2*(j-1), 4, 8 - 2*(j-1)]])
                }
                let set = new Set()
                arr.sort((a, b) => b[0].length -a[0].length)
                .map( i => i[1].join(', ')).join(', ')
                .split(',').forEach(i => set.add(i)) // сортируем ходы по наиболее актуальным, и убираем повторы
                let valueArr =  Array.from(set).filter(i => game.mainTable[+i] === '' ) // финальный массив с ходами
                if(valueArr.length > 0 && !game.checkAll()){ // проверка на отсутствие возможных ходов
                    game.mainTable[+valueArr[0]] = this.point;
                                audios.player.pause()
                                audios.player.currentTime = '0'
                                audios.bot.play()
                                player.myMove = true
                                game.render()
                } 
            }
    }
}

        
    