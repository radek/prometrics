'use strict';

const setup = require('./setup');
const metrics = require('..');
const test = require('tape');

test('summary', {skip: false}, (t) => {
  setup.init();

  t.test('should be created', (tt) => {
    const regTest = new RegExp('# HELP mysummary This is summary test\n# TYPE mysummary summary\n');

    metrics.createSummary('mysummary', 'This is summary test');
    tt.ok(regTest.test(metrics.getMetrics()), 'Summary test');
    tt.end();
  });

  t.test('should be incremented', (tt) => {
    metrics.use('mysummary').observe(1);
    metrics.use('mysummary').observe(2);


    const testText = 'mysummary_count{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz"} 2';
    const regTest = new RegExp(testText);

    tt.ok(regTest.test(metrics.getMetrics()), 'Summary has right value');
    tt.end();
  });
});
