const parser = require('../util/resultParser');

const payload = "2020-11-06 06:42:32.648 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 002 Chaincode invoke successful. result: status:200 payload:\"{\"name\":\"Jonathan Shapiro-Ward\",\"id\":\"0000001\",\"balance\":\"500000\",\"currency\":\"USD\"}\"";
parser.getPayload(payload);

