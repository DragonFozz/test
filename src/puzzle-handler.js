import { $, shuffleArray, delay, playSound,randomInt } from './helpers.js'
import { generateRandomPuzzle, generateQuestionAndAnswer, generate4} from './puzzle-factory.js'
import { getPuzzleSvg } from './svg-factory.js'
import { translatePuzzle, translateQA } from './translator.js'

const progressBar = $('.answer-progress-bar')
const inputElement = $('.answer-input')

let puzzleTime = 2
let puzzleAmount = 4

// handles generating puzzle and returning result
export async function doPuzzle(ps, counter){
    // reset from previous run

    $('.answer-section').classList.add('hidden')
    $(".number-container").innerHTML = ''

    //Generate squares and puzzles
    
    const squares = [...Array(puzzleAmount).keys()].map(i => {
        if(counter < 1 || i < 1 ){
        let square = document.createElement('div')
        square.id = `square-${i+1}`
        square.className = 'square'
        $('#number-container').appendChild(square)
        return square
    }
    })
    const puzzles = ps
    //const puzzles = [...Array(puzzleAmount)].map(() => generateRandomPuzzle())

    // generate numbers and display
    const nums = shuffleArray([...Array(puzzleAmount)].map((v, i) => i+1))
    const answer = puzzles.thecolors[counter]
    //const [question, answer] = generateQuestionAndAnswer(nums, puzzles) 
    // console.log("puzzles")
    // console.log(puzzles.thecolors[0])
    //const answer1 = puzzles.thecolors[0]
    // const answer2 = puzzles.thecolors[1]
    // const answer3 = puzzles.thecolors[2]
    // const answer4 = puzzles.thecolors[3]
    //console.log(question)
    //console.log(answer)
    console.log(nums)
    if(counter == 0){ 
    await displayNumbers(puzzles,counter)
    }
    //const metronome = (puzzleTime == 7) ? playSound('assets/metronome.mp3') : playSound('assets/long-metronome.mp3')

    // clear and focus input window
    $('.answer-section').classList.remove('hidden')
    inputElement.value = ''
    inputElement.focus()

    // activate time remaining countdown bar 
    
    progressBar.style.transition = ``
    progressBar.classList.remove('answer-progress-bar-shrink')
    await delay(0.1)
    progressBar.style.transition = `width ${puzzleTime*1000}ms linear`
    progressBar.classList.add('answer-progress-bar-shrink')
    

    // display puzzle in squares
    if(counter < 1){
    squares[1].style.display = "none"
    squares[2].style.display = "none"
    squares[3].style.display = "none"}
    squares[0].innerHTML = getPuzzleSvg(puzzles.shapes[counter],puzzles.hex[counter], 0)
    await delay(0.5)
    // squares.forEach((square, i) => {
    //     //square.style.backgroundColor = puzzles[i].colors['background']
    //     square.innerHTML = getPuzzleSvg(puzzles.shapes[counter],puzzles.hex[counter], 0)
    // })

    // generate and display question
    //const [question, answer] = generateQuestionAndAnswer(nums, puzzles) 
    //$('.answer-question').textContent = question.toUpperCase()

    
    
    // for learning purposes
    //console.log(answer)

    return new Promise((resolve) => {

        // return written input and answer
        inputElement.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                //metronome.pause()
                resolve([inputElement.value, answer])
            }
        });

        // return nothing by default if puzzleTime seconds go by
        delay(puzzleTime).then(() => {
            //metronome.pause()
            resolve([null, answer])
        });
    });
}


async function displayNumbers(puzzles,counter){

    const tempnums = [0,1,2,3];
    const shuffledArray = tempnums.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < 4; i++) {
        $('#square-' + (i+1)).innerHTML = getPuzzleSvg(puzzles.shapes[shuffledArray[i]],puzzles.hex[shuffledArray[i]], 1)
    }
    // for (let i = 0; i < 4; i++) {
    //     $('#square-' + (i+1)).innerHTML = getPuzzleSvg(puzzles.shapes[i],puzzles.hex[i], 1) 
   //forEach((element, index, thenums) => {  $('#square-' + (index+1)).innerHTML = getPuzzleSvg(puzzles.shapes[element],puzzles.hex[element], 1) })

//     let sum = 0;
// const numbers = [65, 44, 12, 4];
// numbers.forEach(myFunction);

// document.getElementById("demo").innerHTML = sum;

// function myFunction(item) {
//   sum += item;
// }
    // thenums.forEach(element => {
    //     console.log(element);
    //   });
    
    //forEach((n, i) => $('#square-' + (i+1)).innerHTML = getPuzzleSvg(puzzles.shapes[n],puzzles.hex[n], 1) )    
    // }
 
    //numbers.forEach((n, i) => $('#square-' + (i+1)).innerHTML = `<div class="big-numbers can-shrink" id="num-${i+1}">${n}</div>`)

    if(counter == 0){
        await delay(2)
    }
    //numbers.forEach(n => $('#num-' + (n)).classList.add('number-shrink'))
    await delay(2)
}

// puzzle time settins
const timeRange = $('#speed-control')
const puzzleRange = $('#puzzle-control')
timeRange.addEventListener('input', () => puzzleTime = $('.time-display').textContent = timeRange.value)
puzzleRange.addEventListener('input', () => puzzleAmount = $('.puzzle-display').textContent = parseInt(puzzleRange.value))



function shuf(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function shufhelper(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
