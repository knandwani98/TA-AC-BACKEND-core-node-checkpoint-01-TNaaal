const fs = require('fs');
var http = require('http');
const url = require('url');
var qs = require('querystring');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    ///////// rendering home page
    if (req.method === 'GET' && req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      fs.readFile(__dirname + '/index.html', (err, content) => {
        if (err) return console.log(err);
        res.end(content);
      });
    }

    //////////////// rendering about page
    else if (req.method === 'GET' && req.url === '/about') {
      res.setHeader('Content-Type', 'text/html');
      fs.readFile(__dirname + '/about.html', (err, content) => {
        if (err) return console.log(err);
        res.end(content);
      });
    }

    ////// rendering stylesheet
    else if (req.method === 'GET' && req.url === '/css') {
      res.setHeader('Content-Type', 'text/css');
      fs.readFile(__dirname + '/style.css', (err, content) => {
        if (err) return console.log(err);
        res.end(content);
      });
    }

    ///////////////// rendering contact page
    else if (req.method === 'GET' && req.url === '/contact') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream(__dirname + '/contact.html').pipe(res);
    }

    ///// store data in form route
    else if (req.method === 'POST' && req.url === '/form') {
      var parseData = qs.parse(store);
      var username = parseData.username;

      fs.open(
        __dirname + '/contacts/' + username + '.json',
        'wx',
        (err, fd) => {
          if (err) {
            res.setHeader('Content-Type', 'text/html');
            return res.end(`<h2>Username already taken ❌></h2>`);
          }
          fs.writeFile(fd, JSON.stringify(parseData), (err) => {
            if (err) return console.log(err);
            fs.close(fd, (err) => {
              if (err) return console.log(err);
              res.setHeader('Content-Type', 'text/html');
              return res.end(`<h2>Contact Saved ✔</h2>`);
            });
          });
        }
      );
    }

    ///////////// fetching user data
    else if (req.method === 'GET' && parsedUrl.pathname === '/users') {
      var username = parsedUrl.query.username;
      res.setHeader('Content-Type', 'application/json');
      fs.createReadStream(__dirname + '/contacts/' + username + '.json').pipe(
        res
      );
    }
  });
}

server.listen(5000, () => {
  console.log('Listening to port 5000');
});
