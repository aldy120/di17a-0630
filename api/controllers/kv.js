var URLSafeBase64 = require('urlsafe-base64');
let now = (new Date()).toISOString();
var db = {
  123: '321'
}

function getKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'format error.'
    });
  }
  if(!db.hasOwnProperty(key)) {
    res.json(404, {
      message: 'not found.'
    });
  }
  res.json(200, {
    VALUE: db[key],
    TS: now,
  });
}

function deleteKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'not found'
    });
  }
  if(!db.hasOwnProperty(key)) {
    res.json(200, {
      TS: now
    });
  }
  var OLD_VALUE = db[key];
  delete db[key];
  res.json(200, {
    OLD_VALUE,
    TS: now,
  })
}

function postKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  var value = req.swagger.params.body.value.VALUE;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'format error.'
    });
  }
  db[key] = value;
  res.json(200, {
    TS: now,
  });
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
