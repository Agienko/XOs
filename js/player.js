export const player = {
    name: 'аноним',// имя по дефолту
    point : 'X',
    myMove : true,
    games: [],// массив для статистики
    get wins() {// колличество побед
      return  this.games.filter(i => i[0] === 'Win').length
    },
    get looses() {// колличество поражений
        return  this.games.filter(i => i[0] === 'Loose').length
      },
      get draws() {// колличество ничьих
        return  this.games.filter(i => i[0] === 'draw').length
      },
      get xs() {// сколько игр сыграно за Х
        return  this.games.filter(i => i[1] === 'X').length
      },
      get os() {// сколько сыграно за О
        return  this.games.filter(i => i[1] === 'O').length
      },
      stat(el) { // Визуал статистики
        el.lastElementChild.firstElementChild.innerHTML = `
          <p><strong>Игрок:</strong> ${player.name}</p> 
          <p><strong>Сыграно игр:</strong> ${player.games.length}</p>
          <p><strong>За крестик:</strong> ${player.xs}</p>
          <p><strong>За нолик:</strong> ${player.os}</p>
          <p><strong>Побед:</strong> ${player.wins}</p>
          <p><strong>Поражений:</strong> ${player.looses}</p>
          <p><strong>Ничьих:</strong> ${player.draws}</p>
          <p><strong>Процент побед:</strong> 
          ${isNaN(player.wins/player.games.length) ? '-' : (player.wins/player.games.length*100).toFixed(0)}%</p>
        `;
      }
}