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
    var errors = [];
    i++;

    for(key in that.schema) {
      if (that.schema.hasOwnProperty(key)) {

        // if max_length defined, validate it
        if (typeof that.schema[key].max_length !== 'undefined')
          if (buff[key].length > that.schema[key].max_length)
            errors.push('ERROR (' + key + ') : too long')

        // check the schema key type
        switch (that.schema[key].type) {
          case 'int': 
            if (parseInt(buff[key]) !== buff[key])
              errors.push('ERROR (' + key + '): not an integer')
            break;
          case 'decimal':
            console.log(parseFloat(buff[key]), buff[key])
            if (parseFloat(buff[key]) !== buff[key])
              errors.push('ERROR (' + key + '): not a decimal')
            break;
        }
        
      }
    }

    if (errors.length === 0) 
      s.emit('data', JSON.stringify(buff) + '\n')
    else 
      console.error('Item ' + i + ': ', errors)
    errors = [];

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