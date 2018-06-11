package com.compilerworks.challenge;
/**
 * @author binu varghese
 *
 */
public class NqueenProblemRunner {

    public static void main(String[] args) throws Exception {
    	try {
    		int size = 4;
        	int algorithamType = 1;
            if (args.length == 0) {
                System.out.println("No program arguments  -> To run via gradle: gradle run -PappArgs=\"[6]\" , continuing execution with size 4");
               // System.exit(1);
            } else if(args.length == 1)  {
            	System.out.println("found only one arguments   -> size so setting algorithm type = 1 ");
            	size = Integer.valueOf(args[0]);
            } else if(args.length == 2) {
            	size = Integer.valueOf(args[0]);
            	algorithamType = Integer.valueOf(args[1]);
            }
            
           
            NqueenProblemSolver challenge = new NqueenProblemSolver(size, algorithamType);
            if (challenge.hasSolution()) {
            	System.out.println("****** Solution ***********");
                challenge.printBoard();
            } else {
                System.err.printf("Couldn't find solution for board of %dx%d!", size, size);
            }
    	} catch(Exception e) {
    		 System.err.printf("Error in main method");
    		e.printStackTrace();
    		
    	}
    	
    }
}
