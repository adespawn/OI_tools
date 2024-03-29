echo "Rozpoczyn porównywanie, wątek ${3} z ${2}"
echo "PID:${1}"
for i in $(bash -c "echo {${3}..1000000..${2}}"); do
    #generowanie testu
    ./bin/${1}_c $i >./out/${1}_${i}.in
    #wykonywanie testu na danych programach
    ./bin/${1}_a <./out/${1}_${i}.in >./out/${1}_${i}_a.out
    ./bin/${1}_b <./out/${1}_${i}.in >./out/${1}_${i}_b.out
    #porównywanie rozwiązań
    diff ./out/${1}_${i}_a.out ./out/${1}_${i}_b.out >./log/${1}_${i}.log
    if [ -s ./log/${1}_${i}.log ]; then
        #różne wyjścia: istnieje błąd
        echo "=======${i} not correct========="
    else
        #programy działają w ten sam sposób
        #usuwanie danego testu oraz outów
        rm ./out/${1}_${i}.in
        rm ./out/${1}_${i}_a.out
        rm ./out/${1}_${i}_b.out
        rm ./log/${1}_${i}.log
        # d=$i-${3}
        # if [ $(expr $d / ${2} % 1000) -eq 0 ]; then
        #     echo "Done ${i}"
        # fi

    fi
done
echo "Done"
sleep 1000000000
