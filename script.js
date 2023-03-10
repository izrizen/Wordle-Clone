

const gameBoard = document.getElementById('game-board')
const gameOverMsg = document.getElementById('game-over')
const keyboard = document.querySelectorAll('.keys')
const keys = [...keyboard]

let boardRows = 6;
let boardColumns = 5;
let c = 0
let r = 0
let canType = true

let numberOne = 1
let numberTwo = 2
let numberThree = 3
let numberFour = 4
let numberFive = 5

const wordList = ['house','About','Piano','House','Alone','Above','Media','Radio','Voice','Value','Alive','Ocean','Image','Olive','Quiet','Video','Cause','Sauce','Movie','Juice','Noise','Abuse','Opera','Naive','Email','Azure']


let word = 'HOUSE'
//  wordList[Math.floor(Math.random()*wordList.length)]


word = word.toUpperCase()


console.log(word)

let gameOver = false;


window.onload = function(){
    startGame()
}

function setDelay(time =0){
    document.querySelector(`#game-board :nth-child(${numberOne - time})`).style.animationDelay = '.35s'
    document.querySelector(`#game-board :nth-child(${numberTwo - time})`).style.animationDelay = '.50s'
    document.querySelector(`#game-board :nth-child(${numberThree - time})`).style.animationDelay = '.65s'
    document.querySelector(`#game-board :nth-child(${numberFour - time})`).style.animationDelay = '.80s'
    document.querySelector(`#game-board :nth-child(${numberFive - time})`).style.animationDelay = '.95s'
}



const checkWord = function(){
    if(c !== boardColumns){
        alert('Enter a 5 Letter Word!')
        setTimeout(() => canType = true, 1);
        return
    }
            let correct = 0
            let letterCount = {};
            for(let i = 0; i<word.length;i++){
                let letter = word[i]
                if(letterCount[letter]){
                    letterCount[letter] += 1
                }
                else letterCount[letter] = 1
            }
            //Goes and Marks Which are Correct
            for(let c = 0;c<boardColumns;c++){
                let curTile = document.getElementById(`${r}-${c}`)
                let letter = curTile.innerHTML
                setDelay()
                
                if(word[c] == letter){
                    curTile.classList.add('correct')
                    setTimeout(() => document.querySelector(`#${word[c]}`).classList.add('rightKey'), 2000);
                    correct++
                    letterCount[letter] -= 1
                }
                
                
                if(correct === word.length){
                    gameOver = true
                    setTimeout(()=>{
                        gameOverMsg.textContent = `The Word Was: ${word}`
                        document.querySelector(`#game-board :nth-child(${numberOne-5})`).classList.add('victory')
                        document.querySelector(`#game-board :nth-child(${numberTwo-5})`).classList.add('victory')
                        document.querySelector(`#game-board :nth-child(${numberThree-5})`).classList.add('victory')
                        document.querySelector(`#game-board :nth-child(${numberFour-5})`).classList.add('victory')
                        document.querySelector(`#game-board :nth-child(${numberFive-5})`).classList.add('victory')
                    },2500)
                }

            }
            //Go Again and Mark Which are Present
            for(let c = 0;c<boardColumns;c++){
                let curTile = document.getElementById(`${r}-${c}`)
                let letter = curTile.innerHTML
                

                if(!curTile.classList.contains('correct')){
                
                if (word.includes(letter)&& letterCount[letter]>0){
                    setTimeout(() => document.querySelector(`#${letter}`).classList.add('keyExist'), 2000);
                    curTile.classList.add('wrongSpot') 
                    letterCount[letter] -= 1
                }
                
                else{
                    curTile.classList.add('notThere') 
                    setTimeout(() => document.querySelector(`#${letter}`).classList.add('wrongKey'), 2000);
                }
            }
        }

            numberOne+=5
            numberTwo+=5
            numberThree+=5
            numberFour+=5
            numberFive+=5
            c= 0
            r++
        
}
function backSpace(){
    if(c>0 && c <= boardColumns){
        c--
    }
    let curTile = document.getElementById(`${r}-${c}`)
    curTile.classList.remove('typed')
    curTile.textContent = ''

}


function startGame(){
    for(let r = 0;r<boardRows;r++){
        for(let c = 0;c<boardColumns;c++){
            const letter =document.createElement('span');
            letter.classList.add('tile')
            letter.setAttribute('id',`${r}-${c}`)
            gameBoard.appendChild(letter)
        }
    }

    document.addEventListener('keydown',e=>{
        if(gameOver || r===6 || !canType)return
        if('a'<= e.key && 'z'>= e.key){
            if(c<boardColumns){
                let curTile = document.getElementById(`${r}-${c}`)
                if(curTile?.textContent == ''){
                    curTile.classList.add('typed')
                    curTile.textContent = e.key.toUpperCase()
                    c++
                }
            }
        }
        else if (e.key === 'Backspace')backSpace()
        
        else if (e.key === 'Enter'){
            checkWord()
            canType = false
            setTimeout(() => canType = true, 2000);
            if(r==6 && c==0){
                setTimeout(() => gameOverMsg.textContent = `The Word Was: ${word}`, 2000);
                return
            }

        }   
    })
}
//Register Keyboard Presses
keys.forEach(key=>{
    const keyboardKeys = key
    keyboardKeys.addEventListener('click',()=>{
        if(gameOver || r===6 || !canType)return
        if('A'<= key.textContent && 'Z'>= key.textContent && key.textContent !== 'Enter'){
            if(c<boardColumns){
                let curTile = document.getElementById(`${r}-${c}`)
                if(curTile.textContent == ''){
                    curTile.classList.add('typed')
                    curTile.textContent = key.textContent.toUpperCase()
                    c++
                }
            }
        }
        else if (key.textContent == '??')backSpace()
        
        else if (key.textContent == 'Enter'){
            checkWord()
            canType = false
            setTimeout(() => canType = true, 2000);
            if(r==6 && c==0){
                setTimeout(() => gameOverMsg.textContent = `The Word Was: ${word}`, 2000);
                return
            } 
        }
    })
});



