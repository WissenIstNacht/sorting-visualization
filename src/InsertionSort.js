/**
 * @author WissenIstNacht
 *
 * This file 
 *
 */




function insertionSort(a) {
  let n = a.length
  for (let i = 0; i < n; i++) {
    console.log(a)
    let j = i - 1;
    while (j >= 0) {
      if (a[j] > a[j + 1]) {
        a = swap(a, j, j + 1);
      } else {
        break;
      }
      j--;
    }
  }
  return a;
}
