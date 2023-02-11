const addCommentButton = document.getElementById('add-comment-button')
const textArea = document.getElementById('text-area')
const topMessage = document.getElementById('top-message')
const clearButton = document.getElementById('clear-button')
let comments, replies

if (localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
    renderStoredComments(comments)
} else {
    comments = []
}

if (localStorage.getItem('replies')) {
    replies = JSON.parse(localStorage.getItem('replies'))
} else {
    replies = []
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
    let comment = new Comment(textArea.value, getDate(), loggedInUsername.textContent, uniqeID ())
    comment.renderComment()
    saveCommentsToLocalStorage(comment)
}

function addReply (content, clickedElement) {
    let reply = new Comment(content, getDate(), loggedInUsername.textContent, uniqeID ())
    reply.createReplyElement(content, clickedElement)
    
    //DO TOHTO ELEMENTU BUDEM APENDOVAT REPLIES
    console.log(clickedElement.parentElement.id)
    saveRepliesToLocalStorage(reply)
    console.log(reply.commentValue)
}

function saveCommentsToLocalStorage (comment) {
    comments.push(comment)
    localStorage.setItem('comments', JSON.stringify(comments))
}

function saveRepliesToLocalStorage (reply) {
    replies.push(reply)
    localStorage.setItem('replies', JSON.stringify(replies))
}

//Rendering comments
function renderStoredComments (commentsArray) {
    for (let i = 0; i < commentsArray.length; i++) {
        let newComment = new Comment(commentsArray[i].commentValue, commentsArray[i].date, commentsArray[i].user, commentsArray[i].id)
        newComment.renderComment()
    }
}

function uniqeID () {
    let id = 0
    if (localStorage.getItem('ID')) {
        id = JSON.parse(localStorage.getItem('ID'))
    }
        id++
        localStorage.setItem('ID', JSON.stringify(id))
    return id
}

//kazdemu komentu comment aj reply budem priradzovat specificke ID
//ulozim do local strage
//nasledne po kliknuti na reply zistim ID parent elementu a do tohto budem appendovat reply
//cize spravim nove pole objektov, kde bude ID parentu, a reply objeky z ktoreho budem renderovat
//vzdy len ked kliknem na add reply nech zistuje a uklada parent element


//Mozem pridat delete button, na deletovanie komentov/reply a vymaze to vsetky child elementy a
//podla toho aj vymaze z local storage




//CO MAM SPRAVENE ->
//Elementy uz dostavaju unikatne ID
//Replies savujem do local storage