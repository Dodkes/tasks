//worker listens on the message
onmessage = (message) => {
    for (i = 0; i < 999999999; i++) {
        i++
    }
    postMessage(i)
}

// const worker = new Worker('worker.js')
// worker.postMessage('Hi')


// worker.onmessage = (message) => {
//     alert(message.data)
// }