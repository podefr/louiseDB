/*
    Quick test to see how performance degrades when serializing/deserializing objects of increasing sizes
*/

new Array(8).fill(1)
    .map((_, idx) => makeRunBenchmark(Math.pow(10, idx)))
    .map(fn => 
        setTimeout(() => {
            fn()
            console.log(`
memory Usage: ${ formatToUSNumber(process.memoryUsage().heapTotal) } B
===
            `)
        }, 0)
    );

function makeRunBenchmark(objectSize) {
    return function runBenchmark() {
        const string = getStringifiedObjectOfSize(objectSize);
        let binary;

        benchmark(`Convert Object of size ${ formatToUSNumber(objectSize) } to binary`, () => {
            binary = toBinary(string);
        });

        benchmark(`Convert Object of size ${ formatToUSNumber(objectSize) } from binary to string`, () => {
            fromBinary(binary);
        });
    }
}

function benchmark(name, fn) {
    const startTime = Date.now();

    fn();

    console.log(`test "${ name }" took ${ formatToUSNumber(Date.now() - startTime) } ms to execute`);
}

function toBinary(object) {
    return Buffer.from(object, 'utf16le');
}

function fromBinary(buffer) {
    return String(buffer);
}

function getStringifiedObjectOfSize(size) {
   return JSON.stringify(new Array(size).fill({
        valueA: 1e7,
        valueB: "Short String"
    }));
}

function formatToUSNumber(number) {
    return number.toLocaleString('en-US');
}