const commentContainer = document.getElementById('comment-container')

class Comment {
    constructor () {
        this.container = document.createElement('div')
        this.container.style.marginBottom = '5px'
        this.header = document.createElement('div')
        this.content = document.createElement('div')
        this.replyButton = document.createElement('button')
        this.container.appendChild(this.header)
        this.container.appendChild(this.content)
        this.container.appendChild(this.replyButton)
        this.header.textContent = `${loggedInUsername.textContent} commented at ${getDate()}`
        this.content.textContent = textArea.value
        this.replyButton.textContent = 'Reply'
        this.header.classList.add('comment-header')
        this.replyButton.classList.add('reply-button')
        commentContainer.appendChild(this.container)
    }
}

function addComment () {
    new Comment()
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


//SPRAVIT METODU KDE PO REPLY SA ZISTI KTORY JE PARENT ELEMENT REPLY BUTTONU A NASLEDNE SA DONHO APPENDNE
//PO ENTERE MA NEPRIHLASI PRETO LEBO MAM DOCASNE NASTAVENU PREMENNU USERLOGGEDIN NA TRUE
//Vytvorit metodu ktora bude pridavat listener podla toho ci je to add coment alebo reply comment
//Reply button vytvori novy element obsahujuci input + discard, discard vymaze creatnuty element