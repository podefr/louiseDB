#  Some research

The goal of this research is to find the best way to share data between threads so that LouiseDB can distribute read and writes as efficiently as possible.

Given that LouiseDB is immutable and transctional, every write access requires LouiseDB to clone the data to be mutated so that the changes can be commited to the DB once complete.
Unfortunately, the larger the data to be cloned, the longer it takes, and in a monothreaded environment that means queuing up subsequent read/writes, which means that the LouiseDB's performance is directly bound to it's serialization/deserialization speed.

In this research, I wanted to fine the quickest possible way to not only serialize/deserialize, but also efficiently share data between threads to potentially reduce the impact on the read accesses.

## JSON serialization perf

This is a naive test for a serializing/deserializing an object gradually increasing in size and measuring the time it takes. It using the defaut JSON.parse/stringify.

# JSON to binary perf

The goal here is to take an already stringified JS Object and convert it to a binary, then back to a string. This use case is common when using Shared Arrays as they can only store binary data. These Shared Arrays can be used to quickly share data between threads.
