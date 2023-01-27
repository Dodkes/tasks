//Buttons
const loginPanelButton = document.getElementById('login-panel-button')
const loginButton = document.querySelector('.login-button')
const registerButton = document.querySelector('.register-button')
const closeButton = document.getElementById('close-button')
//containers
const loginContainer = document.getElementById('login-container')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const usernameMessage = document.getElementById('username-message')
const passwordMessage = document.getElementById('password-message')
const loggedInPanelContainer = document.getElementById('loggedin-panel-container')
let [usernameCondition, passwordCondition] = [false, false]
let userLoggedin = false

loginPanelButton.addEventListener('click', ()=> {
    $(loginContainer).fadeIn()
})

loginButton.addEventListener('click', (event)=> {
    event.preventDefault()
    console.log('login')
})

registerButton.addEventListener('click', (event)=> {
    [usernameCondition, passwordCondition] = [false, false]
    event.preventDefault()
    inputsCheck()
    loginUser()
})

function inputsCheck () {
    if (usernameInput.value == '') {
        usernameMessage.textContent = 'Enter username'
    } else if (usernameInput.value.length < 6) {
        usernameMessage.textContent = 'Minimum username length is 6 symbols'
    } else if (accountCheck(usernameInput.value)) {
        usernameMessage.textContent = 'Account already exists'
    } else {
        usernameMessage.textContent = ''
        usernameCondition = true
    }

    if (passwordInput.value == '') {
        passwordMessage.textContent = 'Enter password'
    } else if (passwordInput.value.length < 8) {
        passwordMessage.textContent = 'Minimum password length is 8 symbols'
    } else {
        passwordMessage.textContent = ''
        passwordCondition = true
    }
}

function accountCheck (name) {
    for (x of accounts) {
        if (x.username == name) {
            return true
        }
    }
}

closeButton.addEventListener('click', (event)=> {
    event.preventDefault()
    $(loginContainer).fadeOut()
    usernameMessage.textContent = passwordMessage.textContent = ''
    usernameInput.value = passwordInput.value = ''
})

function loginUser() {
    if (usernameCondition && passwordCondition) {
        alert('done')
        accounts.push(new Account(usernameInput.value, passwordInput.value))
        localStorage.setItem('JSONAccounts', JSON.stringify(accounts))
        updateLoginPanel(usernameInput.value)
        usernameInput.value = ''
        passwordInput.value = ''
    }
}

function updateLoginPanel(name) {
    $(loginPanelButton).css('display', 'none')
    $(loginContainer).css('display', 'none')
    loggedInPanelContainer.textContent = `Logged in as ${name}`
    userLoggedin = true
}