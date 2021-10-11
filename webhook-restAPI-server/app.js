const express = require('express');
const app = express();
const port = 8080;
// fake data 
var datarepo = require('./data/data.js');

// we will be working with JSON
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// endpoints definitions
app.get('/', (rer, res) => {
  res.send('Żyję i mam się dobrze :)');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/getall', (req, res) => {
  res.send(JSON.stringify(datarepo.data));
});

app.post('/getbyid', (req, res) => {
  console.log('DEBUG req.body =', req.body);
  var retval = datarepo.data.find( element => element.id === req.body.id );
  if ( typeof retval === 'undefined') retval = '{}';
  res.send(JSON.stringify(retval));
})

app.post('/getbydateandemail', (req, res) => {
  console.log('DEBUG req.body =', req.body);
  var retval = datarepo.data.find( 
    element => element.date === req.body.date && element.email === req.body.email 
  );
  if ( typeof retval === 'undefined') retval = '{}';
  res.send(JSON.stringify(retval));
})


app.listen(port, () => {
  console.log(`Rest API app is listening at http://localhost:${port}`)
})
