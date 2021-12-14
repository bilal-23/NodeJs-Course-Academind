//using http module
const http = require('http');

function rqListener(req, res) {
    // req have data about request
    //res will help to send response
    console.log(req);
}
const server = http.createServer(rqListener); //it takes a function 

server.listen(3000);