const jsonToXmlConverter = require("js2xmlparser")
const jsonToPlainText = require("json-to-plain-text");
const jsonToHtml = require('json-to-html')

const sendResponseToClient = (res,statusCode,responseData)=>{
    res.status(statusCode).send(responseData);
};


const convertToJsonResponse = (data)=>{
    return data;
}

const convertToHtmlResponse = (data)=>{
   return jsonToHtml(data);
};

const convertToXmlResponse = (data)=>{
    return jsonToXmlConverter.parse("data", data);
};

const convertToTextResponse = (data)=>{
    return jsonToPlainText.toPlainText(JSON.parse(JSON.stringify(data)));
};

const sendResponseInContentNegotiation = (req, res, status, data) => {
    let responseData = convertToJsonResponse(data);
    const acceptType = req.headers.accept;
    switch (acceptType) {
        case "application/html":
            responseData= convertToHtmlResponse(data);
            break;
        case "application/xml":
            responseData= convertToXmlResponse(data);
            break;
        case "text/plain":
            responseData= convertToTextResponse(data);
            break;
    
    }
    sendResponseToClient(res,status,responseData);
}


module.exports = {sendResponseInContentNegotiation};