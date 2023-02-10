const addCommentButton = document.getElementById('add-comment-button')
const textArea = document.getElementById('text-area')
const topMessage = document.getElementById('top-message')
const clearButton = document.getElementById('clear-button')
let comments

if (localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
    renderStoredComments(comments)
} else {
    comments = []
}

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
            addReply(content, clickedElement)
        }
    }
}

function addComment () {
    let comment = new Comment(textArea.value, getDate(), loggedInUsername.textContent)
    comment.renderComment()
    saveCommentsToLocalStorage(comment)
}

function addReply (content, clickedElement) {
    new Comment(textArea.value, getDate(), loggedInUsername.textContent).createReplyElement(content, clickedElement)

    
    //DO TOHTO ELEMENTU BUDEM APENDOVAT REPLIES
    //TREBA ZISTIT KU KTOREMU COMMENTU PATRI REPLY A ULOZIT DO LOCAL STORAGE
    console.log(clickedElement.parentElement)
}

function saveCommentsToLocalStorage (comment) {
    comments.push(comment)
    localStorage.setItem('comments', JSON.stringify(comments))
}


//Rendering comments
function renderStoredComments (commentsArray) {
    for (let i = 0; i < commentsArray.length; i++) {
        let newComment = new Comment(commentsArray[i].commentValue, commentsArray[i].date, commentsArray[i].user)
        newComment.renderComment()
    }
}


//kazdemu komentu comment aj reply budem priradzovat specificke ID
//ulozim do local strage
//nasledne po kliknuti na reply zistim ID parent elementu a do tohto budem appendovat reply
//cize spravim nove pole objektov, kde bude ID parentu, a reply objeky z ktoreho budem renderovat

//Mozem pridat delete button, na deletovanie komentov/reply a vymaze to vsetky child elementy a
//podla toho aj vymaze z local storage