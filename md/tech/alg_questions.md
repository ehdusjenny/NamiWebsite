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

## Question: Given 2 integer arrays, determine if the 2nd array is a rotated version of the 1st array. Ex. Original Array `A = {1,2,3,5,6,7,8}`, Rotated Array `B = {5,6,7,8,1,2,3}`.

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
string1 = "anagram"
string2 = "nag a ram"

def is_anagram(string1, string2):
  list1 = list(string1)
  list2 = list(string2)
  list1 = [x for x in list1 if x != " "]
  list2 = [x for x in list2 if x != " "]
  list1.sort()
  list2.sort()
  return "".join(list1) == "".join(list2)
print is_anagram(string1, string2)
```
</div>

##Question: Check if String is a palindrome

**Solution**:
<div style="background-color: #d2def2">
```
string1 = "abcdefedcba"

def is_palindrome(string1):
  for i in range(len(string1)/2):
    if string1[i] != string1[len(string1)-1-i]:
      return False
  return True
print is_palindrome(string1)
```
</div>

##Question: Check if a String is composed of all unique characters

**Solution**:
<div style="background-color: #d2def2">
```
string1 = "abcd"

def has_only_unique_chars(string1):
  tmp = set()
  for char in string1:
    if char in tmp:
      return False
    else:
      tmp.add(char)
  return True
print has_only_unique_chars(string1)
```
</div>

##Question: Determine if a String is an int or a double

**Solution**:
<div style="background-color: #d2def2">
```
import re

string1 = "101"

def str_int_or_double(string1):
  if re.search('[a-zA-Z]', string1) != None:
    return "Neither int nor double"
  try:
    dot_ind = string1.index(".")
    return "Double"
  except:
    return "Integer"
print str_int_or_double(string1)
```
</div>

##Question: Print all permutations of a String

**Solution**:
This question took me way too long to solve... retry in the future.
<div style="background-color: #d2def2">
```
string1 = "abcd"

def all_permutations(str_input):
  if len(str_input) == 1:
    return [str_input]
  perm_list = []
  for char_index in range(len(str_input)):
    sub_perm_list = all_permutations(str_input[0:char_index] + str_input[char_index+1:len(str_input)])
    for perm in sub_perm_list:
      perm_list.append(str_input[char_index] + perm)
  return perm_list
    
result = all_permutations(string1)
result.sort()
print result
```
</div>

##Question: Implement a BST with insert and delete functions

**Solution**:
<div style="background-color: #d2def2">
```
class Node:
  def __init__(self, parent, value):
    self.value = value
    self.parent = parent
    self.left_child = None
    self.right_child = None
    
def search(root, value):
  if root.value == value:
    return root
  if value < root.value:
    return search(root.left_child, value)
  else:
    return search(root.right_child, value)
    
def insert(root, value):
  if value <= root.value:
    if not root.left_child:
      root.left_child = Node(root, value)
    else:
      insert(root.left_child, value)
  else:
    if not root.right_child:
      root.right_child = Node(root, value)
    else:
      insert(root.right_child, value)
  
def delete(root, value):
  if value == root.value:
    if not root.left_child and not root.right_child:
      if root.parent.left_child == root:
        root.parent.left_child = None
      else:
        root.parent.right_child = None
    elif root.left_child and not root.right_child:
      root.value = root.left_child.value
      delete(root.left_child, root.left_child.value)
    elif not root.left_child and root.right_child:
      root.value = root.right_child.value
      delete(root.right_child, root.right_child.value)
    else:
      tmp = root.right_child
      while(1):
        if tmp.left_child:
          tmp = tmp.left_child
        else:
          break
      root.value = tmp.value
      delete(tmp, tmp.value)
  elif value < root.value:
    if root.left_child:
      delete(root.left_child, value)
  else:
    if root.right_child:
      delete(root.right_child, value)
    
def print_tree(root, tab_num):
  string = ""
  for i in range(tab_num):
    string = string + " "
  print string + str(root.value)
  if root.left_child:
    print string + "left_child:"
    print_tree(root.left_child, tab_num+1)
  if root.right_child:
    print string + "right_child:"
    print_tree(root.right_child, tab_num+1)
```
</div>

##Question: Print a tree using BFS and DFS

**Solution**:
<div style="background-color: #d2def2">
```
def print_dfs(root):
  print root.value
  if root.left_child:
    print_bfs(root.left_child)
  if root.right_child:
    print_bfs(root.right_child)
    
