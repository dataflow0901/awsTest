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

const privateKey = require('fs').readFileSync(path.join('/home', 'dataflow1','.ssh/blockchain.pem')).toString();

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
    const query1 = "~/environment/bank-transfer-blockchain-reinvent2019-workshop/setup/setup_environment.sh";
    const query2 = "source ~/.bash_profile";
    const query3 = "cd ~/environment & ./bank-transfer-blockchain-reinvent2019-workshop/setup/setup_fabric_environment.py"; 
    conn.on("ready", () => {
        console.log("Client:: Ready");
        conn.exec(query3, (err, stream) => {
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


module.exports.queryAccount = (data) => {
    /* parameters
    * userId: string
    */
   const command = `
        source ~/.bash_profile;
        docker exec -e "CORE_PEER_TLS_ENABLED=true" \
        -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/home/managedblockchain-tls-chain.pem"  \
        -e "CORE_PEER_LOCALMSPID=$MSP" \
        -e "CORE_PEER_MSPCONFIGPATH=$MSP_PATH"  \
        -e "CORE_PEER_ADDRESS=$PEER" \
        cli peer chaincode invoke  -C $CHANNEL -n $BANKCHAINCODENAME -c '{"Args":["queryAccount", "0000001"]}' --cafile /opt/home/managedblockchain-tls-chain.pem --tls >> ./result.txt && cat result.txt
    `;

    executeCommand(command, aws);
}

module.exports.createAccount = (data) => {
    /* parameters
    * name: string
    * userId: string
    * balance: string
    * currency: string
    */
    const command = `
    source ~/.bash_profile;
    docker exec -e "CORE_PEER_TLS_ENABLED=true" \
    -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/home/managedblockchain-tls-chain.pem"  \
    -e "CORE_PEER_LOCALMSPID=$MSP" \
    -e "CORE_PEER_MSPCONFIGPATH=$MSP_PATH"  \
    -e "CORE_PEER_ADDRESS=$PEER" \
    cli peer chaincode invoke  -C $CHANNEL -n $BANKCHAINCODENAME -c '{"Args":["createAccount", "Park Jinguk", "0000002", "500000", "USD"]}' --cafile /opt/home/managedblockchain-tls-chain.pem --tls  
    `;c
    executeCommand(command, aws);
}

module.exports.transfer = (data) => {
    /* parameters
    * fromId: string
    * chaincode: string
    * toId: string
    * amount: string
    */
    const command = `
    docker exec -e "CORE_PEER_TLS_ENABLED=true" \
    -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/home/managedblockchain-tls-chain.pem" \
    -e "CORE_PEER_LOCALMSPID=$MSP" \
    -e "CORE_PEER_MSPCONFIGPATH=$MSP_PATH" \
    -e "CORE_PEER_ADDRESS=$PEER" \
    cli peer chaincode invoke -C $CHANNEL -n $BANKCHAINCODENAME -c '{"Args":["createAccount", "${data.name}", "${data.userId}", "${data.accountId}, "${data.currency}"]}' --cafile /opt/home/managedblockchain-tls-chain.pem --tls
    `

    executeCommand(command, aws);
}

const executeCommand = (command, options) => {
    const conn = new Client();

    conn.on("ready", () => {
        console.log("Client:: Ready");
        conn.exec(command, (err, stream) => {
            if(err) throw err;
            stream.on('close', function(code, signal){
                console.log("Stream:: close:: code ", code, ' signal:', signal);
                conn.end();
            })
    
            stream.on("data", (data)=>{
                console.log("STDOUT: ", data.toString());
                endConn();
            }).stderr.on("data", (data)=>{
                console.log("STDERR: ", data.toString());
                endConn();
            })

            const endConn = () => {
                conn.end();
            }
        })
    }).connect(options);

    conn.on('end', function() {
        console.log('end')
    })

    conn.on("error", (err) => {
        console.log("error occured", err);
    });

}
