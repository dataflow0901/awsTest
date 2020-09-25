const Client = require('ssh2').Client;
const { SSL_OP_PKCS1_CHECK_2 } = require('constants');
const path = require('path');

const ubuntu = {
    host: '112.217.209.162',
    port: 22,
    username: "dataflow1",
    password: 'mkt5098!@',
    readyTimeout: 99999
}

const privateKey = require('fs').readFileSync(path.join(__dirname, '../blockchain.pem')).toString();

const aws = {
    host: 'ec2-54-158-18-34.compute-1.amazonaws.com',
    port: 22,
    username: "ec2-user",
    privateKey: privateKey
}


module.exports.initUbuntu = () => {
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
                console.log("buffer", data.toString());
            }).stderr.on("data", (data)=>{
                console.log("STDERR: ", data);
            })
        })
    }).connect(ubuntu);

    conn.on('end', function() {
        console.log('end')
    })

    conn.on("error", (err) => {
        console.log("error occured", err);
    });
}

module.exports.initAws = () => {
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
                console.log("STDOUT: ", data.toString());
            }).stderr.on("data", (data)=>{
                console.log("STDERR: ", data.toString());
            })
        })
    }).connect(aws);
}
