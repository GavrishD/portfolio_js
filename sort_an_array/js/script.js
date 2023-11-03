// TASK 2.3 - Sort an array in different ways. 
// Determine the fastest and the most optimal working way.
// (Bubble Sort, Sort by choice, Insertion Sort, Quicksort, Merge Sort)

// Bubble Sort--------------------------------------------------------------
// https://www.youtube.com/watch?v=2KZJEj17Xl8&t=492s
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - 1 - i; k++) {
            if (arr[k] > arr[k + 1]) {
                const temp = arr[k];
                arr[k] = arr[k + 1];
                arr[k + 1] = temp;
            }
        }
    }
    document.write(`<div><span>Bubble Sort -></span><span>[${arr}]</span></div><br>`);
}

// Sort by choice-----------------------------------------------------------
// https://medium.com/@alivander/%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%BE%D0%BC-javascript-a5610af309c8
function selectionSort(arrSelection) {
    for (let i = 0; i < arrSelection.length - 1; i++) {
        let min = i;

        for (let k = i + 1; k < arrSelection.length; k++) {
            if (arrSelection[min] > arrSelection[k]) {
                min = k;
            }
        }
        if (min !== i) {
            [arrSelection[i], arrSelection[min]] = [arrSelection[min], arrSelection[i]];
        }
    }
    document.write(`<br><div><span>Sort by choice -></span><span>[${arrSelection}]</span></div><br>`);
}

// Insertion Sort-----------------------------------------------------------
// https://stackabuse.com/insertion-sort-in-javascript/
function insertionSort(arrInsertion) {
    for (let i = 0; i < arrInsertion.length; i++) {
        let currentIndex = arrInsertion[i];
        let k = i - 1;

        while ((k > -1) && (currentIndex < arrInsertion[k])) {
            arrInsertion[k + 1] = arrInsertion[k];
            k--;
        }
        arrInsertion[k + 1] = currentIndex;
    }
    document.write(`<br><div><span>Insertion Sort -></span><span>[${arrInsertion}]</span></div><br>`);
}

// Quicksort----------------------------------------------------------------
// https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/
function quickSort(arrQuick) {
    if (arrQuick.length <= 1) {
        return arrQuick;
    }

    let pivot = arrQuick[0];
    let leftArray = [];
    let rightArray = [];

    for (let i = 1; i < arrQuick.length; i++) {
        if (arrQuick[i] < pivot) {
            leftArray.push(arrQuick[i]);
        } else {
            rightArray.push(arrQuick[i]);
        }
    }
    return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}

// Merge Sort---------------------------------------------------------------
// https://www.tutorialspoint.com/how-to-implement-merge-sort-in-javascript
function mergeArr(leftArr, rightArr) {
    let arrMerge = [];

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            arrMerge.push(leftArr.shift())
        } else {
            arrMerge.push(rightArr.shift())
        }
    }
    return [...arrMerge, ...leftArr, ...rightArr];
}
function mergeSort(unsortedArr) {
    const middleIndex = unsortedArr.length / 2;

    if (unsortedArr.length < 2) {
        return unsortedArr;
    }
    const leftArr = unsortedArr.splice(0, middleIndex);
    return mergeArr(mergeSort(leftArr), mergeSort(unsortedArr));
}

// Finding random values in an array using user interaction-----------------
let array = [];
let userNumber = parseInt(prompt("Enter a number from 0 to 2000", "1234"));

if (userNumber >= 0 && userNumber <= 2000) {
    alert("The number is correct. Thank you!");
} else {
    alert("The number is incorrect. Please, enter a number from 0 to 2000 :)");
    location.reload();
}

for ( let i = 0; i <= 99; i++) {
    array.push(Math.round(Math.random() * userNumber));
}
document.write(`<div><span>User array -></span><span>[${array}]</span></div><br>`);

// Calling functions / passing array by value / results / counting code running time--------------------
let arrBubble = Object.assign([], array);
console.time("Bubble Sort");
bubbleSort(arrBubble);
console.log(arrBubble);
console.timeEnd("Bubble Sort");
// console.log(array.sort(bubbleSort));

let arrSelSort = Object.assign([], array);
console.time("Sort by choice");
selectionSort(arrSelSort);
console.log(arrSelSort);
console.timeEnd("Sort by choice");
// console.log(array.sort(selectionSort));

let arrInsSort = [ ...array ];
console.time("Insertion Sort");
insertionSort(arrInsSort);
console.log(arrInsSort);
console.timeEnd("Insertion Sort");
// console.log(array.sort(insertionSort));

let arrQuickSort = [ ...array ];
console.time("Quicksort");
document.write(`<br><div><span>Quicksort -></span><span>[${quickSort(arrQuickSort)}]</span></div><br>`);
console.log(arrQuickSort);
console.timeEnd("Quicksort");
// console.log(array.sort(quickSort));

let arrMergeSort = [ ...array ];
console.time("Merge Sort");
document.write(`<br><div><span>Merge Sort -></span><span>[${mergeSort(arrMergeSort)}]</span></div><br>`);
console.log(arrMergeSort);
console.timeEnd("Merge Sort");
// console.log(array.sort(mergeSort));