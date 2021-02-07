mkdir -p ./bin
mkdir -p ./out
mkdir -p ./log
cp thread.sh thread
chmod 775 thread
g++ $1 -o "./bin/${$}_a" -std=c++17
g++ $2 -o "./bin/${$}_b" -std=c++17
g++ $3 -o "./bin/${$}_c" -std=c++17
if [ -z "$4" ]; then 
    th=1
    else 
    th=$4
fi
echo "Rozpoczynam ${th} wątki"
for i in $(bash -c "echo {1..${4}}"); do

gnome-terminal -- ./thread $$ $th $i
done