import { randomInt, sample } from './helpers.js'
import TRANSLATIONS from './language.js'
import { translateQ, trMisc, trColors, trShapes, trPuzzle } from './translator.js'

// import selectedLang from './script.js'
let selectedLang = localStorage.getItem('lang') || 'DK'

// if(!Object.keys(TRANSLATIONS).includes(selectedLang)) console.log(`LANGUAGE NOT SUPPORTED\nSELECTED: ${selectedLang}\nAVAILABLE: ${TRANSLATIONS.LANGUAGES}`)
let LANG = TRANSLATIONS[selectedLang]

//"square", "triangle", "rectangle","circle",
document.addEventListener("lang", () => console.log("LANG CHANGED" + localStorage.getItem('lang')))
document.addEventListener("lang", () => LANG = TRANSLATIONS[localStorage.getItem('lang')])

const SHAPES = [  "turnonoff", "harddrive","network","download","servers", "threeservers"]
const COLORABLE = ['background', 'colortext', 'shapetext', 'number', 'shape']


const COLOR_CODES = ['#000000', '#3f888f','#00008B','#7b0100','#fceb3d','#fd9802','#4cae4f','#9926ac0']

const LANG_COLORS = LANG.COLORS.reduce((obj, key, i) => {obj[key] = COLOR_CODES[i]; return obj}, {})

export const COLORS = {
    'sort' : '#000000',
    'turkis' : '#3f888f', 
    'blå' : '#00008B',
    'rød' : '#7b0100',
    'gul' : '#fceb3d',
    'orange' : '#fd9802',
    'grøn' : '#4cae4f',
    'lilla' : '#9926ac',
}


// functions that return answers from PuzzleData class
const QUESTIONS = {
    // 'background color' : (d) => d.colors['background'],
    // 'color text background color' : (d) => d.colors['colortext'],
    // 'shape text background color' : (d) => d.colors['shapetext'],
    //'number color' : (d) => d.colors['number'],
    'shape color' : (d) => d.colors['shape'],
    // 'color text' : (d) => d.text[0],
    // 'shape text' : (d) => d.text[1],
    // 'shape' : (d) => d.shape
}

class PuzzleData {
    constructor(shape, number, text, colors) {
      this.shape = shape
      this.number = number
      this.text = text
      this.colors = colors
    }
}
class newPuzzleData {
    constructor(shapes, numbers, thecolors, hex) {
      this.shapes = shapes
      this.thecolors = thecolors
      this.numbers = numbers
      this.hex = hex
    }
}
// generates a random puzzle
// export function generateRandomPuzzle(){

//     const shape = sample(SHAPES)
//     const number = randomInt(9) + 1

//     let topText = sample(Object.keys(COLORS))
//     let bottomText = sample(SHAPES)

//     const colors = COLORABLE.reduce((obj, color) => {obj[color] = sample(Object.keys(COLORS)); return obj}, {})

//     // ensure color and shape text don't blend with background
//     while(['colortext', 'shapetext'].map(i => colors[i]).includes(colors['background']))
//         colors['background'] = sample(Object.keys(COLORS))

//     // ensure nothing blends with shape
//     while(['background', 'colortext', 'shapetext', 'number'].map(i => colors[i]).includes(colors['shape'])){
//         colors['shape'] = sample(Object.keys(COLORS))
//     }

//     // convert to hex color values
//     Object.keys(colors).forEach(k => colors[k] = COLORS[colors[k]])

//     topText = trColors(topText)
//     bottomText = trShapes(bottomText)

//     return new PuzzleData(shape, number, [topText, bottomText], colors)
// }
export function generate4(){

    const shape1 = sample(SHAPES)
    const number1 = randomInt(9) + 1
    const number2 = randomInt(9) + 1
    const number3 = randomInt(9) + 1
    const number4 = randomInt(9) + 1

    let shape2
    do {shape2 = sample(SHAPES)} while(shape1 == shape2)
    let shape3
    do {shape3 = sample(SHAPES)} while(shape1 == shape3 || shape2 == shape3)
    let shape4
    do {shape4 = sample(SHAPES)} while(shape1 == shape4 || shape2 == shape4 || shape3 == shape4)

    const color1 = sample(Object.keys(COLORS))
    let color2
    do {color2 = sample(Object.keys(COLORS))} while(color1 == color2)
    let color3
    do {color3 = sample(Object.keys(COLORS))} while(color1 == color3 || color2 == color3)
    let color4
    do {color4 = sample(Object.keys(COLORS))} while(color1 == color4 || color2 == color4 || color3 == color4)
    
    //let topText = sample(Object.keys(COLORS))

    //const colors = COLORABLE.reduce((obj, color) => {obj[color] = sample(Object.keys(COLORS)); return obj}, {})

    // convert to hex color values
    //Object.keys(colors).forEach(k => colors[k] = COLORS[colors[k]])
    const originalColors = [color1,color2,color3,color4]
    const colors = [color1,color2,color3,color4]
   
    // convert to hex color values
    Object.keys(colors).forEach(k => colors[k] = COLORS[colors[k]])
    //topText = trColors(topText)
    const shapes = {shape1:shape1,shape2:shape2,shape3:shape3,shape4:shape4}
    const numbers = {number1:number1,number2:number2,number3:number3,number4:number4}
    const thecolors = {color1:color1,color2:color2,color3:color3,color4:color4}
    const puzzle = {shapes:shapes,numbers:numbers,thecolors:thecolors}
    //return puzzle
    //return new newPuzzleData(shapes,numbers,thecolors)
    return new newPuzzleData([shape1,shape2,shape3,shape4],[number1,number2,number3,number4],originalColors,colors)
}

