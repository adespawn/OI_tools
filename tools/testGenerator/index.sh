mkdir -p ./bin
mkdir -p ./paczki/$$/out
mkdir -p ./paczki/$$/in
#kompilacja programów
p1=$(basename -- "$1")
p1=$$+$p1
p2=$(basename -- "$2")
p2=$$+$p2
g++ $1 -o "./bin/${p1}" -std=c++17 -O3
g++ $2 -o "./bin/${p2}" -std=c++17 -O3
for i in $(bash -c "echo {1..${3}}"); do
    #generowanie testu
    ./bin/${p2} $i >./paczki/$$/in/${i}.in
    #wykonywanie testu na danych programach
    ./bin/${p1} <./paczki/$$/in/${i}.in >./paczki/$$/out/${i}.out
done

for i in $(bash -c "echo {1..${4}}"); do

gnome-terminal -- ./thread $$ $th $i $p1 $p2
done