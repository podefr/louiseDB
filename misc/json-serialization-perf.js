/*
    Quick test to see how performance degrades when serializing/deserializing objects of increasing sizes
*/

new Array(8).fill(1)
    .map((_, idx) => makeRunBenchmark(Math.pow(10, idx)))
    .map(fn =>
        setTimeout(() => {
            fn()
            console.log(`
memory Usage: ${ formatToUSNumber(process.memoryUsage().heapTotal)} B
===
        `)
        }, 0)
    );

function makeRunBenchmark(objectSize) {
    return function runBenchmark() {
        const object = getObjectOfSize(objectSize);
        let serializedObject;

        benchmark(`Serialize Object of size ${formatToUSNumber(objectSize)}`, () => {
            serializedObject = serialize(object);
        });

        benchmark(`Deserialize Object of size ${formatToUSNumber(objectSize)}`, () => {
            deserialize(serializedObject);
        });
    }
}

function benchmark(name, fn) {
    const startTime = Date.now();

    fn();

    console.log(`test "${name}" took ${formatToUSNumber(Date.now() - startTime)} ms to execute`);
}

function serialize(object) {
    return JSON.stringify(object);
}

function deserialize(string) {
    return JSON.parse(string);
}

function getObjectOfSize(size) {
    return new Array(size).fill({
        valueA: 1e7,
        valueB: "Short String"
    });
}

function formatToUSNumber(number) {
    return number.toLocaleString('en-US');
}
