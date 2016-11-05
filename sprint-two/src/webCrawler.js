// modified from 'How to make a web crawler in JavaScript / Node.js' by Stephen
// http://www.netinstructions.com/how-to-make-a-simple-web-crawler-in-javascript-and-node-js/
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var startUrl = 'https://en.wikipedia.org/wiki/Webgraph';
var url = new URL(startUrl);
var baseUrl = url.protocol + '//' + url.hostname;
var maxPagesToVisit = 100;


pagesToVisit.push(startUrl);

var crawl = function() {
  if (numPagesVisited >= maxPagesToVisit) {
    console.log('Reached max limit');
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    crawl();
  } else {
    visitPage(nextPage, crawl);
  }
};

var visitPage = function(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  // console.log('Visiting page ' + url);
  request(url, function(error, response, body) {
   // Check status code (200 is HTTP OK)
    // console.log('Status code: ' + response.statusCode);
    if (response.statusCode !== 200) {
      callback();
      return;
    }
    var $ = cheerio.load(body);
    collectInternalLinks($, url);
    // In this short program, our callback is just calling crawl()
    callback();
  });
};

var collectInternalLinks = function($, url) {
  var relativeLinks = $('a[href^="/"]');
  // console.log('Found ' + relativeLinks.length + ' relative links on page');
  relativeLinks.each(function() {
    pagesToVisit.push(baseUrl + $(this).attr('href'));
    fs.appendFile('./test.txt', url + ' ' + baseUrl + $(this).attr('href') + '\n', function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

fs.writeFile('./test.txt', '', function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('file was created');
});

crawl();

