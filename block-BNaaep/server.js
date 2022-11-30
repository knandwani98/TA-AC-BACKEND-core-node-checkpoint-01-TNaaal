const fs = require('fs');
var http = require('http');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  ///////// rendering home page
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/index.html', (err, content) => {
      if (err) return console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  }

  //////////////// rendering about page
  else if (req.method === 'GET' && req.url === '/about') {
    fs.readFile(__dirname + '/about.html', (err, content) => {
      if (err) return console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  }

  ////// rendering stylesheet
  else if (req.method === 'GET' && req.url === '/css') {
    fs.readFile(__dirname + '/style.css', (err, content) => {
      if (err) return console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  }

  ///////////////// rendering contact page
  else if (req.method === 'GET' && req.url === '/contact') {
    fs.readFile(__dirname + '/contact.html', (err, content) => {
      if (err) return console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  }
}

server.listen(5000, () => {
  console.log('Listening to port 5000');
});
