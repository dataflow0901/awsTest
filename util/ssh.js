var exec = require('ssh-exec');
const path = require('path');
var v_host = '112.217.209.162';
var awshost = "ec2-54-158-18-34.compute-1.amazonaws.com";


const privateKey = require('fs').readFileSync(path.join('/','home', 'dataflow1', '.ssh', 'blockchain'))
const options = {
    user: 'dataflow1',
    host: v_host, 
    password: 'mkt5098!@'
}

const awsBlockchain = {
    user: 'ec2-user',
    host: awshost,
    privateKey: privatekey,
    interactiveAuth: true

}

module.exports.ls = () => { 
    const stream = exec('pwd', awsBlockchain)
    .pipe(process.stdout, function (err, data) { 
      console.log("err => ", err, "data =>", data);
        if ( err ) {
            console.log(v_host); console.log(err); 
        }
    })

}

module.exports.search = (data) => { 
    const command = `
      docker exec -e "CORE_PEER_TLS_ENABLED=true" \
      -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/home/managedblockchain-tls-chain.pem" \
      -e "CORE_PEER_LOCALMSPID=$MSP" \
      -e "CORE_PEER_MSPCONFIGPATH=$MSP_PATH" \
      -e "CORE_PEER_ADDRESS=$PEER" \
      cli peer chaincode invoke -C $CHANNEL -n $BANKCHAINCODENAME -c '{"Args":["createAccount", "${data.name}", "${data.userId}", "${data.accountId}", "${data.currency}"]}' --cafile /opt/home/managedblockchain-tls-chain.pem --tls
    `
    console.log(command);
    const stream = exec(command, awsBlockchain)

    .pipe(process.stdout, function (err, data) {
      console.log("err => ", err, "data =>", data);
        if ( err ) {
            console.log(v_host); console.log(err); 
        }
    })
}


module.exports.createAccount = (data) => { 
    const command = `
      docker exec -e "CORE_PEER_TLS_ENABLED=true" \
      -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/home/managedblockchain-tls-chain.pem" \
      -e "CORE_PEER_LOCALMSPID=$MSP" \
      -e "CORE_PEER_MSPCONFIGPATH=$MSP_PATH" \
      -e "CORE_PEER_ADDRESS=$PEER" \
      cli peer chaincode invoke -C $CHANNEL -n $BANKCHAINCODENAME -c '{"Args":["createAccount", "${data.name}", "${data.userId}", "${data.accountId}", "${data.currency}"]}' --cafile /opt/home/managedblockchain-tls-chain.pem --tls
    `
    console.log(command);
    const stream = exec(command, awsBlockchain)

    .pipe(process.stdout, function (err, data) {
      console.log("err => ", err, "data =>", data);
        if ( err ) {
            console.log(v_host); console.log(err); 
        }
    })
}