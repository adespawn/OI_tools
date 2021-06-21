#!/bin/bash
help() {
    echo "Usage: c file [OPTIONS]"
    echo ""
    echo "Compiles and launches given program"
    echo ""
    echo "Options"
    echo "-l\t Places binary loacly"
    echo "-nf\t Copmpile without flags ( https://codeforces.com/blog/entry/15547 )"
    echo "-nb\t Do not backup source code ( requries https://github.com/adespawn/OI_tools/tree/main/tools/backup)"
}
mn=$(whoami)
cache="/home/$mn/.cache/c"
mydir="$(basename $PWD)"
if [ -d "$cache" ]; then
    e=""
else
    echo "Nie istnieje ścieżka ustawień: Tworzę $cache"
    mkdir -p "$cache"
fi
if [ "$1" = "-h" ] || [ "$1" == "--help" ]; then
    help
    return 0
fi
if [ -r "$1" ]; then
    wd="$cache/data$PWD/$1"
    mkdir -p $wd
    cp -r $1 $wd/$1
    #backup kompilowanego pliku

    outdir=$wd/$1.out
    f1=$1
    file=$wd/$1
    bp="true"
    #flags="-Wall -Wextra -pedantic -std=c++17 -O2 -Wshadow -Wformat=2 -Wfloat-equal -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond -Wcast-qual -Wcast-align -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -D_FORTIFY_SOURCE=2 -fsanitize=address -fsanitize=undefined -fno-sanitize-recover -fstack-protector"
    flags="-std=c++17"
    uinp="."
    #progrm flags handling
    while test $# -gt 0; do
        case "$1" in
        -h | --help)
            help
            return 0
            ;;
        -f)
            flags="-Wall -Wextra -pedantic -std=c++17 -O2 -Wformat=2 -Wfloat-equal -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond -Wcast-qual -Wcast-align -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -D_FORTIFY_SOURCE=2 -fsanitize=address -fsanitize=undefined -fno-sanitize-recover -fstack-protector"
            shift
            ;;
        -l)
            outdir="./${f1%.*}"
            shift
            ;;
        -nb)
            bp="false"
            shift
            ;;
        -t)
            shift
            outdir="./${f1%.*}"
            uinp="./${1}"
            shift
            ;;
        *)
            shift
            ;;
        esac
    done
    #kompilacja
    if [ $bp = "true" ]; then
    gnome-terminal -- backup $file
    fi
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
    if [ $uinp = "." ]; then
    $outdir
    else
    $outdir <$uinp
    fi

fi
