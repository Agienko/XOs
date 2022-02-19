import { player } from './player.js'

let btnOk = document.querySelector('#ok')
let btnCancel = document.querySelector('#cancel')
let close = document.querySelector('#close')
let close2 = document.querySelector('#close2')
let input = document.querySelector('#name')
let form = document.querySelector('.form1')
let mainWrapper = document.querySelector('.mainWrapper')
let userImg = document.querySelector('#userImg')
let header = document.querySelector('header')
let form2 = document.querySelector('.form2')

header.firstElementChild.textContent = player.name;

form.addEventListener('click', function() {
    event.preventDefault()
    if(event.target === btnCancel || event.target === close) {
            form.style.display = 'none';
            document.lastChild.classList.remove('shadow')
            mainWrapper.style.opacity = '1';
            mainWrapper.style.pointerEvents ='initial'
    }
    if (event.target === btnOk){
            player.games = []
            form.style.display = 'none';
            document.lastChild.classList.remove('shadow')
            mainWrapper.style.opacity = '1';
            mainWrapper.style.pointerEvents ='initial';
            (input.value === '' || input.value === ' ') ? player.name = 'аноним' : player.name = input.value;
            header.firstElementChild.textContent = player.name;
            if (input.value !== '' && input.value !== ' ' && input.value !== 'аноним') {
                header.firstElementChild.style.opacity = '0.8'
            }
    }
})
userImg.addEventListener('mouseover', function() {
   header.firstElementChild.style.opacity = '1';
})
userImg.addEventListener('mouseout', function() {
    if (input.value !== '' && input.value !== ' ' && input.value !== 'аноним') {
        header.firstElementChild.style.opacity = '0.8'
    } else {
        header.firstElementChild.style.opacity = '0'
    }
 })

 userImg.addEventListener('pointerdown', function() {
    if (player.name === 'аноним') {
        form.style.display = 'block'
        mainWrapper.style.opacity = '0.3';
        mainWrapper.style.pointerEvents ='none';
        document.lastChild.classList = 'shadow';
    } else {
        form2.style.display = 'block'
        document.lastChild.classList = 'shadow'
        mainWrapper.style.opacity = '0.3';
        mainWrapper.style.pointerEvents ='none'
        player.stat(form2)
    }
 })

 form2.addEventListener('pointerdown', function() {
    event.preventDefault()
        if(event.target === close2) {
            form2.style.display = 'none';
            document.lastChild.classList.remove('shadow')
            mainWrapper.style.opacity = '1';
            mainWrapper.style.pointerEvents ='initial'
        }
})