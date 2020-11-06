const parser = module.exports;

parser.getPayload = (str) => {
    console.log("payload on getPayload method => ", str);
    if(str.includes("payload:\"")){
        const payload = str.substring(str.indexOf('payload'))
        return includesPayload(payload)
    }
}

const includesPayload = (payload) => {
    let parsedPayload = {};
    parsedPayload.name = getJsonValue(payload, "name");
    parsedPayload.id = getJsonValue(payload, "id");
    parsedPayload.balance = parseInt(getJsonValue(payload, "balance"));
    parsedPayload.currency = getJsonValue(payload, "currency");
    console.log("parsedPayload :", parsedPayload);

    return payload;
}

// const getJsonArray = (payload, name) => {
//     const quotation = `\"`;
//     const searchStr = `\"${name}\":`;
    
//     let searchStrLength = searchStr.length;
//     let searchStrIndex = payload.indexOf(searchStr);

//     const sqidx = payload.indexOf(quotation, searchStrIndex + searchStrLength) + quotation.length;
//     const eqidx = payload.indexOf(quotation, sqidx);
    
//     return payload.substring(sqidx, eqidx);
// }

const getJsonValue = (payload, name) => {
    const quotation = "\\\"";
    const searchStr = "\\\"" + name +"\\\":";
    
    let searchStrLength = searchStr.length;
    let searchStrIndex = payload.indexOf(searchStr);
    
    const sqidx = payload.indexOf(quotation, searchStrIndex + searchStrLength) + quotation.length;
    const eqidx = payload.indexOf(quotation, sqidx);

    return payload.substring(sqidx, eqidx);
}