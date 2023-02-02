const addCommentButton = document.getElementById('add-comment-button')
const textArea = document.getElementById('text-area')
const topMessage = document.getElementById('top-message')
const clearButton = document.getElementById('clear-button')
const bannedWords = ['Putin', 'Ukraine', 'Russia', 'War']

clearButton.addEventListener('click', ()=> {
    textArea.value = ''
})

addCommentButton.addEventListener('click', ()=> {
    if (!userLoggedin) {
        return triggerAlarm('Please login to add comment')
    }
    if (textArea.value !== '') { 
        checkBannedWords(textArea.value)
        if (checkBannedWords(textArea.value)) {
            addComment()
            textArea.value = ''
        }
    }
})

function triggerAlarm (text) {
    topMessage.textContent = text
    topMessage.style.display = 'block'
    setTimeout(() => { topMessage.style.display = 'none' }, 1500);
}

function checkBannedWords (content) {
let textSplit = content.split(' ')
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
    if (textNode !== '') {
        triggerAlarm(`Please do not use banned words ( ${textNode} )`)
        return false
    } else {
        return true
    }
}