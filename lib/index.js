'use strict';

const assert = require('assert');
const client = require('prom-client');

/**
 * @public
 * @module metrics
 */
const metrics = module.exports = {};
let references = {};
let globalLabels = {};

/**
 * @private
 * @description Converts object {key: 'value'} pairs into an array of values.
 * @param {Object} obj
 * @return {Array} values
 */
const getValues = (obj) => Object.keys(obj).sort().map(key => obj[key]);

/**
 * @private
 * @description Creates a metric key based on the name and labels.
 * @param {String} name - Metric name
 * @param {labels} labels - Metric labels
 * @return {String} key
 */
const getMetricKey = (name, labels) => {
  const arr = [];
  arr.push(name);
  return arr.concat(labels).join('').toLowerCase();
};

/**
 * @private
 * @description Helps to create and maintain a ref. to all metrics.
 * @param {String} name -  Metric name
 * @return {Object} metric
 */
const createMetric = (metric) => {
  const key = getMetricKey(metric.name, metric.labelNames);
  references[key] = references[key] || metric;

  return references[key];
};

/**
 * @public
 * @method module:metrics~init
 * @description Initalize metrics with configuration.
 * @param {Object} options
 * @return {Object} options
 */
metrics.init = (options = {}) => {
  assert(typeof options === 'object' && !Array.isArray(options), 'Invalid options, provide object');
  globalLabels = options;

  return options;
};

/**
 * @public
 * @method module:metrics~getMetrics
 * @description Gets all metrics -- will output a string for prometheus to consume.
 * @return {String}
 */
metrics.getMetrics = () => client.register.metrics();

/**
 * @public
 * @method module:metrics~clear
 * @description Removes all created metrics from memory.
 */
metrics.clear = () => {
  references = {};

  return client.register.clear();
};

/**
 * @public
 * @method module:metrics~use
 * @description Gets metrics for a given name.
 * @param {String} name - Name of the metric
 * @param {Array} labelKeys - key:value pairs representing metric defined by create* functions
 * @return {Object} Metric
 */
metrics.use = (name, labelKeys = {}) => {
  assert(typeof name === 'string', 'Name has to be a string');
  assert((typeof labelKeys === 'object' && !Array.isArray(labelKeys)), 'Unaccepted sec. arg., it has to be an object');

  const values =  getValues(globalLabels).concat(getValues(labelKeys));
  const key = getMetricKey(name, Object.keys(globalLabels).sort().concat(Object.keys(labelKeys).sort()));

  return references[key].labels(...values);
};

/**
 * @public
 * @method module:metrics~createCounter
 * @description Counters increase, and reset when the process restarts.
 * @param {String} name - Name of the metric
 * @param {String} help - Help description
 * @param {Array} labels - Labels associated with the metric
 * @return {Object} Metrics
 */
metrics.createCounter = (name, help, labels = []) => createMetric(new client.Counter(name, help, Object.keys(globalLabels).sort().concat(labels.sort())));

/**
 * @public
 * @method module:metrics~createGauge
 * @description Gauges are similar to Counters; however, the value can be decreased for gauges.
 * @param {String} name - Name of the metric
 * @param {String} help - Help description
 * @param {Array} labels - Labels associated with the metric
 * @return {Object} Metrics
 */
metrics.createGauge = (name, help, labels = []) => createMetric(new client.Gauge(name, help, Object.keys(globalLabels).sort().concat(labels.sort())));

/**
 * @public
 * @method module:metrics~createHistogram
 * @description Histograms track sizes and frequency of events.
 * @param {String} name - Name of the metric
 * @param {String} help - Help description
 * @param {Array} labels - Labels associated with the metric
 * @param {Object} params - Metric parameters
 * @return {Object} Metrics
 */
metrics.createHistogram = (name, help, labels = [], params) => createMetric(new client.Histogram(name, help, Object.keys(globalLabels).sort().concat(labels.sort()), params));

/**
 * @public
 * @method module:metrics~createSummary
 * @description Summary calculates the percentiles of observed values.
 * @param {String} name - Name of the metric
 * @param {String} help - Help description
 * @param {Array} labels - Labels associated with the metric
 * @param {Object} params - Metric parameters
 * @return {Object} Metrics
 */
metrics.createSummary = (name, help, labels = [], params) => createMetric(new client.Summary(name, help, Object.keys(globalLabels).sort().concat(labels.sort()), params));