def print_bfs(root):
  queue = Queue.Queue()
  queue.put(root)
  while not queue.empty():
    tmp = queue.get()
    print tmp.value
    if tmp.left_child:
      queue.put(tmp.left_child)
    if tmp.right_child:
      queue.put(tmp.right_child)
```
</div>

##Question: Write a function that determines if a tree is a BST

**Solution**:
<div style="background-color: #d2def2">
```
def is_bst(root):
  result = True
  if root.left_child:
    if root.left_child.value > root.value:
      return False
    result = result and is_bst(root.left_child)
  if root.right_child:
    if root.right_child.value < root.value:
      return False
    result = result and is_bst(root.right_child)
  return result
```
</div>

##Question: Find the smallest element in a BST

**Solution**:
<div style="background-color: #d2def2">
```
def smallest_element(root):
  if root.left_child:
    return smallest_element(root.left_child)
  else:
    return root
```
</div>

##Question: Find the 2nd largest number in a BST

**Solution**:
<div style="background-color: #d2def2">
```
def second_largest(root, left_bit = False):
  if root.right_child:22
    return second_largest(root.right_child, left_bit)
  elif root.left_child:
    return second_largest(root.left_child, True)
  else:
    if left_bit:
      return root
    else:
      return root.parent
```
</div>

##Question: Given a binary tree which is a sum tree (child nodes add to parent), write an algorithm to determine whether the tree is a valid sum tree

**Solution**:
<div style="background-color: #d2def2">
```
def is_sum_tree(root):
  sum = 0
  sub_sum_tree = True
  if not root.left_child and not root.right_child:
    return True
  if root.left_child:
    sum = sum + root.left_child.value
    sub_sum_tree = sub_sum_tree and is_sum_tree(root.left_child)
  if root.right_child:
    sum = sum + root.right_child.value
    sub_sum_tree = sub_sum_tree and is_sum_tree(root.right_child)
  return root.value == sum and sub_sum_tree
```
</div>

##Question: Print a tree by levels

**Solution**:
<div style="background-color: #d2def2">
```
def print_by_level(root):
  queue = Queue.Queue()
  queue.put(root)
  while not queue.empty():
    tmp = queue.get()
    if tmp.left_child:
      queue.put(tmp.left_child)
    if tmp.right_child:
      queue.put(tmp.right_child)
    print tmp.value
```
</div>

##Question: Implement a stack with push and pop functions

**Solution**:
<div style="background-color: #d2def2">
```
class Stack:
  def __init__(self):
    self.stack = []
    
  def push(self, item):
    self.stack.append(item)

  def pop(self):
    if not self.stack:
      print "Empty stack"
      return
    to_return = self.stack[-1]
    del self.stack[-1]
    return to_return
```
</div>

##Question: Implement a queue with queue and dequeue functions

**Solution**:
<div style="background-color: #d2def2">
```
class EmptyQueueError(Exception):
  pass

#Linked list node
class Node:
  def __init__(self, value):
    self.value = value
    self.head_pt = None
    self.tail_pt = None

class Queue:
  def __init__(self, node):
    self.head = node
    self.tail = node
    
  def queue(self, node):
    self.tail.tail_pt = node
    node.head_pt = self.tail
    self.tail = node

  def dequeue(self):
    if self.head:
      tmp = self.head
    else:
      raise EmptyQueueError
    if self.head.tail_pt:
      self.head = self.head.tail_pt
    else:
      self.head = None
    return tmp
```
</div>

##Question: Write a function that sorts a stack (bonus: sort the stack in place without extra memory)

**Solution**:
<div style="background-color: #d2def2">
```
#Since my implementation of a stack is based on an array, I can use any list sorting function, such as the built in `sort()`` function. `sort()` uses Timsort, which is inplace.

def sort(self):
    self.stack.sort()

