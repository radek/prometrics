'use strict';

const metrics = require('..');
const assert = require('assert');

assert.throws(() => {
  metrics.init('');
}, (err) => {
  if (err instanceof Error && err.message === 'Invalid options, provide object') {
    return true;
  }
}, 'throws assertion error');

module.exports = {
  init: function() {
    metrics.init({
      bar: 'rab',
      foo: 'oof',
      lib: 'bil',
      gar: 'rag',
      set: 'tes',
      rug: 'gur',
      zyk: 'kyz'
    });
  }
};
