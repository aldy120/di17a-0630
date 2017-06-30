var URLSafeBase64 = require('urlsafe-base64');
var db = {};

function getKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'format error.'
    });
    return;
  }
  if(!db.hasOwnProperty(key)) {
    res.json(404, {
      message: 'not found.'
    });
    return;
  }
  var VALUE = db[key];
  res.json(200, {
    VALUE,
    TS: new Date()
  });
}

function deleteKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'format error.'
    });
    return;
  }
  if(!db.hasOwnProperty(key)) {
    res.json(200, {
      TS: new Date()
    });
    return;
  }
  var OLD_VALUE = db[key];
  delete db[key];
  res.json(200, {
    OLD_VALUE,
    TS: new Date(),
  });
}

function postKEY(req, res) {
  var key = req.swagger.params.KvKey.value;
  if (!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: 'format error.'
    });
    return;
  }
  var value = req.swagger.params.body.value.VALUE;
  db[key] = value;
  res.json(200, {
    TS: new Date(),
  });
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
