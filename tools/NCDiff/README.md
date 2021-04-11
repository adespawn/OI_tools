# diff
Narzędzie do porównywania 2 rozwiązań przy urzyciu generatorki testów.
## Używanie
Należy wywołać komendę ``sh diff.sh rozwiązanie1.cpp rozwiązanie2.cpp generatorkaTestów.cpp x``, gdzie ``rozwiązanie1.cpp`` oraz ``rozwiązanie2.cpp`` są kodami źródłowymi porównywanych rozwiązań, a ``generatorkaTestów.cpp`` jest programem służącym do generowania testów. Liczba x oznacza w ilu wątkach ma dziłać program prównujący, domyślnie x=1. Generatora będzie uruchamiana z 1 argumentem oznaczającym numer testu. Można go wykorzystać  jako seed do funkcji losującej. Przykładowy  program generujący: ``exampleGenerator.cpp`` załączony. Załączono program czyszczący pliki wygenerowane przez program porównujący: ``sh clean.sh``
