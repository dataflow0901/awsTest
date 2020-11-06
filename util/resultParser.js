const parser = module.exports;

parser.getPayload = (str) => {
    if(str.includes("payload:\"")){
        const payload = str.substring(str.indexOf('payload'))
        return includesPayload(payload)
    }
}

const includesPayload = (payload) => {
    let parsedPayload = {};

    parsedPayload.name = getJsonValue(payload, "name");
    console.log("parsedPayload :", parsedPayload);
}

const getJsonValue = (payload, name) => {
    const quotation = `\"`;
    const searchStr = `\"${name}\":`;
    
    console.log("searchStr = ", name);
    let searchStrLength = searchStr.length;
    let searchStrIndex = payload.indexOf(searchStr);
    
    return payload.substring(searchStrIndex, payload.indexOf(quotation, searchStrIndex + searchStrLength + 2));
}