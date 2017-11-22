require("babel-register");
let io = require('socket.io-client') // socket.io 插件
let socket = io('http://127.0.0.1:8026/', {
    autoConnect: true, // 开启自动重连机制
    reconnectionAttempts: 3, // 重连次数
    reconnectionDelay: 3000, // 重连间隔时间
})

socket.on('connect', (val) => { // 连接websocket服务成功
    console.log('connect:')
    setInterval(() => {
        socket.emit('s3', new Date().getSeconds())
    }, 2000)
    setInterval(() => {
        socket.emit('s2', new Date().getSeconds())
    }, 3000)
    setInterval(() => {
        socket.emit('s3', new Date().getSeconds())
    }, 4000)
    setInterval(() => {
        socket.emit('s4', new Date().getSeconds())
    }, 5000)
    setTimeout(() => {
        closeFet('s3')
    }, 10000)
})

function openFet(name) { // 测试增加事件
    socket.emit('s0', '1', name)
}
function closeFet(name) { // 测试删除事件
    socket.emit('s0', '0', name)
}

socket.on('reconnect_attempt', (attempt) => { // 新的重连回调
    console.log('attempt: %d', attempt)
})

socket.on('reconnecting', () => { // 正在重连
    console.log('reconnecting')
})

socket.on('reconnect_failed', () => { // 连接失败回调
    console.log('reconnect_failed')
    process.exit(0)
})

socket.on('reconnect_error', (err) => { // 连接错误回调
    // console.log('reconnect_error', err)
})

socket.on('disconnect', (reason) => { // 断开连接回调
    console.log('disconnect: ', reason)
    // socket.disconnect()
})

socket.on('error', (error) => { // 连接错误回调
    console.log('error', error)
})

socket.on('connect_timeout', (timeout) => { // 连接超时回调
    console.log('timeout: %d', timeout)
})
