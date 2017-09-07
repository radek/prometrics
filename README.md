# prometrics

Prometheus metrics client for Node.js.

## Installation

```bash
$ npm install prometrics --save
```

Example:

```js
const metrics = require('prometrics');
const express = require('express');

const app = express();

metrics.init({
    name: 'myService',
    environment: 'test'
});

app.get('/metrics', (req, res) => {
  res.end(metrics.getMetrics());
});

// Create metrics
metrics.createCounter('mycounter', 'A number occasionally incremented');
metrics.createGauge('mygauge', 'A random number occasionally set', ['label']);
metrics.createHistogram('myhistogram', 'A duration histogram', {
    buckets: [10, 30, 60, 300, 600, 1800, 3600]
});
metrics.createSummary('mysummary', 'Compute quantiles/median of a random list of numbers', {
    percentiles: [0.01, 0.1, 0.5, 0.9, 0.99]
});

app.listen(3000);
```

```js
const metrics = require('prometrics');

metrics.use('mycounter').inc(4);
metrics.use('mygauge', {label: 'foo'}).set(8);

const end = metrics.use('myhistogram').startTimer();

setImmediate(() => {
  end();
});

for (let i = 0; i < 100000; ++i) {
  metrics.get('mysummary').observe(Math.random());
}
```

## Metrics Description

For a detailed description, [see the official prometheus documentation](https://prometheus.io/docs/concepts/metric_types/).

## API Documentation

[API Documentation](docs/api.md)

