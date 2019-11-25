import pandas as pd
import intervals as I
import sys

print("脚本名：", sys.argv[0])
# for i in range(1, len(sys.argv)):   #这里参数从1开始
#     print("参数", i, sys.argv[i])


def newInterval(left, right, lowerClose, upperClose):  ##新建一个区间
    if(left == '-inf'):
        left = -I.inf
    if(right == 'inf'):
        right = I.inf
    zoom = I.open(left, right)
    return zoom


def unionInterval(zoom1, zoom2):  # 区间并集
    zoom = zoom1 | zoom2
    return zoom


def intersectionInterval(zoom1, zoom2):  #区间交集
    zoom = zoom1 & zoom2
    return zoom


def ifContain(z1, z2):  # 单区间的包含关系
    if((z1 <= z2) & (z1 >= z2)):
        return True
    else:
        return False




z1 = newInterval(2, 5, False, False)
z2 = newInterval(6, 10, False, False)
f = unionInterval(z1, z2)
z3 = I.open(2, 4)
print( f)
sys.stdout.flush()

# ages = [20, 19, 30, 34, 23, 40, 50]
# se_ages = pd.Series(ages)
# bin = [0, 18, 25, 35, 60]
# se1 = pd.cut(se_ages, bin)
# print(se1)