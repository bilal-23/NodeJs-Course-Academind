//using http module
const http = require('http');
const fs = require('fs');

function rqListener(req, res) {
    // req have data about request
    //res will help to send response
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>');
        res.write('<title>First Page</title>')
        res.write(`<body> <form action="/message" method="POST"> 
        <input type="text" id="msg" name="message"/>
        <label htmlFor="msg">Add message</label>
        <button type="submit">Submit</button>
        </form> </body>`)
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();

        // const message = req
        // console.log(message);
        res.write('<html>');
        res.write('<title>First Page</title>')
        res.write(`<body> <h1>${"hello"}</h1> </body>`)
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<title>First Page</title>')
    res.write('<body> <h1>Hello from my Nodejs Server</h1> </body>')
    res.write('</html>');
    res.end();
}
const server = http.createServer(rqListener); //it takes a function 

server.listen(3000);