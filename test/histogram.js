'use strict';

const setup = require('./setup');
const metrics = require('..');
const test = require('tape');

test('histogram', {skip: false}, (t) => {
  setup.init();

  t.test('should be created', (tt) => {
    const regTest = new RegExp('# HELP myhistogram This is histogram test\n# TYPE myhistogram histogram\n');

    metrics.createHistogram('myhistogram', 'This is histogram test', [], {
      buckets: [10, 30, 60, 300]
    });

    tt.ok(regTest.test(metrics.getMetrics()), 'Histogram test');
    tt.end();
  });

  t.test('should be incremented', (tt) => {
    const testContent = 'myhistogram_count{bar="rab",foo="oof",gar="rag",lib="bil",rug="gur",set="tes",zyk="kyz"} 1';
    const regTest = new RegExp(testContent);
    const end = metrics.use('myhistogram').startTimer();

    setTimeout(() => {
      end();
      tt.ok(regTest.test(metrics.getMetrics()), 'Histogram test has right value');
      tt.end();
    }, 1);
  });
});
