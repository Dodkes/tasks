
let bannedWords

fetch('./bannedWords.json')
.then(res => res.text())
.then(data => {
    bannedWords = JSON.parse(data).words
})

//worker listens on the message
onmessage = (message) => {

let textSplit = message.data.split(' ')
let textToUpperCaseArray = []
let bannedWordsToUpperCaseArray = []
let textNode = ''

    textSplit.forEach(element => {
        textToUpperCaseArray.push(element.toUpperCase())
    });

    bannedWords.forEach(element => {
        bannedWordsToUpperCaseArray.push(element.toUpperCase())
    })

    for (x in textToUpperCaseArray) {
        if (bannedWordsToUpperCaseArray.includes(textToUpperCaseArray[x])) {
            if (!textNode.includes(textToUpperCaseArray[x])) {
                textNode += ' ' + textToUpperCaseArray[x] 
            }
        }
    }

    postMessage(textNode)
}