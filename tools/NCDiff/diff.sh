#tworzenie ścieżek 
mkdir -p ./bin
mkdir -p ./out
mkdir -p ./log
cp thread.sh thread
chmod 775 thread
#kompilacja programów
cp $1 "./bin/${$}_a"
cp $2 "./bin/${$}_b"
g++ $3 -o "./bin/${$}_c" -std=c++17
#domyślnie liczba wątków = 1
if [ -z "$4" ]; then 
    th=1
    else 
    th=$4
fi
#Uruchamianie wątków
echo "Rozpoczynam ${th} wątki"
for i in $(bash -c "echo {1..${4}}"); do

gnome-terminal -- ./thread $$ $th $i
done