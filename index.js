var Stream = require('stream')

function jsonValidate (opts) {

  opts = opts || {};

  var that = this;
  that.schema = opts.schema || {};

  that.data = '';
  var i = 0;

  var s = new Stream();
  s.writable = true;
  s.readable = true;

  s.write = function (buff) {

    // console.log(buff, i++);

    var buff = JSON.parse(buff);

    for(key in that.schema) {
      if (that.schema.hasOwnProperty(key)) {
        // console.log('key: ', key)
        console.log('value: ', buff[key])//[key])
        console.log(that.schema[key]);

        if (buff[key].length > that.schema[key].max_length)
          console.error('ERROR: too long')

      }
    }

  }

  s.end = function (buff) {

    s.writable = false;
  }

  s.destroy = function () {
    s.writable = false;
  }

  return s;

}

module.exports = jsonValidate;

/*var schema = {
  "ID": {
      "type": "int"
    , "required": true 
  },
  "Forename": {
      "type": "string"
    , "max_length": 50
    , "required": true
  },
  "Surname": {
      "type": "string"
    , "max_length": 50
    , "required": true
  },
  "Result": {
      "type": "custom_type_a"
    , "max_length": 10
    , "required": true
  }
}*/