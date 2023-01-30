//Buttons
const loginPanelButton = document.getElementById('login-panel-button')
const loginButton = document.querySelector('.login-button')
const registerButton = document.querySelector('.register-button')
const closeButton = document.getElementById('close-button')
const logoffButton = document.getElementById('logoff-button')
//containers
const maincontainer = document.querySelector('.main-container')
const loginContainer = document.getElementById('login-container')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const usernameMessage = document.getElementById('username-message')
const passwordMessage = document.getElementById('password-message')
const loggedInPanelContainer = document.getElementById('loggedin-panel-container')
const loggedInUsername = document.getElementById('loggedin-username')
let [usernameCondition, passwordCondition] = [false, false]
let userLoggedin = true //ZMENIT NA FALSE ! ! !

//LOGIN SYSTEM
loginPanelButton.addEventListener('click', ()=> {
    $(loginContainer).fadeIn()
    $(maincontainer).css('filter', 'blur(5px)')
})

loginButton.addEventListener('click', (event)=> {
    loginAttempt(event)
})
//login via enter
document.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter' && !userLoggedin) {
        if (loginContainer.style.display === 'block') {
            loginAttempt(event)
        }
    }
})

function loginAttempt () {
    [usernameCondition, passwordCondition] = [false, false]
    event.preventDefault()
    loginInputsCheck()
    loginUser()
}

//REGISTER SYSTEM
registerButton.addEventListener('click', (event)=> {
    [usernameCondition, passwordCondition] = [false, false]
    event.preventDefault()
    registerInputsCheck()
    registerUser()
    loginUser()
})

function loginInputsCheck () {
    if (usernameInput.value == '') {
        usernameMessage.textContent = 'Enter username'
    } else if (!accountCheck(usernameInput.value)) {
        usernameMessage.textContent = 'Account does not exist'
    } else {
        usernameMessage.textContent = ''
        usernameCondition = true
    }

    if (passwordInput.value == '') {
        passwordMessage.textContent = ''
        passwordMessage.textContent = 'Enter password'
    } else if (accountCheck(usernameInput.value) && accountCheck(usernameInput.value).password !== passwordInput.value){
        passwordMessage.textContent = 'Wrong password'
    } else {
        passwordMessage.textContent = ''
        passwordCondition = true
    }
}

function registerInputsCheck () {
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
            return x
        }
    }
}

closeButton.addEventListener('click', (event)=> {
    event.preventDefault()
    $(loginContainer).fadeOut()
    $(maincontainer).css('filter', 'blur(0)')
    usernameMessage.textContent = passwordMessage.textContent = ''
    usernameInput.value = passwordInput.value = ''
})

function registerUser() {
    if (usernameCondition && passwordCondition) {
        accounts.push(new Account(usernameInput.value, passwordInput.value))
        localStorage.setItem('JSONAccounts', JSON.stringify(accounts))
    }
}

function loginUser() {
    if (usernameCondition && passwordCondition) {
        updateLoginPanel(usernameInput.value)
        usernameInput.value = passwordInput.value = ''
    }
}

function updateLoginPanel(name) {
    $(loginPanelButton).css('display', 'none')
    $(loginContainer).css('display', 'none')
    $(loggedInUsername).css('display', 'inline')
    $(loggedInPanelContainer).css('display', 'block')
    loggedInUsername.textContent = name
    userLoggedin = true
    $(maincontainer).css('filter', 'blur(0)')

}
//Logoff button
logoffButton.addEventListener('click', ()=> {
    userLoggedin = false
    $(loggedInPanelContainer).css('display', 'none')
    $(loginPanelButton).css('display', 'block')
})