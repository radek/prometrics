'use strict';

const setup = require('./setup');
const metrics = require('..');
const test = require('tape');

test('gauge', {skip: false}, (t) => {
  setup.init();

  t.test('should be created', (tt) => {
    const regTest = new RegExp('# HELP mygauge Test gauge\n# TYPE mygauge gauge\n');
    metrics.createGauge('mygauge', 'Test gauge');
    tt.ok(regTest.test(metrics.getMetrics()), 'Gauge test');
    tt.end();
  });

  t.test('should be incremented', (tt) => {
    const regTest = new RegExp('# TYPE mygauge gauge\nmygauge{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz"} 42\n');
    metrics.use('mygauge').set(42);
    tt.ok(regTest.test(metrics.getMetrics()), 'Gauge test has right value');
    tt.end();
  });
});
