mn=$(whoami)
cache="/home/$mn/.cache/c"
mydir="$(basename $PWD)"
if [ -d "$cache" ]; then
    e=""
else
    echo "Nie istnieje ścieżka ustawień: Tworzę $cache"
    mkdir -p "$cache"
fi
if [ -r "$1" ]; then
    wd=$cache/data/$PWD/$1
    mkdir -p $wd
    cp -r $1 $wd/$1
    #backup kompilowanego pliku
    gnome-terminal -- node ~/.local/bin/bkpCli/index.js ${mydir}_$1 $PWD/$1
    #kompilacja
    outdir=$wd/$1.out
    f1=$1
    file=$wd/$1
    flags="-Wall -Wextra -pedantic -std=c++17 -O2 -Wshadow -Wformat=2 -Wfloat-equal -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond -Wcast-qual -Wcast-align -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -D_FORTIFY_SOURCE=2 -fsanitize=address -fsanitize=undefined -fno-sanitize-recover -fstack-protector"
    while test $# -gt 0; do
        case "$1" in
        -nf)
            # echo $1
            # echo "XD"
            flags="-std=c++17"
            shift
            ;;
        -l)
            # echo "${f1%.*}"
            outdir="./${f1%.*}"
            shift
            ;;
        *)
            # echo $1
            # echo "XX"
            shift
            ;;
        esac
    done

    # if [ -z "$2" ] || [ "$2" != "-nf" ]; then
        
    # else
    #     flags
    # fi
    g++ $flags $file -o $outdir
    errc=$?
    if [ $errc = "0" ]; then
        #kompilacja zakończona sukcesem
        echo -e 'Skompilowane\n======================================'
    else
        #błąd kompilacji
        Red='\033[0;31m'
        echo -e "${Red}Błąd kompilacji"
        return 1
    fi
    #wykonanie pliku
    $outdir

fi