```
</div>

##Question: Implement a binary min heap. Turn it into a binary max heap.

Min Heap:
**Solution**:
<div style="background-color: #d2def2">
```
class BinaryMinHeap:
  def __init__(self, value):
    self.list = [value]
  
  def insert(self, value):
    self.list.append(value)
    self.bubble_up(len(self.list) - 1)
      
  def bubble_up(self, index):
    if self.list[index/2] > self.list[index]:
      tmp = self.list[index/2]
      self.list[index/2] = self.list[index]
      self.list[index] = tmp
      self.bubble_up(index/2)
      
  def remove(self, index):
    self.list[index] = self.list[len(self.list) - 1]
    del self.list[-1]
    bubble_down(index)
    
  def bubble_down(self, index):
    if index*2 + 1 < len(self.list):
      tmp = self.list[index*2 + 1]
      self.list[index*2 + 1] = self.list[index]
      self.list[index] = tmp
      self.bubble_down(index*2 + 1)
    
  
  def print_tree(self, index = 0, tab_num = 0):
    tabs = ""
    for i in range(tab_num):
      tabs = tabs + "  "
    print tabs + str(self.list[index])
    if len(self.list) > index*2 + 1:
      self.print_tree(index*2 + 1, tab_num+1)
    if len(self.list) > index*2 + 2:
      self.print_tree(index*2 + 2, tab_num+1)
```
</div>

Max Heap:
**Solution**:
<div style="background-color: #d2def2">
```
#Only difference in bubble_up function

def bubble_up(self, index):
    if self.list[index/2] < self.list[index]:
      tmp = self.list[index/2]
      self.list[index/2] = self.list[index]
      self.list[index] = tmp
      self.bubble_up(index/2)
```
</div>

##Question: Implement a queue using 2 stacks

**Solution**:
<div style="background-color: #d2def2">
```
class Stack:
  def __init__(self):
    self.stack = []
    
  def push(self, item):
    self.stack.append(item)

  def pop(self):
    if not self.stack:
      print "Empty stack"
      return
    to_return = self.stack[-1]
    del self.stack[-1]
    return to_return
  
  def peek(self):
    return self.stack[-1]
  
  def length(self):
    return len(self.stack)

class QueueTwoStacks:
  def __init__(self):
    self.stack1 = Stack()
    self.stack2 = Stack()
  
  def queue(self, value):
    self.stack1.push(value)
    
  def dequeue(self):
    for i in range(self.stack1.length()):
      self.stack2.push(self.stack1.pop())
    tmp = self.stack2.pop()
    for i in range(self.stack2.length()):
      self.stack1.push(self.stack2.pop())
    return tmp
```
</div>

##Question: Implement a linked list (with insert and delete functions)

**Solution**:
<div style="background-color: #d2def2">
```
class Node:
  def __init__(self, value):
    self.value = value
    self.prev = None
    self.next = None

class LinkedList:
  def __init__(self):
    self.head = None
    self.tail = None
    
  def insert(self, node):
    if self.head:
      tmp = self.head
      while tmp.next:
        tmp = tmp.next
      tmp.next = node
      node.prev = tmp
      self.tail = node
    else:
      self.head = node
      self.tail = node
    
  def remove(self, node):
    if self.head:
      tmp = self.head
      while tmp:
        if tmp is node:
          if tmp.prev and tmp.next:
            tmp.prev.next = tmp.next
            tmp.next.prev = tmp.prev
          elif tmp.prev:
            tmp.prev.next = None
          elif tmp.next:
            self.head = tmp.next
            tmp.next.prev = None
          else:
            self.head = None
            self.tail = None
          break
        else:
          tmp = tmp.next
          
  def print_list(self):
    if self.head:
      tmp = self.head
      print tmp.value
      while tmp.next:
        print tmp.next.value
        tmp = tmp.next
```
</div>

##Question: Find and remove the Nth element in a linked list

**Solution**:
<div style="background-color: #d2def2">
```
def remove_nth(self, n):
  if self.head:
    tmp = self.head
    for i in range(n):
      if tmp.next:
        tmp = tmp.next
      else:
        print "Stack too small!"
    print tmp.value
    self.remove(tmp)
```
</div>

##Question: Check if a linked list has a cycle and print the beginning of the cycle

**Solution**:
<div style="background-color: #d2def2">
```
  def start_of_cycle(self):
    if self.head:
      tortoise = self.head
      hare = self.head
      while True:
        if tortoise.next:
          tortoise = tortoise.next
        if hare.next and hare.next.next:
          hare = hare.next.next
        else:
          print "No cycle!"
          return
        
        if tortoise is hare:
          print "Cycle exists!"
          break
      tortoise = self.head
      while tortoise is not hare:
        tortoise = tortoise.next
        hare = hare.next
    print tortoise.value
