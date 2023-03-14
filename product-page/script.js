const scrollArrow = document.querySelector('.material-symbols-outlined')

window.onscroll = () => { 
    if (document.documentElement.scrollTop > 50) {
        scrollArrow.style.visibility = 'visible'
    } else {
        scrollArrow.style.visibility = 'hidden'
    }
}