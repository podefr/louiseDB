#!/bin/bash

set -xe

docker run  -u`id -u`:`id -g` 
            --mount src=`pwd`,target=/mnt,type=bind
            -it louisedb-npm $@
