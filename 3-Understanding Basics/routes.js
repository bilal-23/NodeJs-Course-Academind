const fs = require('fs');

const requestHandler = (req, res) => {
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

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            }); //writeFileSync
        }); //request end event
    }//if condition for url and method

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<title>First Page</title>')
    res.write('<body> <h1>Hello from my Nodejs Server</h1> </body>')
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;