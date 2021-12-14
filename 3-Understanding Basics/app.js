//using http module
const http = require('http');

function rqListener(req, res) {
    // req have data about request
    //res will help to send response
    console.log(req.url, req.method, req.headers);
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<title>First Page</title>')
    res.write('<body> <h1>Hello from my Nodejs Server</h1> </body>')
    res.write('</html>');
    res.end();
}
const server = http.createServer(rqListener); //it takes a function 

server.listen(3000);