/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let arr = nums1.slice(0, m)
    let i = 0
    let j = 0

    while (i < arr.length && j < nums2.length) {
        if (arr[i] < nums2[j]) {
            i++;
        } else {
            arr.splice(i, 0, nums2[j]);
            j++;
        }
    }

    arr = arr.concat(nums2.slice(j));
    nums1.length = 0;  
    nums1.push(...arr);   


};