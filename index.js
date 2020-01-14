const express = require('express');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'db.json' });
db.loadDatabase();
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.get('/', function (req, res) {
  let options = {root: __dirname};
  res.sendFile('./index.html', options);
});

app.post('/get/:id', (req, res) =>{
  db.findOne({ _id: req.params.id }, function (err, doc) {
    if(err) {
      console.log(doc);
      res.send({});
      return;
    }
    if (!doc) {
      doc = {}
    }
    res.send(doc);   
    console.log(req.body, doc,  req.params.id);
  });
    
});

app.post('/set/:id', (req, res) =>{
    res.send({});
    let body = req.body;
    body._id = req.params.id;
    db.insert(body);
    console.log(req.body, req.params.id);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
