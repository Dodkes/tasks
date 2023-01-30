const commentContainer = document.getElementById('comment-container')

class Comment {
    constructor () {
        this.container = document.createElement('div')
        this.container.style.marginBottom = '10px'
        this.header = document.createElement('div')
        this.content = document.createElement('div')
        this.replyButton = document.createElement('button')
        this.replyButton.style.marginTop = '10px'
        this.commentInput = document.createElement('input')
        this.commentInput.classList.add('reply-input')
        this.container.appendChild(this.header)
        this.container.appendChild(this.content)
        this.container.appendChild(this.commentInput)
        this.container.appendChild(this.replyButton)
        this.replyButton.textContent = 'Reply'
        this.replyButton.classList.add('reply-button')
    }
    commentElement () {
        commentContainer.appendChild(this.container)
        this.header.classList.add('comment-header')
        this.content.textContent = textArea.value
        this.content.style.wordWrap = 'break-word' //prevent long word floating outside of div
        this.header.textContent = `${loggedInUsername.textContent} commented at ${getDate()}`
        this.container.style.maxWidth = '100%'

        this.replyButton.addEventListener('click', ()=> {
            if (this.commentInput.value == '') {
                return
            } else if (!userLoggedin) {
                    return triggerAlarm('Please login to add comment')
            } else if (checkBannedWords(this.commentInput.value)) {
                new Comment().createReplyElement(this.commentInput.value)
                this.commentInput.value = ''
            }
        })
    }
    createReplyElement(repliedText) {
        this.header.textContent = `➥${loggedInUsername.textContent} replied at ${getDate()}`
        this.content.textContent = repliedText
        this.content.style.wordWrap = 'break-word' //prevent long word floating outside of div
        this.header.classList.add('reply-comment')
        this.container.style.width = '600px'
        this.container.style.marginLeft = '20px'
        console.log(this.container.style.marginLeft)
        event.target.parentElement.appendChild(this.container)

        this.replyButton.addEventListener('click', ()=> {
            if (this.commentInput.value == '') {
                return
            } else if (!userLoggedin) {
                    return triggerAlarm('Please login to add comment')
            } else if (checkBannedWords(this.commentInput.value)) {
                new Comment().createReplyElement(this.commentInput.value)
                this.commentInput.value = ''
            }
        })
    }
}

function addComment () {
    new Comment().commentElement()
}

function getDate () {
    let fullDate = new Date()
    let year = fullDate.getFullYear()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[fullDate.getMonth()]
    let day = fullDate.getDate()
    let hour = fullDate.getHours()
    let minute = fullDate.getMinutes()
    return `${hour}h:${minute}m ${day}-${month}-${year}`
}