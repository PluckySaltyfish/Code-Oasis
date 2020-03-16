# -*- coding:utf-8 -*-

def load_file(filepath,):
    with open(filepath,encoding='utf-8') as f:
        a = []
        for i in f:
            a.append(i.strip(' \n'))
        return a


def save_file(filepath, lst):
    with open(filepath, 'w', encoding='utf-8') as f:
        for i in range(len(lst)):
            f.write(lst[i])
            if i != len(lst) - 1:
                f.write('\n')
