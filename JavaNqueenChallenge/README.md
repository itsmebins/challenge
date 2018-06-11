# N-Queens + no 3 queens in one straight lines

# Notes

I have implemented 2 algorithms

1. Linear search method --> Traditional logic, fix one one side row or column and iterate till we find solution, we cannot give a starting position here..
2. L shape method -->  Here I find only available options, then pass this options to next iteration, then continue the same logic using backtracking. We can pass a point to this and find the solution exist in that position.
	 	

# Running

     gradle run -PappArgs="[4]"

# Testing

    ./gradlew test jacocoFullReport
    open build/reports/jacoco/jacocoFullReport/html/index.html
