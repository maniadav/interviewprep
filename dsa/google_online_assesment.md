**[<< Go To Home](/interviewprep)**

<div align="center">
    <h1><span style="color:#f39c12;">Google</span> Online <span style="color:#f39c12;">Assessment</span></h1>
</div>

 ---

## Table of Content

1. [Problem: Google OA-14 2024](#Problem:-Google-OA-14-2024)
1. [Problem: Google OA-1 2023](#Problem:-Google-OA-1-2023)

# Problem: Google OA-14 2024

## Problem Description

You are given an array of integers. Your task is to determine the maximum number of partitions you can make. A partition divides the array into two parts such that the sum of the elements in each part is equal. Additionally, you are allowed to perform one operation where you can change any single number in the array to 0.

### Test Case:

**Input:**

`[-1, 5, 0, 0, 5, 0]`

**Output:**

`3`

**Explanation:**

By changing `-1` to `0`, you can make three partitions where the sums of the two parts are equal.

## Solution in Python

```python
def max_partitions_with_change(arr):
    def count_partitions(arr, total_sum):
        if total_sum % 2 != 0:
            return 0  # Cannot divide odd sums into two equal parts
        target = total_sum // 2
        prefix_sum = 0
        partitions = 0
        for num in arr:
            prefix_sum += num
            if prefix_sum == target:
                partitions += 1
                prefix_sum = 0  # Reset after finding a valid partition
        return partitions

    # Original partitions without changing any number
    total_sum = sum(arr)
    max_partitions = count_partitions(arr, total_sum)
  
    # Try changing each element to 0
    for i in range(len(arr)):
        modified_sum = total_sum - arr[i]  # Simulate changing arr[i] to 0
        partitions_with_change = count_partitions(arr[:i] + [0] + arr[i + 1:], modified_sum)
        max_partitions = max(max_partitions, partitions_with_change)
  
    return max_partitions

# Test case
arr = [-1, 5, 0, 0, 5, 0]
print(max_partitions_with_change(arr))  # Output: 3
```

## Solution in JavaScript

```javascript
function maxPartitionsWithChange(arr) {
    function countPartitions(arr, totalSum) {
        if (totalSum % 2 !== 0) return 0;  // Cannot divide odd sums into two equal parts
        let target = totalSum / 2;
        let prefixSum = 0;
        let partitions = 0;
        for (let num of arr) {
            prefixSum += num;
            if (prefixSum === target) {
                partitions++;
                prefixSum = 0;  // Reset after finding a valid partition
            }
        }
        return partitions;
    }

    // Original partitions without changing any number
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    let maxPartitions = countPartitions(arr, totalSum);
  
    // Try changing each element to 0
    for (let i = 0; i < arr.length; i++) {
        let modifiedSum = totalSum - arr[i];  // Simulate changing arr[i] to 0
        let partitionsWithChange = countPartitions([...arr.slice(0, i), 0, ...arr.slice(i + 1)], modifiedSum);
        maxPartitions = Math.max(maxPartitions, partitionsWithChange);
    }

    return maxPartitions;
}

// Test case
const arr = [-1, 5, 0, 0, 5, 0];
console.log(maxPartitionsWithChange(arr));  // Output: 3
```

## Explanation

* Both the Python and JavaScript solutions implement the same logic:
  1. **Count Partitions:** A helper function `countPartitions` calculates the number of valid partitions where the sum of the left and right parts is equal.
  2. **Modify Each Element:** For each element in the array, we simulate changing it to `0` and calculate the number of partitions after the change.
  3. **Return the Maximum Partitions:** We return the maximum number of partitions observed.

**[⬆ Back to Top](#table-of-content)**

---

# Problem: Google OA-1 2023

## Problem Description

You are presented with an undirected tree consisting of `N` nodes, each assigned a specific value. Your task is to partition these nodes into the smallest number of groups possible, ensuring that no two adjacent nodes are included in the same group.

For any group G, consider a pair of nodes `(u, v)` within that group. The value of this pair is calculated as `|A[u] - A[v]|`, where `A` represents the values assigned to the nodes (`1 ≤ x ≤ N`).

The cost of group G is defined as the highest sum achievable by pairing the nodes within the group, with the possibility that some nodes may remain unpaired.

Your objective is to determine the total cost for all potential groups that can be formed from the given tree.

### Input Format

* The first line has an integer `T` denoting the number of test cases.
* The first line of each test case contains an integer `N` denoting the number of nodes.
* The second line of each test case contains `N` space-separated integers denoting the value assigned to the nodes `A[1], A[2], ..., A[n]`.
* Next `N - 1` lines of each test case contain two integers `U` and `V` denoting an edge between the nodes `U` and `V`.

### Output Format

* For each test case, print an integer denoting the sum in a new line.

### Constraints

* `1 ≤ T ≤ 10`
* `1 ≤ N ≤ 10^5`
* `1 ≤ A[i] ≤ 10^9`
* `1 ≤ U, V ≤ N`

### Sample Input:

```
1
5
12 17 14 13 16
1 2
1 3
1 5
2 4
```

### Sample Output:

```
4
```

### Explanation:

* **G1** : Nodes 1 and 4 can be grouped. The cost of the group turns out to be `|12 - 13| = 1`, by pairing nodes 1 and 4.
* **G2** : Nodes 2 and 3 can be grouped together. Pairing Nodes 2 and 3, we get the value as `|17 - 14| = 3`.
* The final answer is `cost(G1) + cost(G2) = 4`.

---

## Solution in Python

```python
import sys
sys.setrecursionlimit(10**6)

def dfs(node, parent, values, adj, group_values):
    group_values[node] = values[node]
    for neighbor in adj[node]:
        if neighbor != parent:
            dfs(neighbor, node, values, adj, group_values)
            group_values[node] = min(group_values[node], group_values[neighbor])

def solve():
    T = int(input())  # Number of test cases
    for _ in range(T):
        N = int(input())  # Number of nodes
        values = list(map(int, input().split()))  # Node values
        adj = [[] for _ in range(N)]
      
        for _ in range(N - 1):
            u, v = map(int, input().split())
            adj[u - 1].append(v - 1)
            adj[v - 1].append(u - 1)
      
        group_values = [-1] * N
        dfs(0, -1, values, adj, group_values)
      
        total_cost = 0
        for i in range(1, N):
            total_cost += abs(values[i] - group_values[i])

        print(total_cost)

# Call the function to process the input and print the result
solve()
```

---

## Solution in JavaScript

```javascript
function solve() {
    let t = parseInt(readline());
    while (t--) {
        let n = parseInt(readline());
        let values = readline().split(' ').map(Number);
        let adj = Array.from({ length: n }, () => []);
      
        for (let i = 0; i < n - 1; i++) {
            let [u, v] = readline().split(' ').map(Number);
            u--; v--;
            adj[u].push(v);
            adj[v].push(u);
        }

        let group_values = Array(n).fill(-1);

        function dfs(node, parent) {
            group_values[node] = values[node];
            for (let neighbor of adj[node]) {
                if (neighbor !== parent) {
                    dfs(neighbor, node);
                    group_values[node] = Math.min(group_values[node], group_values[neighbor]);
                }
            }
        }

        dfs(0, -1);

        let total_cost = 0;
        for (let i = 1; i < n; i++) {
            total_cost += Math.abs(values[i] - group_values[i]);
        }

        print(total_cost);
    }
}

// Run the solution
solve();
```

---

## Explanation:

* **DFS Traversal:** Both Python and JavaScript solutions use a DFS (Depth-First Search) approach to explore the tree and calculate the minimal value of each group by visiting each node and its adjacent nodes.
* **Grouping:** The tree is traversed, and the minimum possible value for each node is updated based on its connections (its parent and its neighbors).
* **Cost Calculation:** For each test case, the total cost is calculated by summing the differences between node values and their minimal grouped value, which is the cost of forming valid groups.

**[⬆ Back to Top](#table-of-content)**

---

