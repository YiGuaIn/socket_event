require("babel-register");
const http = require('http').createServer((req, res)=>{ // 启动服务
    res.statusCode = 200
    res.write('ok...')
    res.end('ok...')
})

let io = require('socket.io')(http, { // 创建socket服务
    pingTimeout: 10000,
    pingInterval: 5000
})

// 事件类型枚举
const EventType = { S1: 's1', S2: 's2', S3: 's3', S4: 's4' } 
// 事件回调方法集
const EventFunc = {
    [EventType.S1](msg){
        console.log('s1: %s', msg)
    },
    [EventType.S2](msg){
        console.log('s2: %s', msg)
    },
    [EventType.S3](msg){
        console.log('s3: %s', msg)
    },
    [EventType.S4](msg){
        console.log('s4: %s', msg)
    },
}


http.listen(8026, '127.0.0.1', (err,res) => { // 监听服务
    console.log('连接成功...')
})

// 打开websocket连接
io.sockets.on('connection', (socket) => {
    initEvent(socket) // 初始化监听事件
    // 主监听操作入口 形参说明---type: 操作类型, msg: 事件名称
    socket.on('s0', (type, msg) => {
        switch(parseInt(type)) {
            case 0: // 删除取消监听事件
                if(!(Object.keys(socket._events).includes(msg))) return
                socket.removeAllListeners(msg)
                break;
            case 1:
                if(Object.keys(socket._events).includes(msg)) return
                // 添加监听事件
                switch(msg){
                    case EventType.S1:
                        socket.addListener(EventType.S1, EventFunc.s1)
                        break;
                    case EventType.S2:
                        socket.addListener(EventType.S2, EventFunc.s2)
                        break;
                    case EventType.S3:
                        socket.addListener(EventType.S3, EventFunc.s3)
                        break;
                    case EventType.S4:
                        socket.addListener(EventType.S4, EventFunc.s4)
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    })
    socket.on('disconnect', () => { // 连接断开回调
        console.log('disconnect')
    })
})

function initEvent(socket){
    console.info('=====初始化事件======')
    socket.addListener(EventType.S1, EventFunc.s1)
    socket.addListener(EventType.S2, EventFunc.s2)
    socket.addListener(EventType.S3, EventFunc.s3)
    socket.addListener(EventType.S4, EventFunc.s4)
}