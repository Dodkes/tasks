let accounts
if (localStorage.getItem('JSONAccounts')){
    accounts = JSON.parse(localStorage.getItem('JSONAccounts'))
} else {
    accounts = []
}

class Account {
    constructor (username, password) {
        this.username = username
        this.password = password
    }
}