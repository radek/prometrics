'use strict';

const setup = require('./setup');
const metrics = require('..');
const test = require('tape');


test('metrics', {skip: false}, (t) => {
  t.test('throws error when created multiple times', (tt) => {
    setup.init();
    metrics.createCounter('mycounter', 'This is counter test', ['xyz']);
    metrics.use('mycounter', {xyz: 'zyx'}).inc();
    t.throws(function () {
      return metrics.createCounter('mycounter', 'This is counter test again', ['xyz']);
    }, Error);
    metrics.clear();
    tt.end();
  });

  t.test('enable creating metrics after being cleared', {skip: false}, (tt) => {
    metrics.createCounter('mycounter', 'This is counter test', ['xyz']);
    metrics.use('mycounter', {xyz: 'zyx'}).inc();
    const regTest = new RegExp('# TYPE mycounter counter\nmycounter{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz",xyz="zyx"} 1');
    tt.ok(regTest.test(metrics.getMetrics()), 'Counter test');
    metrics.clear();
    tt.end();
  });
});