```
</div>

##Question: Check whether a linked list is a palindrome

**Solution**:
<div style="background-color: #d2def2">
```
def is_palindrome(self):
    tmp1 = self.head
    tmp2 = self.tail
    while tmp1.next and tmp2.prev:
      if tmp1.value == tmp2.value:
        if tmp1 is tmp2:
          break
        else:
          tmp1 = tmp1.next
          tmp2 = tmp2.prev
      else:
        return False
    return True
```
</div>

##Question: Implement bubble sort

**Solution**:
<div style="background-color: #d2def2">
```
def bubble_sort(list):
  while True:
    sorted = True
    for i in range(len(list) - 1):
      if list[i] > list[i+1]:
        tmp = list[i+1]
        list[i+1] = list[i]
        list[i] = tmp
        sorted = False
    if sorted:
      return
```
</div>
##Question: Implement selection sort

**Solution**:
<div style="background-color: #d2def2">
```
def selection_sort(list):
  for current_index in range(len(list)):
    smallest_index = current_index
    for i in range(current_index, len(list)):
      if list[i] < list[smallest_index]:
        smallest_index = i
    tmp = list[current_index]
    list[current_index] = list[smallest_index]
    list[smallest_index] = tmp
  print list
```
</div>
##Question: Implement insertion sort

**Solution**:
<div style="background-color: #d2def2">
```
def insertion_sort(list):
  for i in range(0, len(list)):
    value = i
    for j in reversed(range(i)):
      if list[value] < list[j]:
        tmp = list[j]
        list[j] = list[value]
        list[value] = tmp
      else:
        break
      value = j
```
</div>
##Question: Implement merge sort

**Solution**:
<div style="background-color: #d2def2">
```
def merge_sort(list):
  merge_sort_helper(list, 0, len(list) - 1)

def merge_sort_helper(list, i, j):
  if i >= j:
    return
  else:
    merge_sort_helper(list, i, (j+i)/2)
    merge_sort_helper(list, (j+i)/2 + 1, j)
    tmp = []
    index1 = i
    index2 = (j+i)/2 + 1
    while index1 <= (j+i)/2 and index2 <= j:
      if list[index1] < list[index2]:
        tmp.append(list[index1])
        index1 = index1 + 1
      else:
        tmp.append(list[index2])
        index2 = index2 + 1
    if index2 <= j:
      for index in range(index2, j+1):
        tmp.append(list[index])
    elif index1 <= (j+i)/2:
      for index in range(index1, (j+i)/2+1):
        tmp.append(list[index])
    
    tmp_index = 0
    for index in range(i, j+1):
      list[index] = tmp[tmp_index]
      tmp_index = tmp_index + 1
```
</div>
##Question: Implement quick sort

**Solution**:
<div style="background-color: #d2def2">
```
def quick_sort(list):
  quick_sort_helper(list, 0, len(list) - 1)

def quick_sort_helper(list, i, j):
  if i >= j:
    return
  else:
    pivot_index = j
    index = i
    while index < pivot_index:
      if list[index] > list[pivot_index]:
        if not pivot_index - index == 1:
          #swap pivot element with element before it
          tmp = list[pivot_index - 1]
          list[pivot_index - 1] = list[pivot_index]
          list[pivot_index] = tmp
          
        #swap element at index with element after pivot
        tmp = list[index]
        list[index] = list[pivot_index]
        list[pivot_index] = tmp
        
        pivot_index = pivot_index - 1
      else:
        index = index + 1
    quick_sort_helper(list, i, pivot_index - 1)
    quick_sort_helper(list, pivot_index + 1, j)
```
</div>

##Question: Find the shortest palindrome in a String

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Find the distance between 2 nodes in a BST and a normal binary tree

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Print the coordinates of every node in a binary tree, where root is 0,0

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Given a tree, verify that it contains a subtree.

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Find the max distance between 2 nodes in a BST.

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Construct a BST given the pre-order and in-order traversal Strings

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Find the minimum element in a stack in O(1) time

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

##Question: Reverse a linked list iteratively and recursively

**Solution**:
<div style="background-color: #d2def2">
```

```
</div>

[alg_post]: https://www.reddit.com/r/cscareerquestions/comments/20ahfq/heres_a_pretty_big_list_of_programming_interview/ "Reddit Algorithm Post"
