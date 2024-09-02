var numbers = [3, 56, 2, 48, 5];

console.log("----------Map---------");

//Map -Create a new array by doing something with each item in an array.
numbers.map((number) => console.log(number));

console.log("----------Filter---------");

//Filter - Create a new array by keeping the items that return true.
var newArr = [];
numbers.filter((number) => {
  if (number > 10) {
    newArr.push(number);
  }
});
console.log(newArr);

console.log("----------Reduce---------");

//Reduce - Accumulate a value by doing something to each item in an array.

var total = numbers.reduce((accumulator, number) => {
  return accumulator + number;
});
console.log(total);

console.log("----------Find---------");

//Find - find the first item that matches from an array.

var num = numbers.find((number) => {
  return number > 10;
});
console.log(num);

console.log("----------FindIndex---------");

//FindIndex - find the index of the first item that matches.

var index = numbers.findIndex((number) => {
  return number > 10;
});
console.log(index);
