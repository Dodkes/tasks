const scrollArrow = document.querySelector('.material-symbols-outlined')
const [navbarFirstItem, navbarSecondItem, navbarThirdItem] = [document.getElementById('first-item-navbar'), document.getElementById('second-item-navbar'),document.getElementById('third-item-navbar')]
const navBar = document.querySelector('.navbar')


window.onscroll = () => { 
    if (document.documentElement.scrollTop > 50) {
        scrollArrow.style.visibility = 'visible'
    } else {
        scrollArrow.style.visibility = 'hidden'
    }
}

window.addEventListener('load', () => {
    navbarFirstItem.style.cssText = 'animation: 0.5s slide-item forwards; animation-delay: 200ms'
    navbarSecondItem.style.cssText = 'animation: 0.5s slide-item forwards; animation-delay: 300ms;'
    navbarThirdItem.style.cssText = 'animation: 0.5s slide-item forwards; animation-delay: 400ms;'
    navBar.style.cssText = 'animation: 600ms slide-navbar forwards'
})