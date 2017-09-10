# History of performance improvement

## Load testing scenario

Load testing scenario using ```005-read-write-performance.spec.js```:

Scenario 1: read+writes throughput tiny store size
    * as many read+writes as possible in 1 second
    * ~10B insert size
    * <10KB resulting store size

Scenario 2: read+writes throughput small store size
    * as many read+writes as possible in 1 second
    * ~700B insert size
    * <1MB resulting store size

Scenario 3: read+writes throughput medium store size
    * as many read+writes as possible in 1 second
    * ~700KB insert size
    * <10MB resulting store size

Scenario 4: read+writes throughput large store size
    * as many read+writes as possible in 1 second
    * ~70MB insert size
    * <100MB resulting store size

## Results

First test run without performance improvements:

| Scenario | Min | Max   | Exec Time (ms) | Store size |
| :------- | :-: | :---: | :------------: | :--------: |
| 1 | 1134 | 1159 | 1000ms | ~12KB |
| 2 | 237 | 238 | 1000ms | ~208KB |
| 3 | 7 | 8 | ~1035ms | ~6MB |
| 4 | 1 | 1 | ~7000ms | ~85MB |

### Optimization 1. Don't return whole store when calling a setter

Returning the whole store when calling a setter incurs an extra cost for serializing/deserializing between the child process and the caller.
Returning true if the function succeeds instead of the whole store increase performance by ~30%.

| Scenario | Min | Max   | Exec Time (ms) | Store size |
| :------- | :-: | :---: | :------------: | :--------: |
1 | 1230 | 1412 | 1000ms | ~14KB |
2 | 313 | 320 | 1000ms | ~280KB |
3 | 10 | 10 | ~1100ms | ~8MB |
4 | 1 | 1 | ~4700ms | ~85MB |

### Optimization 2. Only persist store on stop(), not after every ```set```




### Optimization 3. Leverage multiple processes


