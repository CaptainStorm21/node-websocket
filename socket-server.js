const { Server } = require ('ws');

const wss = new Server ({ port: '3000' });

//capture all messages 
let messages = [];

//wireup connection
wss.on("connection", socket =>{

    //when message comes in 
    socket.on("message", message => {
        console.log(message);
        message.push(message);
        wss.clients.forEach(client => client.send(message))
    })


    socket.on("close", () => {
        console.log("socket discnnected")
    });

    socket.send("welcome to cyber server");

    //checks to see if there is a live chat
    if (messages.length){
        socket.send("chat currently in session");
        messages.forEach(message => socket.send(message));
    }
    console.log("new socket connected");
} );

console.log("chat server is waiting for connections")