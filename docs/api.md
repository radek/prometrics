<a name="module_metrics"></a>

## metrics
**Access:** public  

* [metrics](#module_metrics)
    * [~init(options)](#module_metrics..init) ⇒ <code>Object</code>
    * [~getMetrics()](#module_metrics..getMetrics) ⇒ <code>String</code>
    * [~clear()](#module_metrics..clear)
    * [~use(name, labelKeys)](#module_metrics..use) ⇒ <code>Object</code>
    * [~createCounter(name, help, labels)](#module_metrics..createCounter) ⇒ <code>Object</code>
    * [~createGauge(name, help, labels)](#module_metrics..createGauge) ⇒ <code>Object</code>
    * [~createHistogram(name, help, labels, params)](#module_metrics..createHistogram) ⇒ <code>Object</code>
    * [~createSummary(name, help, labels, params)](#module_metrics..createSummary) ⇒ <code>Object</code>

<a name="module_metrics..init"></a>

### metrics~init(options) ⇒ <code>Object</code>
Initalize metrics with configuration.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - options  
**Access:** public  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_metrics..getMetrics"></a>

### metrics~getMetrics() ⇒ <code>String</code>
Gets all metrics -- will output a string for prometheus to consume.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Access:** public  
<a name="module_metrics..clear"></a>

### metrics~clear()
Removes all created metrics from memory.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Access:** public  
<a name="module_metrics..use"></a>

### metrics~use(name, labelKeys) ⇒ <code>Object</code>
Gets metrics for a given name.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - Metric  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the metric |
| labelKeys | <code>Array</code> | key:value pairs representing metric defined by create* functions |

<a name="module_metrics..createCounter"></a>

### metrics~createCounter(name, help, labels) ⇒ <code>Object</code>
Counters increase, and reset when the process restarts.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - Metrics  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the metric |
| help | <code>String</code> | Help description |
| labels | <code>Array</code> | Labels associated with the metric |

<a name="module_metrics..createGauge"></a>

### metrics~createGauge(name, help, labels) ⇒ <code>Object</code>
Gauges are similar to Counters; however, the value can be decreased for gauges.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - Metrics  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the metric |
| help | <code>String</code> | Help description |
| labels | <code>Array</code> | Labels associated with the metric |

<a name="module_metrics..createHistogram"></a>

### metrics~createHistogram(name, help, labels, params) ⇒ <code>Object</code>
Histograms track sizes and frequency of events.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - Metrics  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the metric |
| help | <code>String</code> | Help description |
| labels | <code>Array</code> | Labels associated with the metric |
| params | <code>Object</code> | Metric parameters |

<a name="module_metrics..createSummary"></a>

### metrics~createSummary(name, help, labels, params) ⇒ <code>Object</code>
Summary calculates the percentiles of observed values.

**Kind**: inner method of <code>[metrics](#module_metrics)</code>  
**Returns**: <code>Object</code> - Metrics  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the metric |
| help | <code>String</code> | Help description |
| labels | <code>Array</code> | Labels associated with the metric |
| params | <code>Object</code> | Metric parameters |

