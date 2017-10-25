const fs = require('fs');
const path = require('path');
const express = require('express');
const basename = path.basename(__filename);

let Helpers = {};

Helpers.registered = {};

Helpers.register = function(key, fn) {
  if (typeof key === 'object') {
    const helpers = key;
    for (let key in helpers) {
      let fn = helpers[key];
      this.registered[key] = fn;
    }
  } else {
    this.registered[key] = fn;
  }
};

let files = fs.readdirSync(__dirname);
files.forEach(filename => {
  if (filename !== basename) {
    const helperModule = require(`./${filename}`);
    Helpers.register(helperModule);
  }
});

module.exports = Helpers;
