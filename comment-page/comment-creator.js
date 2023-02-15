const commentContainer = document.getElementById('comment-container')

class Comment {
    constructor (commentValue, date, user, id) {
        this.container = document.createElement('div')
        this.container.id = id
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
        this.commentValue = commentValue
        this.date = date
        this.user = user
        this.id = id




        this.removeButton = document.createElement('button')
        this.removeButton.style.marginTop = '10px'
        this.removeButton.style.marginLeft = '5px'
        this.container.appendChild(this.removeButton)
        this.removeButton.textContent = 'Remove'
        this.removeButton.classList.add('reply-button')


        this.removeButton.addEventListener('click', ()=> {
            if (!userLoggedin) {
                return triggerAlarm('Please login to remove comment')
            } else if(this.user == loggedInUsername.textContent) {
                this.container.remove()
                //Update local storage here
            }
        })


    }
    renderComment () {
        commentContainer.appendChild(this.container)
        this.header.classList.add('comment-header')
        this.content.textContent = this.commentValue
        this.content.style.wordWrap = 'break-word' //prevent long word floating outside of div
        this.header.textContent = `${this.user} commented at ${this.date}`
        this.container.style.maxWidth = '100%'

        this.replyButton.addEventListener('click', ()=> {
            if (this.commentInput.value == '') {
                return
            } else if (!userLoggedin) {
                    return triggerAlarm('Please login to add comment')
            } else {
                checkBannedWords(this.commentInput.value, 'reply', event.target) 
                this.commentInput.value = ''
            }
        })
    }
    createReplyElement(repliedText, clickedElement, render) {
        this.header.textContent = `➥${this.user} replied at ${this.date}`
        this.content.textContent = repliedText
        this.content.style.wordWrap = 'break-word' //prevent long word floating outside of div
        this.header.classList.add('reply-comment')
        this.container.style.width = '600px'
        this.container.style.marginLeft = '20px'
        render ? clickedElement.appendChild(this.container) : clickedElement.parentElement.appendChild(this.container)
        this.replyButton.addEventListener('click', ()=> {
            if (this.commentInput.value == '') {
                return
            } else if (!userLoggedin) {
                    return triggerAlarm('Please login to add comment')
            } else {
                checkBannedWords(this.commentInput.value, 'reply', event.target) 
                this.commentInput.value = ''
            }
        })
    }
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