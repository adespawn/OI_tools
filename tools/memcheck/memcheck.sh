#!/bin/bash
mprof clean
mprof run -T 0.05 ./$1  &
P1=$!
wait $P1
echo 'Done'
mprof plot 
