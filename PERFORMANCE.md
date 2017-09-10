# History of performance improvement

## Load testing scenario

Load testing scenario using ```005-read-write-performance.spec.js```:

Scenario 1: read+writes throughput tiny store size
    - as many read+writes as possible in 1 second
    ~ 10B insert size
    - <10KB resulting store size

Scenario 2: read+writes throughput small store size
    - as many read+writes as possible in 1 second
    ~ 700B insert size
    - <1MB resulting store size

Scenario 3: read+writes throughput medium store size
    - as many read+writes as possible in 1 second
    ~ 700KB insert size
    - <10MB resulting store size

Scenario 4: read+writes throughput large store size
    - as many read+writes as possible in 1 second
    ~ 70MB insert size
    - <100MB resulting store size

## Results

First test run without performance improvements:

Scenario  | Min | Avg | Max
-----------------------------
1 | 1596
-----------------------------
2
-----------------------------
3
-----------------------------



1. Don't return whole store when calling a setter
1. Only persist store on stop(), not after every ```set```
1. Leverage multiple processes

1. Don't return whole store when calling a setter

