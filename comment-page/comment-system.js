const addCommentButton = document.getElementById('add-comment-button')
const textArea = document.getElementById('text-area')
const topMessage = document.getElementById('top-message')
const clearButton = document.getElementById('clear-button')
let bannedWords


fetch('./bannedWords.json')
.then(res => res.text())
.then(data => {
    bannedWords = JSON.parse(data).words
})


clearButton.addEventListener('click', ()=> {
    textArea.value = ''
})

addCommentButton.addEventListener('click', ()=> {
    if (!userLoggedin) {
        return triggerAlarm('Please login to add comment')
    }
    if (textArea.value !== '') { 

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






const worker = new Worker('worker.js')

function checkBannedWords (content) {
    worker.postMessage(content)

    // worker.onmessage = (message) =>{ 
    //     if (message.data !== '') {
    //         triggerAlarm(`Please do not use banned words ( ${message.data} )`)
    //         return false
    //     } else {
    //         alert('approved')
    //         return true
    //     }
    //     }
}

worker.onmessage = (message) =>{ 
    if (message.data !== '') {
        triggerAlarm(`Please do not use banned words ( ${message.data} )`)
        return false
    } else {
        alert('approved')
        return true
    }
    }


//Nastudovat callback
//https://stackoverflow.com/questions/21518381/proper-way-to-wait-for-one-function-to-finish-before-continuing