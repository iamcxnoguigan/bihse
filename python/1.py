import pandas as pd
import intervals as I


def newInterval(left, right, lowerClose, upperClose):
    zoom = I.open(left, right)
    return zoom


def unionInterval(zoom1, zoom2):
    zoom = zoom1 | zoom2
    return zoom


def intersectionInterval(zoom1, zoom2):
    zoom = zoom1 & zoom2
    return zoom


z1 = newInterval(2, 4, False, False)
z2 = newInterval(6, 10, False, False)
f = intersectionInterval(z1, z2)
z3 = I.open(0, 1)
print(z3 <= f)

# ages = [20, 19, 30, 34, 23, 40, 50]
# se_ages = pd.Series(ages)
# bin = [0, 18, 25, 35, 60]
# se1 = pd.cut(se_ages, bin)
# print(se1)