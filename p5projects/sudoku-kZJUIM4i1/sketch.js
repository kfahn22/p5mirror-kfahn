
/* A Backtracking program in
Javascript to solve Sudoku problem */

// Driver Code
let board1 = [ 
  [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
  [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
  [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
  [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
  [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
  [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
  [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]
];
		

let board = [
    [2, 0, 3, 0, 0, 8, 6, 0, 7],
    [1, 4, 0, 7, 2, 6, 0, 0, 9],
    [5, 0, 7, 1, 3, 9, 4, 2, 8],
    [0, 2, 5, 0, 8, 1, 9, 0, 4],
    [4, 1, 0, 9, 0, 3, 2, 0, 5],
    [0, 7, 9, 2, 0, 5, 0, 3, 6],
    [6, 0, 2, 0, 1, 0, 0, 9, 3],
    [7, 0, 0, 5, 0, 2, 0, 0, 1],
    [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

let N = board.length;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  stroke(255,0,0);
  if (solveSudoku(board, N))
{
	
	// Print solution
	print(board, N);
}
else
{
	p = createP("No solution");
}
}


function isSafe(board, row, col, num)
{
	
	// Row has the unique (row-clash)
	for(let d = 0; d < board.length; d++)
	{
		
		// Check if the number we are trying to
		// place is already present in
		// that row, return false;
		if (board[row][d] == num)
		{
			return false;
		}
	}

	// Column has the unique numbers (column-clash)
	for(let r = 0; r < board.length; r++)
	{
		
		// Check if the number
		// we are trying to
		// place is already present in
		// that column, return false;
		if (board[r][col] == num)
		{
			return false;
		}
	}

	// Corresponding square has
	// unique number (box-clash)
	let sqrt = Math.floor(Math.sqrt(board.length));
	let boxRowStart = row - row % sqrt;
	let boxColStart = col - col % sqrt;

	for(let r = boxRowStart;
			r < boxRowStart + sqrt; r++)
	{
		for(let d = boxColStart;
				d < boxColStart + sqrt; d++)
		{
			if (board[r][d] == num)
			{
				return false;
			}
		}
	}

	// If there is no clash, it's safe
	return true;
}

function solveSudoku(board, n)
{
	let row = -1;
	let col = -1;
	let isEmpty = true;
	for(let i = 0; i < n; i++)
	{
		for(let j = 0; j < n; j++)
		{
			if (board[i][j] == 0)
			{
				row = i;
				col = j;

				// We still have some remaining
				// missing values in Sudoku
				isEmpty = false;
				break;
			}
		}
		if (!isEmpty)
		{
			break;
		}
	}

	// No empty space left
	if (isEmpty)
	{
		return true;
	}

	// Else for each-row backtrack
	for(let num = 1; num <= n; num++)
	{
		if (isSafe(board, row, col, num))
		{
			board[row][col] = num;
			if (solveSudoku(board, n))
			{
				
				// print(board, n);
				return true;
			}
			else
			{
				
				// Replace it
				board[row][col] = 0;
			}
		}
	}
	return false;
}

function get_row(board, row) {
    // Given a board, we can return a single row
    return board[row]
}

function print_cell(value) {
    if (Array.isArray(value)) {
        return "."
    } else if (value == 0) {
        return "."
    } else {
        return value
    }
}

function print_board(board, N) {
    console.log()
    for (i = 0; i < 9; i++) {
        let row = get_row(board, i)
        if (i % 3 == 0) {
            console.log("|=======|=======|=======|")
        }
        console.log("|",
            print_cell(row[0]), print_cell(row[1]), print_cell(row[2]), "|",
            print_cell(row[3]), print_cell(row[4]), print_cell(row[5]), "|",
            print_cell(row[6]), print_cell(row[7]), print_cell(row[8]), "|")
    }
    console.log("|=======|=======|=======|")
}

// function print(board, N)
// {
	
// 	// We got the answer, just print it
// 	for(let r = 0; r < N; r++)
// 	{
// 		for(let d = 0; d < N; d++)
// 		{ let para1 = createP(board[r][d]);
// 			let para2 = createP(" ");
// 		}
// 		createP("<br>");

// 		if ((r + 1) % Math.floor(Math.sqrt(N)) == 0)
// 		{
// 			createP("");
// 		}
// 	}
// }


// Geeks for Geeks backtracking algorithm
// This code is contributed by avanitrachhadiya2155



