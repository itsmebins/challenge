# N-Queens + no 3 queens in one straight lines

# Notes

I have implemented 2 algorithms

1. Linear search method --> linear search one way direction
2. L shape method -->  we find only available options in each iteration
	 	
- Queen position is encoded as a 2d array, with `[row][col] = 1` indicating a queen. We could use a different scheme, ie,
  `[0 ... col]` were the index is the row and the value is the column.
- There are lots of different solutions, including a closed form (at least for NQueens only). 


# Running

     gradle run -PappArgs="[4]"

# Testings

    ./gradlew test jacocoFullReport
    open build/reports/jacoco/jacocoFullReport/html/index.html
