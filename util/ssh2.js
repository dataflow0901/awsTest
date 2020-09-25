const Client = require('ssh2').Client;
const path = require('path');

const conn = new Client();
conn.on("ready", () => {
    console.log("Client:: Ready");
    conn.exec("pwd", (err, stream) => {
        if(err) throw err;
        stream.on('close', function(code, signal){
            console.log("Stream:: close:: code ", code, ' signal:', signal);
            conn.end();
        })

        stream.on("data", (data)=>{
            console.log("STDOUT: ", data);
        }).stderr.on("data", (data)=>{
            console.log("STDERR: ", data);
        })
    })
}).connect({
    host: 'ec2-54-158-18-34.compute-1.amazonaws.com',
    port: 22,
    username: "ec2-user",
    privateKey: path.join('~', '.ssh', 'blockchain.pem')
});