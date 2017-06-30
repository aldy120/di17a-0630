var https = require('https');
var request = require('request');

var options = {
  uri: 'https://www.googleapis.com/urlshortener/v1/url',
  method: 'POST',
  json: {
    "longUrl": "http://www.google.com/"
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id) // Print the shortened url.
  }
});

function send(req, res) {
  var plaintext = req.swagger.params.body.value.plaintext;
  var re = /^[0-9A-Fa-f]*$/;
  if (!re.test(plaintext)) {
    res.json(400, {
      message: 'should be hex'
    });
    return;
  }
  if (plaintext.length > 32) {
    res.json(413, {
      message: 'too long'
    });
    return;
  }
  // send http request to api
  var postData = JSON.stringify({
    plaintext
  });

  var options = {
    hostname: 'nkiua09s52.execute-api.ap-northeast-1.amazonaws.com',
    path: '/dev/encrypt',
    port: '443',
    method: 'POST',
    header: {
      'Content-Ｔype': 'application/json',
      'Content-Length': Buffer.byteLength(plaintext)
    }
  };
  const request = https.request(options, (resp) => {
    // console.log(`STATUS: ${resp.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(resp.headers)}`);
    resp.setEncoding('utf8');
    resp.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);

      res.json(200, JSON.parse(chunk));
    });
    resp.on('end', () => {
      // console.log('No more data in respponse.');
      // console.log(resp.statusCode);

    });
  });
  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  // write data to request body
  request.write(postData);
  request.end();



}

module.exports = {
  send
};