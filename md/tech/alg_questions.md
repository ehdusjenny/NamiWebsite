#Algorithm Questions and Answers

Questions from [reddit][alg_post].
Please shoot me an e-mail if my solutions are wrong or not efficient!

## Question List:
1. [Find the most frequent integer in an array.](http://www.nami.kim/#!/tech/alg_questions#questionfindthemostfrequentintegerinanarray)
1. [Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time).](http://www.nami.kim/#!/tech/alg_questions#questionfindpairsinanintegerarraywhosesumisequalto10bonusdoitinlineartime)
1. [Given 2 integer arrays, determine of the 2nd array is a rotated version of the 1st array. Ex. Original Array `A = {1,2,3,5,6,7,8}`, Rotated Array `B = {5,6,7,8,1,2,3}`.](http://www.nami.kim/#!/tech/alg_questions#questiongiven2integerarraysdetermineofthe2ndarrayisarotatedversionofthe1starrayexoriginalarraya1235678rotatedarrayb5678123)
1. [Write fibbonaci iteratively and recursively (bonus: use dynamic programming).](http://www.nami.kim/#!/tech/alg_questions#questionwritefibbonaciiterativelyandrecursivelybonususedynamicprogramming)
1. [Find the only element in an array that only occurs once.](http://www.nami.kim/#!/tech/alg_questions#questionfindtheonlyelementinanarraythatonlyoccursonce)
1. [Find the common elements of 2 int arrays.](http://www.nami.kim/#!/tech/alg_questions#questionfindthecommonelementsof2intarrays)
1. [Implement binary search of a sorted array of integers.](http://www.nami.kim/#!/tech/alg_questions#questionimplementbinarysearchofasortedarrayofintegers)
1. [Implement binary search in a rotated array (ex. {5,6,7,8,1,2,3}).](http://www.nami.kim/#!/tech/alg_questions#questionimplementbinarysearchinarotatedarrayex5678123)
1. [Use dynamic programming to find the first X prime numbers.](http://www.nami.kim/#!/tech/alg_questions#questionusedynamicprogrammingtofindthefirstxprimenumbers)
1. [Write a function that prints out the binary form of an int.](http://www.nami.kim/#!/tech/alg_questions#questionwriteafunctionthatprintsoutthebinaryformofanint)
1. [Implement parseInt.](http://www.nami.kim/#!/tech/alg_questions#questionimplementparseint)
1. [Find the first non-repeated character in a String.](http://www.nami.kim/#!/tech/alg_questions#questionfindthefirstnonrepeatedcharacterinastring)
1. [Reverse a String iteratively and recursively.](http://www.nami.kim/#!/tech/alg_questions#questionreverseastringiterativelyandrecursively)
1. [Determine if 2 Strings are anagrams.](http://www.nami.kim/#!/tech/alg_questions#questiondetermineif2stringsareanagrams)

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
def iter_fib(n):
    first = 0
    second = 1
    for i in range(n):
        tmp = second
        second = first + second
        first = tmp
    print first

def recur_fib(first, second, n):
    if n > 0:
        return recur_fib(second, first + second, n-1)
    else:
        print first
    
n = 6
iter_fib(n)
recur_fib(0, 1, n)

fib_arr = {0: 0, 1: 1}
def dp_fib(n):
    if n in fib_arr:
        return fib_arr[n]
    else:
        fib_arr[n] = dp_fib(n-2) + dp_fib(n-1)
        return fib_arr[n]

n = 12
dp_fib(n)
print fib_arr[n]
```
</div>

## Question: Find the only element in an array that only occurs once.

**Solution**:
<div style="background-color: #d2def2">
```
arr = [2, 4, 6, 12, 3, 6, 4, 2, 3]

num_map = {}
for num in arr:
    if num not in num_map:
        num_map[num] = 1
    else:
        num_map[num] = num_map[num] + 1

for key in num_map:
    if num_map[key] == 1:
        print key
```
</div>

## Question: Find the common elements of 2 int arrays.

**Solution**:
<div style="background-color: #d2def2">
```
arr = [2, 4, 6, 12, 3, 6, 4, 2, 3]
arr2 = [4, 6, 11]

num_set = set()
for num in arr:
    num_set.add(num)

for num in arr2:
    if num in num_set:
        print num
```
</div>

## Question: Implement binary search of a sorted array of integers.

**Solution**:
<div style="background-color: #d2def2">
```
arr = [1, 5, 8, 12, 22, 78, 79, 92, 100, 101]

def binary_search(i, j, num):
    mid_pt = i + (j - i)/2
    if i == mid_pt:
        if arr[i] == num:
            return i
        elif arr[j] == num:
            return j
        else:
            return -1
    if arr[mid_pt] < num:
        return binary_search(mid_pt, j, num)
    elif arr[mid_pt] > num:
        return binary_search(i, mid_pt, num)
    else:
        return mid_pt
    
num = 101
print binary_search(0, len(arr) - 1, num)
```
</div>

## Question: Implement binary search in a rotated array (ex. {5,6,7,8,1,2,3}).

**Solution**:
<div style="background-color: #d2def2">
```
rotated_arr = [5, 6, 7, 8, 1, 2, 3]

cut = -1
for i in range(len(rotated_arr) - 1):
    if rotated_arr[i] > rotated_arr[i+1]:
        cut = i
        break
print cut
arr = rotated_arr[cut+1:]
arr.extend(rotated_arr[0:cut+1])

#perform binary search like above
```
</div>

## Question: Use dynamic programming to find the first X prime numbers.

**Solution**:
<div style="background-color: #d2def2">
```
prime_nums = [1]

def is_prime(num):
    for tmp in range(2, num/2):
        if num%tmp == 0:
            return False
    return True

def n_primes(n):
    num = prime_nums[len(prime_nums)-1] + 1
    while len(prime_nums) < n:
        print num
        print prime_nums
        if is_prime(num):
            prime_nums.append(num)
        num = num + 1    
    return prime_nums[:n]

n_primes(100)
```
</div>

##Question: Write a function that prints out the binary form of an int.

**Solution**:
<div style="background-color: #d2def2">
```
def int_to_binary(num):
    result = ""
    while num != 0:
        result = str(num%2) + result
        num = num/2
    print result

int_to_binary(333)
```
</div>

##Question: Implement parseInt.

**Solution**:
<div style="background-color: #d2def2">
```
str_to_num = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 0}

def parseInt(strNum):
    if strNum == "":
        print "String is empty"
        return
    digit = 10**(len(strNum) - 1)
    result = 0
    for char in strNum:
        if char in str_to_num:
            result = result + str_to_num[char]*digit
            digit = digit/10
        else:
            print "Parameter contains non-integer value"
            return
    print result
    
parseInt("132264")
```
</div>

##Question: Find the first non-repeated character in a String.

**Solution**:
<div style="background-color: #d2def2">
```
sentence = "abcdefabgcdef"

char_dict = {}
def find_first_nonrepeat():
  for char in sentence:
    if not char.isalpha():
      continue
    if char.lower() in char_dict:
      char_dict[char.lower()] = char_dict[char.lower()] + 1
    else:
      char_dict[char.lower()] = 1
      
  for char in sentence:
    if not char.isalpha():
      continue
    if char_dict[char.lower()] == 1:
      print char.lower()
      return
  print char_dict

find_first_nonrepeat()
```
</div>

##Question: Reverse a String iteratively and recursively.

**Solution**:
<div style="background-color: #d2def2">
```
sentence = "Reverse this String, please."

def reverse_string_iter(to_reverse):
  reversed = ""
  for char in to_reverse:
    reversed = char + reversed
  print reversed

reverse_string_iter(to_reverse)

def reverse_string_recur(to_reverse):
  if len(to_reverse) == 1:
    return to_reverse
  else:
    return reverse_string_recur(to_reverse[1:]) + to_reverse[0]
  
print reverse_string_recur(sentence)
```
</div>

##Question: Determine if 2 Strings are anagrams.

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: 

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: 

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: 

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

[alg_post]: https://www.reddit.com/r/cscareerquestions/comments/20ahfq/heres_a_pretty_big_list_of_programming_interview/ "Reddit Algorithm Post"