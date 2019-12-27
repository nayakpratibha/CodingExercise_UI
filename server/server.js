var express = require('express');
var app  = express();
let bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const allowedOrigins = [
'capacitor://localhost',
'ionic://localhost',
'http://localhost',
'http://localhost:3000'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
origin: (origin, callback) => {
if (allowedOrigins.includes(origin) || !origin) {
callback(null, true);
} else {
callback(new Error('Origin not allowed by CORS'));
}
}
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.get('/', cors(corsOptions), (req, res, next) => {
res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const URL = 'http://3.122.7.162:5000/v60/admin';

app.get('/search',function(req,res){
  console.log('req body11', req);
  axios({
    method:'GET',
    url: URL+`/search/user?keyword=${req.query.searchInput}&alias=false`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': req.query.cookie
    }
    })    
    .then(function (response) {
      res.header('Access-Control-Allow-Origin','*');
    res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      })
    });

  app.post('/create', function(req,res) {
    console.log('req body', req.headers);
    axios({
    method:'POST',
    url: URL+'/session',
    headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
    data: req.body
    })
    .then(function (response) {
    console.log('create call response',JSON.stringify(response.headers));
    res.header('Access-Control-Allow-Origin','*');
    res.send({ status: response.status, headers : JSON.stringify(response.headers)});
    })
    .catch(function (error) {
      res.send(JSON.stringify(error));
    })
  });

app.listen(8080, () => {
console.log('CORS-enabled web server listening on port 8080');
});
