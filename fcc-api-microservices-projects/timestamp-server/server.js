var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  if (!req.params.date_string) {
    let x = new Date();
    res.json({ "unix": x.getTime(), "utc": x.toUTCString() })
  }
  let x = new Date(req.params.date_string * 1);
  let y = new Date(req.params.date_string * 1);
  y = y.getTime();
  if (!y) {
    y = new Date(req.params.date_string);
    y = y.getTime();
    if (!y) {
      res.json({ "error": "Invalid Date" })
    }
    x = new Date(req.params.date_string);
  }
  res.json({
    "unix": y, "utc": x.toUTCString()
  })
});


// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});