### Types of sorting algorithms:
1. **Stable**: In the original list, record *R* appears before record *S* and they both have the same key, *R* will appear before *S* in the sorted list.

## Merge Sort

## Insertion Sort
The list is divided into two partitions, one sorted, other not sorted. The unsorted partition is looped through to find the smallest number and added to the sorted portion. Repeat until all is sorted. O(n^2).

## Timsort
Timsort is a hybrid stable sorting algorithm derived from merge sort and insertion sort.
Timsort is Python's standard sorting algorithm.

### Operation
Timsort iterates over the data looking for natural runs (runs of consecutive ordered elements) that are either strictly descending or non-descending. Descending runs are later reversed. Note that any two elements are either strictly descending or non-descending.
(FINISH LATER)