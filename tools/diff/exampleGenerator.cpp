#include <bits/stdc++.h>
using namespace std;

int main(const int argc, const char **argv)
{
    int i = 0;
    unsigned int tid = 0;
    while (argv[1][i] >= '0' && argv[1][i] <= '9')
    {
        tid = 10 * tid + argv[1][i] - 48;
        i++;
    }
    srand(tid);
    cout<<rand();
}