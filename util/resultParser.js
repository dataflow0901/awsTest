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
    let nameIndex = payload.indexOf(searchStr);
    
    return payload.substring(nameIndex, payload.indexOf(quotation, nameIndex + nameStrlength + 2));
}