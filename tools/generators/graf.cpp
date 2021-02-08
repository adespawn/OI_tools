#include <bits/stdc++.h>
using namespace std;

void getTree(int q){
    int kr[q+1];
    for(int i=2;i<=q;i++){
        int pl=rand()%(i-1)+1;
        kr[i]=pl;
    }
    int mapw[q+1];
    for(int i=1;i<=q;i++){
        mapw[i]=i;
    }
    random_shuffle(mapw+1,mapw+1+q);
    for(int i=2;i<=q;i++){
        cout<<mapw[i]<<' '<<mapw[kr[i]]<<'\n';
    }
}

int main(const int argc, const char **argv){
    unsigned int tid=0,i=0;
    while (argv[1][i]>='0'&&argv[1][i]<='9')
    {
        tid=10*tid+argv[1][i]-48;
        i++;
    }
    for (int i=rand()%200;i>0;i--){
        rand();
    }
    srand(tid);


    int zap;
    cin>>zap;
    getTree(zap);
}