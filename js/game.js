
import {audios} from './audios.js'
import { player } from './player.js';
export const game = {
 mainTable : ['','','','','','','','',''], // основной массив таблицы
 tds : document.querySelectorAll('td'),  // псевдомассив с td
 h1 : document.createElement('h1'),
    h(i) {//индексы по горизонтали
        return (i === 1 || i === 2 || i === 3)
            ?  [this.mainTable[(i - 1) * 3], this.mainTable[(i - 1) * 3 + 1], this.mainTable[(i - 1) * 3 + 2]]
            :  new Error('Неверный параметр метода "h". Введите цифру от 1 до 3');
        },
    v(i) {// индексы по вертикали
        return (i === 1 || i === 2 || i === 3) 
           ? [this.mainTable[i- 1], this.mainTable[i + 2], this.mainTable[i + 5] ]
           : new Error('Неверный параметр метода "v". Введите цифру от 1 до 3')
        },
    d(i) {// диагональные индексы
       return (i === 1 || i == 2) 
            ? [this.mainTable[2*(i-1)], this.mainTable[4], this.mainTable[8 - 2*(i-1)] ]
            : new Error('Неверный параметр метода "d". Введите цифру от 1 до 2')
        },
    render() { // визуализация ходов
        this.tds.forEach((td, index) => td.textContent = this.mainTable[index])
        this.winner() // в случае победы
        },
    isFull() { // проверка на наличие свободных клеток. Нужно для проверки ничьей
     return (this.mainTable.filter(item => item === '').length === 0) ? true : false;
        },
    moveLength() { // колличество оставшихся клеток
        return this.mainTable.filter(item => item === '').length;
        },
    clear() { // очистка массива
        this.mainTable = ['','','','','','','','',''];
        this.tds.forEach(i => i.classList.remove('winner')) // убрать визуализацию
        this.h1.remove(); //убрать текст об окончании игры
        },
    checH() {// возвращает массив массивов с подробностями (номер ряда, значение(Х, или О), индексы)
        let res = false;
        for ( let i = 1; i <= 3; i++){
          if (this.h(i).filter(j => j === this.h(i)[0] && this.h(i)[0] !== '').length === 3){
            res =  [i, this.tds[(i - 1) * 3].textContent, [(i - 1) * 3,(i - 1) * 3 + 1, (i - 1) * 3 + 2]] ;
            break;
            } 
        } return res;
    },
    checV() {// аналогично предыдущему методу, только по вертикали
        let res = false;
        for ( let i = 1; i <= 3; i++){
           if  (this.v(i).filter(j => j === this.v(i)[0] && this.v(i)[0] !== '').length === 3) {
            res = [i, this.tds[(i - 1)].textContent, [i - 1, i + 2, i + 5]];
            break;
           }
        }  return res;
    },
    checD() { // аналогично предыдущему методу, только диагонали
        let res = false;
        for ( let i = 1; i <= 2; i++){
         if (this.d(i).filter(j => j === this.d(i)[0] && this.d(i)[0] !== '').length === 3) {
            res = [i, this.tds[4].textContent, [2*(i-1), 4, 8 - 2*(i-1)]];
            break;
         }
        } return res;
    },
    checkAll() { // проверяет все три вышеописаных метода, в случае ничьей, возвращает true
        return this.checH() || this.checV() || this.checD() || this.isFull()
    },
    winner() { // Визуализация победы
        if (this.checkAll() && this.checkAll() !== true) {
              this.checkAll()[2].forEach(i => this.tds[i].classList += ' winner')
              this.h1.textContent = `Победил ${this.checkAll()[1]}`
              this.h1.classList = 'sms'
              document.body.append(this.h1)
              audios.end.play();
              (player.point === this.checkAll()[1]) ? player.games.push(['Win', player.point]) : player.games.push(['Loose', player.point]);
            } else if(this.checkAll() === true) {// если ничья
                this.h1.textContent = 'Ничья'
                this.h1.classList = 'sms'
                document.body.append(this.h1)
                player.games.push(['draw', player.point])
            }
        },
}
