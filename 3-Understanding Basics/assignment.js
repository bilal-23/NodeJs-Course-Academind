const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>First Assignment</title></head>');
        res.write(`
    <body>
    <div>
    <h1>First Assignment</h1>
    <h2>User Form</h2>
    <form action="/createuser" method="POST">
    <label>Enter Username</label>
    <input type="text" name="User" required>
    <button type="submit">Submit</button>
    </form>
    </div>
    </body>
    `);
        res.write('</html>');
        return res.end();
    }

    if (url === "/user") {
        res.write('<html>');
        res.write('<head><title>First Assignment</title></head>');
        res.write(`
    <body>
    <div>
    <h1>First Assignment</h1>
    <ul>
    <h2>User List</h2>
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
    <li>User 4</li>
    </ul>
    </div>
    </body>
    `);
        res.write('</html>');
        return res.end();
    }

    if (url === "/createuser" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader("Location", "/")
            res.end();
        })
    }
});

server.listen(5500);