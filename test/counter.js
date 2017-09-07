'use strict';

const setup = require('./setup');
const metrics = require('..');
const test = require('tape');


test('counter', {skip: false}, (t) => {
  setup.init();

  t.test('should be created', (tt) => {
    const regTest = new RegExp('# TYPE mycounter counter\nmycounter{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz",xyz="zyx"} 2');
    metrics.createCounter('mycounter', 'This is counter test', ['xyz']);
    metrics.use('mycounter', {xyz: 'zyx'}).inc();
    metrics.use('mycounter', {xyz: 'zyx'}).inc();
    tt.ok(regTest.test(metrics.getMetrics()), 'Counter test');
    tt.end();
  });

  t.test('should increment (not overwrite)', (tt) => {
    const regTest = new RegExp('# TYPE mycounter2 counter\nmycounter2{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz"} 3');
    metrics.createCounter('mycounter2', 'This is counter test');
    metrics.use('mycounter2').inc();
    metrics.use('mycounter2').inc();
    metrics.use('mycounter2').inc();
    tt.ok(regTest.test(metrics.getMetrics()), 'Counter test');
    tt.ok(typeof metrics.clear === 'function', 'Provides clear method');
    metrics.clear();
    tt.end();
  });
});
