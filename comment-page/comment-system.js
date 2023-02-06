const addCommentButton = document.getElementById('add-comment-button')
const textArea = document.getElementById('text-area')
const topMessage = document.getElementById('top-message')
const clearButton = document.getElementById('clear-button')

clearButton.addEventListener('click', ()=> {
    textArea.value = ''
})

addCommentButton.addEventListener('click', ()=> {
    if (!userLoggedin) {
        return triggerAlarm('Please login to add comment')
    }
    if (textArea.value !== '') { 
        checkBannedWords(textArea.value, 'comment')
    }
})

function triggerAlarm (text) {
    topMessage.textContent = text
    topMessage.style.display = 'block'
    setTimeout(() => { topMessage.style.display = 'none' }, 1500);
}

const worker = new Worker('worker.js')

function checkBannedWords (content, commentType, clickedElement) {
    worker.postMessage(content)
    worker.onmessage = (message) =>{ 
        if (message.data !== '') {
            triggerAlarm(`Please do not use banned words ( ${message.data} )`)
        } else if (commentType === 'comment') {
            addComment()
            textArea.value = ''
        } else if (commentType === 'reply') {
            new Comment().createReplyElement(content, clickedElement)
        }
    }
}