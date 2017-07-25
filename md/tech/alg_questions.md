#Algorithm Questions and Answers

Questions from [reddit][alg_post].
Please shoot me an e-mail if my solutions are wrong or not efficient!

## Question: Find the most frequent integer in an array.

**Solution**:
<div style="background-color: #d2def2">
```
arr = [1, 3, 6, 2, 14, 3, 2, 1, 45, 45, 45, 45, 6, 3, 36, 77, 44]

tmp = {}

most_freq = arr[0]
count = 1
for num in arr:
    if num in tmp:
        tmp[num] = tmp[num] + 1
        if num == most_freq:
            count = count + 1
        if  count < tmp[num]:
            count = tmp[num]
            most_freq = num
    else:
        tmp[num] = 1
print most_freq
```
</div>

## Question: Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time).

**Solution**:
<div style="background-color: #d2def2">
```
arr = [1, 3, 6, 2, 3, 2, 1, 9, 4, 6]

tmp = {}
for el in arr:
    if el in tmp:
        tmp[el] = tmp[el] + 1
    else:
        tmp[el] = 1

for el in tmp:
    if (10 - el) in tmp:
        for i in range(tmp[10-el]):
            print str(el) + ", " + str(10 - el)
        tmp[10 - el] = 0
        tmp[el] = 0
```
</div>

## Question: Given 2 integer arrays, determine of the 2nd array is a rotated version of the 1st array. Ex. Original Array `A = {1,2,3,5,6,7,8}`, Rotated Array `B = {5,6,7,8,1,2,3}`.

**Solution**:
<div style="background-color: #d2def2">
```
arr = [1, 3, 6, 2, 3, 2, 1, 9, 4, 6]
arr2 = [2, 1, 9, 4, 6, 1, 3, 6, 2, 3]

if len(arr) != len(arr2):
    print "Nope."
else:
    str1 = "".join(map(str,arr))    #O(n)
    str1 = str1 + str1              #O(n)
    str2 = "".join(map(str,arr2))   #O(n)
    if str2 in str1:                #O(n)
        print "Yup."
    else:
        print "Nope."
```
</div>

## Question: Write fibbonaci iteratively and recursively (bonus: use dynamic programming).

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>




[alg_post]: https://www.reddit.com/r/cscareerquestions/comments/20ahfq/heres_a_pretty_big_list_of_programming_interview/ "Reddit Algorithm Post"