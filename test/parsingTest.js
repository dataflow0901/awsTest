const parser = require('../util/resultParser');

const payload = `payload:"{\"name\":\"Jonathan Shapiro-Ward\",\"id\":\"0000001\",\"balance\":\"500000\",\"currency\":\"USD\"}"`;

parser.getPayload(payload);

