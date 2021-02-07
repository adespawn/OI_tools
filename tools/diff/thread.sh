echo "Rozpoczyn porównywanie"
echo "PID:${1}"
for i in $(bash -c "echo {1..1000000..${2}}"); do
    ./bin/${1}_c $i >./out/${1}_${i}.in
    ./bin/${1}_a <./out/${1}_${i}.in >./out/${1}_${i}_a.out
    ./bin/${1}_b <./out/${1}_${i}.in >./out/${1}_${i}_b.out
    diff ./out/${1}_${i}_a.out ./out/${1}_${i}_b.out >./log/${1}_${i}.log
    if [ -s ./log/${1}_${i}.log ]; then
        echo "=======${i} not correct========="
    else
        rm ./out/${1}_${i}.in
        rm ./out/${1}_${i}_a.out
        rm ./out/${1}_${i}_b.out
        rm ./log/${1}_${i}.log
        if [ $(expr $i % 1000) -eq 0 ]; then
            echo "Done ${i}"
        fi

    fi
done
echo "Done"
sleep 1000000000
