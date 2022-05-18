const express = require('express');
const app = express();
const port = 8080;

// fake datatabase
const initialdata = [
  { id: 'ZAM123', email: 'robert@test.pl', status: 'sent', date: '2022-05-01', time: '12:01:00'},
  { id: 'ZAM456', email: 'rafal@agro.eu', status: 'completing', date: '2022-05-03', time: '16:12:01'},
];
let datarepo = JSON.parse(JSON.stringify(initialdata));

// we will be working with JSON
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// endpoints definitions
app.get('/', (rer, res) => {
  res.send('I am alive and I\'m doing great :)');
});

app.get('/api/ping', (req, res) => {
  res.send( { response:"pong" } );
});

app.post('/api', (req, res) => {
  var retval = {};
  switch(req.body.action) {
    case 'getall':
      retval = JSON.stringify(datarepo);
      break;
    case 'getbydateandemail':
      retval = datarepo.find( 
        element => element.date === req.body.date && element.email === req.body.email 
      );
      break;
    case 'getbyid':
      retval = datarepo.find( element => element.id === req.body.id );
      break;
    case 'abortdelivery':
      var i = datarepo.findIndex(
        element => element.date === req.body.date && element.email === req.body.email 
      );
      if ( i != -1 ) {
        datarepo[i].status = 'canceled';
        retval = datarepo[i];
      }
      break;
    case 'abortdeliverybydate':
      var i = datarepo.findIndex(
        element => element.date === req.body.date 
      );
      if ( i != -1 ) {
        datarepo[i].status = 'canceled';
        retval = datarepo[i];
      }
      break;
    case 'restart':
      datarepo = JSON.parse(JSON.stringify(initialdata));
      retval = { response:"You are now working on initial data now. Good luck!" };
      break;
  }
  res.send(retval);
})

app.listen(port, () => {
  console.log(`Rest API app is listening at http://localhost:${port}`)
})
