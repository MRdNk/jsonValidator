var fs = require('fs')
var path = require('path')
var csv2json = require('csv2json-stream')
var jsonValidate = require('./index.js')

var file = './csv.csv'

var opts = {
  // delim : '\t'
  delim : ',',
  columns: ['Column1', 'Column2', 'Column3'],
  headers: true
};

var jsonOpts = {
  schema: {
    a: {
        type: "string"
      , max_length: 10
    },
    b: {
        type: "string"
      , max_length: 5
    },
    c: {
        type: "string"
      , max_length: 20
    },
    d: {
        type: "int"
    },
    e: {
        type: "decimal"
    }
  }
}

fs.createReadStream(path.resolve(__dirname, file)).pipe(csv2json(opts)).pipe(jsonValidate(jsonOpts)).pipe(fs.createWriteStream(path.resolve(__dirname, 'example.json')));