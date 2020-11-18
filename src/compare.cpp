#include <bits/stdc++.h>
using namespace std;

int main(const int argc, const char **argv)
{
    //file 1 - user input
    //file 2 - expecrted output
    string line, l2;
    int l = 0;
    ifstream myfile(argv[1]), myfile2(argv[2]);
    if (myfile.is_open())
    {
        while (getline(myfile, line))
        {
            l++;
            if (getline(myfile2, l2))
            {
                if (line != l2)
                {
                    cout << "FILE " << argv[3] << " LINE " << l << "\n";
                }
            }
            else
            {
                cout << "FILE " << argv[3] << " EOF " << l << "(za długie wyjście)\n";
                break;
            }
        }
        if (getline(myfile2, l2))
        {
            cout << "FILE " << argv[3] << " EOF " << l << "(za krótkie wyjście)\n";
        }
        myfile.close();
        myfile2.close();
    }

    else
        cout << "Unable to open file" << argv[3];
}