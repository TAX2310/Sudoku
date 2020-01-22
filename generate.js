//a function to check if all integers from 1 to n appear in a column of a 2d array where n is the number of rows of the 2d array
function singleColCheck(arr,column) {
	
	var numRows = arr.length;
	var numCols = arr[0].length;

	// first we have a loop to check for all integers from 1 to the length of the column
	for (var i = 1; i <= numRows; i++) {

		// this variable is going to count the number of times the integer i is in the column; if it is ever greater than 1 then we will return false, if it equal to zero after checking all rows then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numRows; j++) {
			if (arr[j][column] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the column at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// a function to check that all integers appear in a square of a 2d array - (x1,y1) is the (row,colum) entry of the top-left element, and (x2,y2) is the bottom-right element of the square
// e.g. singleBlockCheck(arr,0,0,1,1) would check if the 2-by-2 block in the top-left contains all integers from 1 to 4
function singleBlockCheck(arr,x1,y1,x2,y2) {
	// this generates an array square of all the elements inside a particular square of a 2d array
	var square = [];
	for (var i = y1; i <= y2; i++) {
		for (var j = x1; j <= x2; j++) {
			square.push(arr[i][j]);
		}
	}

	// this then checks whether each integer from 1 to the length of the array square is inside the particular square
	var sqSize = square.length;
	for (var i = 1; i <= sqSize; i++) {
		var count = 0;
		for (var j = 0; j < sqSize; j++) {
			if (square[j] == i){
				count++;
			}
			if (count > 1){
				return false;
			}
		}
		if (count == 0){
			return false;
		}
	}

	return true;
}

// a function to randomly select n (row,column) entries of a 2d array with size columns and size rows, where size is assumed to be an integer and n is also assumed to be an integer
function entriesToDel(size,n) {
	if (n <= size ** 2) {

		// this creates an array of all the rows and column indices

		var array = [];
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				array[j+(size * i)] = [i,j];
			}
		}

		// this creates a new array, called array2 to store randomly chose elements of the array that will be removed, and then removes those elements from array

		var num = size ** 2;

		var array2 = [];
		for (var i = 0; i < n; i++) {
			var x = Math.round( (num - i - 1) * Math.random() );
			array2[i] = array[x];
			array.splice(x,1);
		}
		return array2;
	}
	return "Number of elements exceeds size of array!";
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING


function genArray(row) {
	
var arr = [];

for(var i = 0; i < row.length; i++){
	arr[i] = row.slice();
	}

return arr;
	// this function should return an array
}

function colCheck(arr) {

	for (var i = 1; i <= arr.length; i++){
	 	count = 0;
	 	for (var j = 0; j < arr.length; j++){
	 		if (arr[j][i - 1] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		if (count == 0) {
			return false;
		}
	}
	return true;
}

function squCheck(arr) {

// arr,x1,y1,x2,y2)

	if(singleBlockCheck(arr,0,0,1,1) == true &&
		singleBlockCheck(arr,2,0,3,1) == true &&
		singleBlockCheck(arr,0,2,1,3) == true &&
		singleBlockCheck(arr,2,2,3,3) == true){
		return true
	}
	return false;
	
	// this function should return a Boolean
}

function cyclicPerm(arr,row,n) {

	for (var j = 1; j <= n; j++) {
		var end = arr[row][3];
		for (var i = 3; i > 0; i--){
			arr[row][i] = arr[row][i-1];
		}
		arr[row][0] = end;
	}
	return arr;
	
	// this function should return an array
}

function perm(arr,a,b,c) {

	cyclicPerm(arr,1,a);
	cyclicPerm(arr,2,b);
	cyclicPerm(arr,3,c);

	return arr;

	// this function should return an array
}

function permArray(arr) {

	arrnew = [];

	for(var i = 1; i <= 4; i++){
		for(var j = 1; j <= 4; j++){
			for(var k = 1; k <= 4; k++){
				arrnew = perm(arr,i,j,k);
				if(colCheck(arrnew) && squCheck(arrnew)){
					return arrnew;
				}
			}
		}
	}
	return "ther is no solution";

	
	// this function should return an array or a string saying "There is no solution!"
}

function delEntries(arr,n) {

	arr = arr;
	arr2 = entriesToDel(4,n);

	for(var i = 0; i < n; i++){
		arr[arr2[i][0]] [arr2[i][1]] = " ";
	}
	return arr;
		
		// this function should return an array
}

function genPseudoku(row,n){

	return delEntries(permArray(genArray(row)),n);

	// this function should return an array
}

function visPseudoku(arr) {

	var p = arr;
	var vis = "";

	for(var i = 0; i < p.length; i++){
		vis = vis + "-----------------" + "\n";
		for(var j = 0; j < p[i].length; j++){	
			vis = vis + "|" + " " + p[i][j] + " ";
		}
		vis = vis + "|" + "\n";
	}
	vis = vis + "-----------------";

	return vis;

	// this function should return a string
}


module.exports = {
	genArray : genArray,
	colCheck : colCheck,
	squCheck : squCheck,
	genPseudoku : genPseudoku,
	visPseudoku : visPseudoku
};


// PUT YOUR NON-FUNCTION WORKING BELOW HERE, e.g. function calls, printing to the console, creation of variables
///////////////////////////////////////////////////////////////////////////////////////////////////////