export function generateRandomPuzzle(){

    const shape = sample(SHAPES)
    const number = randomInt(9) + 1

    let topText = sample(Object.keys(COLORS))

    const colors = COLORABLE.reduce((obj, color) => {obj[color] = sample(Object.keys(COLORS)); return obj}, {})

    // convert to hex color values
    Object.keys(colors).forEach(k => colors[k] = COLORS[colors[k]])

    topText = trColors(topText)

    return new PuzzleData(shape, number, [topText], colors)
}


export function generateQuestionAndAnswer(nums, puzzles){

    const positionOne = randomInt(nums.length)
    const positionTwo = randomInt(nums.length)
    const positionThree = randomInt(nums.length)
    const positionFour = randomInt(nums.length)
    //let tempPosTwo
    //do {tempPosTwo = randomInt(nums.length)} while(positionOne == tempPosTwo)
    //const positionTwo = tempPosTwo

    let firstQuestion = sample(Object.keys(QUESTIONS))
    let tempSecondQuestion = sample(Object.keys(QUESTIONS))
    let tempThirdQuestion = sample(Object.keys(QUESTIONS))
    let tempFourthQuestion = sample(Object.keys(QUESTIONS))
    //do {tempSecondQuestion = sample(Object.keys(QUESTIONS))} while(tempSecondQuestion == firstQuestion)
    //let secondQuestion = tempSecondQuestion

    //const andWord = trMisc('AND')
    const question2 =  translateQ(firstQuestion) +' ('+nums[positionOne]+'))'
    //const question =  translateQ(firstQuestion) +' ('+nums[positionOne]+') '+andWord+' '+translateQ(secondQuestion)+' ('+nums[positionTwo]+')'

    const a1 = QUESTIONS[firstQuestion](puzzles[positionOne])
    const a2 = QUESTIONS[tempSecondQuestion](puzzles[positionTwo])
    const a3 = QUESTIONS[tempThirdQuestion](puzzles[positionThree])
    const a4 = QUESTIONS[tempFourthQuestion](puzzles[positionFour])
    // convert from hex codes to color names, skip if shape
    const nameA1 = Object.keys(COLORS).find(k=>COLORS[k]===a1) || a1
    const nameA2 = Object.keys(COLORS).find(k=>COLORS[k]===a2) || a2
    const nameA3 = Object.keys(COLORS).find(k=>COLORS[k]===a3) || a3
    const nameA4 = Object.keys(COLORS).find(k=>COLORS[k]===a4) || a4

    const answer1 = trPuzzle(nameA1)
    const answer2 = trPuzzle(nameA2)
    const answer3 = trPuzzle(nameA3)
    const answer4 = trPuzzle(nameA4)

    return [question2, answer1, answer2,answer3,answer4]
}



export function generateQuestionAndAnswerold(nums, puzzles){

    const positionOne = randomInt(nums.length)
    //let tempPosTwo
    //do {tempPosTwo = randomInt(nums.length)} while(positionOne == tempPosTwo)
    //const positionTwo = tempPosTwo

    let firstQuestion = sample(Object.keys(QUESTIONS))
    //let tempSecondQuestion = sample(Object.keys(QUESTIONS))
    //do {tempSecondQuestion = sample(Object.keys(QUESTIONS))} while(tempSecondQuestion == firstQuestion)
    //let secondQuestion = tempSecondQuestion

    //const andWord = trMisc('AND')
    const question2 =  translateQ(firstQuestion) +' ('+nums[positionOne]+'))'
    //const question =  translateQ(firstQuestion) +' ('+nums[positionOne]+') '+andWord+' '+translateQ(secondQuestion)+' ('+nums[positionTwo]+')'

    const a1 = QUESTIONS[firstQuestion](puzzles[positionOne])

    // convert from hex codes to color names, skip if shape
    const nameA1 = Object.keys(COLORS).find(k=>COLORS[k]===a1) || a1
    const answer = trPuzzle(nameA1)

    return [question2, answer]
}
export function generateRandomPuzzleold(){

    const shape = sample(SHAPES)
    const number = randomInt(9) + 1

    let topText = sample(Object.keys(COLORS))

    const colors = COLORABLE.reduce((obj, color) => {obj[color] = sample(Object.keys(COLORS)); return obj}, {})

    // ensure color and shape text don't blend with background
    while(['colortext', 'shapetext'].map(i => colors[i]).includes(colors['background']))
        colors['background'] = sample(Object.keys(COLORS))

    // ensure nothing blends with shape
    while(['background', 'colortext', 'shapetext', 'number'].map(i => colors[i]).includes(colors['shape'])){
        colors['shape'] = sample(Object.keys(COLORS))
    }

    // convert to hex color values
    Object.keys(colors).forEach(k => colors[k] = COLORS[colors[k]])

    topText = trColors(topText)

    return new PuzzleData(shape, number, [topText], colors)
}