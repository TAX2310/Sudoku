var generate = require("./generate.js");

var genArray = generate.genArray;
var colCheck = generate.colCheck;
var squCheck = generate.squCheck;
var genPseudoku = generate.genPseudoku;
var visPseudoku = generate.visPseudoku;



var blank;

//a function to check if all integers from 1 to n appear in a single row of a 2d array where n is the number of columns of the 2d array
function singleRowCheck(arr,row) {
	
	var numCols = arr[row].length;

	// first we have a loop to check for all integers from 1 to the length of the row
	for (var i = 1; i <= numCols; i++) {

		// this variable is going to count the number of times the integer i is in the row; if it is ever greater than 1 then we will return false, if it equal to zero after checking all columns then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numCols; j++) {
			if (arr[row][j] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the row at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// this takes two numbers n and len and returns an array of length len which is the representation of number n in base 4 with as many zeroes at the beginning as necessary
// be careful that len is as big as it needs to be to print n in full
function conversion(n,len) {
	var con = [];
	while (Math.floor(n/4) != 0) {
		con.push(n % 4);
		n = Math.floor(n/4);
	}
	con.push(n % 4);

	// the array con is in the wrong order, so we will create a new array which gives us what we want in the right order
	var out = [];
	for (var i = con.length - 1; i >= 0; i--) {
		out.push(con[i]);
		con.pop();
	}

	// this will add extra zeroes at the beginning of the array so that conversion is at length len
	while (out.length < len) {
		out.splice(0,0,0);
	}

	return out;
}

// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING


function rowCheck(array) {

	var count = 0;

	for(var i = 0; i < array.length; i++){
		if(singleRowCheck(array,i)){
			count++
		}
	}
	if(count == array.length){
		return true;
	}
	return false;
	
	// this function should return a Boolean

}

function blankEntries(array) {

	blank = []

	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array.length; j++){
			if(array[i][j] === " "){
				blank.push([i,j]);
			}
		}
	}
	return blank;

	// this function should return an array

}

function makeCandidate(n,len) {

	var candidate = conversion(n,len);

	for(var i = 0; i < candidate.length; i++){
		candidate[i] += 1;
	}

	return candidate;

	// this function should return an array of integers between 1 and 4 of length len

}

function checkCandidate(array,candidate) {

	var arr = array;

	var arr2 = array;

	var can = candidate;

	for(var i = 0; i < blank.length; i++){
		arr[blank[i][0]].splice(blank[i][1],1,can[i]);
	}

	if(squCheck(arr) && colCheck(arr) && rowCheck(arr)){
		return true;
	}

	return false;

	// this function should return a Boolean saying whether a candidate assignment of numbers satisfies the Pseudoku conditions

}


function solvePseudoku(array) {

	blankEntries(array);

	var b = 4** blank.length;

	for(var i = 0; i < b; i++){

		var d = makeCandidate(i,blank.length)

		var c = checkCandidate(array,d);

		if(c){
			return array;
		}
	}

	return "No solution!";

	// this returns an array which is the completed Pseudoku puzzle

}


// WRITE YOUR TESTING CODE BELOW HERE

var arr1 = genPseudoku ([2 ,3 ,4 ,1] ,8) ;
console.log ( visPseudoku ( arr1 ) ) ;
var arr2 = genPseudoku ([4 ,2 ,3 ,1] ,10) ;
console.log ( visPseudoku ( arr2 ) ) ;
console.log ( visPseudoku ( solvePseudoku ( arr1 ) ) );
console.log ( visPseudoku ( solvePseudoku ( arr2 ) ) );

