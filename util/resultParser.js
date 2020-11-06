const parser = module.exports;

parser.getPayload = (str) => {
    if(str.contains("payload:\"")){
        const payload = str.substring(str.indexOf('payload'))
        return containsPayload(payload)
    }
}

const containsPayload = (payload) => {
    let parsedPayload = {};

    if( payload.contains(nameSearchStr)){
        parsedPayload.name = getJsonValue("name");
    }
}

const getJsonValue = (name) => {
    const quotaiton = `\"`;
    const searchStr = `\"${name}\":`;
    
    console.log("searchStr = ", name);
    // let searchStrLength = nameSearchStr.length;
    // let nameIndex = payload.indexOf(nameSearchStr);
    // const name = payload.substring(nameIndex, payload.indexOf(quotation, nameIndex + 2))
    // parsedPayload.name = 

}