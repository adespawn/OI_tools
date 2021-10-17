echo "Rozpoczyn generowanie, wątek ${3} z ${2}"
echo "PID:${1}"
for i in $(bash -c "echo {${3}..${4}..${2}}"); do
    #generowanie testu
    ./bin/${6} $i >./paczki/${1}/in/${i}.in
    #wykonywanie testu na danych programach
    ./bin/${5} <./paczki/${1}/in/${i}.in >./paczki/${1}/out/${i}.out
done
echo "Done"
sleep 1000000000
