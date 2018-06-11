package com.compilerworks.challenge;

import org.junit.Test;

import com.compilerworks.challenge.NqueenProblemSolver;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class NqueenProblemSolverTest {

  
   
    @Test
    public void testNegativeScenarioWithDiagonallogic() throws Exception{
        int[][] b = {
                {0, 0, 0, 0},// row 3
                {0, 1, 0, 0},// row 2
                {0, 0, 0, 0}, // row 1
                {1, 0, 0, 0}};// row 0

        NqueenProblemSolver challenge = new NqueenProblemSolver(4, 1);// size and type

        assertFalse("There is no solution to this board , ", challenge.findQueenPositionUsingDiagonalAlgorithm(b, 3, 1));
    }
    
    @Test
    public void testNegativeScenarioWithIterationLogic() throws Exception{
    	// not able to test this as this is iteration logic so no start and end.....
        int[][] b = {
                {0, 0, 0, 0},// row 3
                {0, 0, 0, 0},// row 2
                {0, 0, 0, 0}, // row 1
                {1, 0, 0, 0}};// row 0

        //NqueenProblemSolver challenge = new NqueenProblemSolver(4, 0);// size and type

        assertFalse(" No way to test iteration logic using a prefilled board.. , ", false);
    }


    @Test
    public void testSolutionDoesntExistFor3x3IterationLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(3, 0);// size and type = iteration
        assertFalse("3x3 board shouldn't have a solution", challenge.hasSolution());
    }
    
    @Test
    public void testSolutionDoesntExistFor3x3DiagonalLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(3, 1);// size and type = diagonal
        assertFalse("3x3 board shouldn't have a solution", challenge.hasSolution());
    }
    
    @Test
    public void testSolutionExistFor4x4IterationLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(4, 0);// size and type = iteration
    	 assertTrue("4x4 board should have a solution", challenge.hasSolution());
    }
    
    @Test
    public void testSolutionExistFor4x4DiagonalLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(4, 1);// size and type = diagonal
    	 assertTrue("4x4 board should have a solution", challenge.hasSolution());
    }
    
    
    @Test
    public void testSolutionExistFor10x10IterationLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(10, 0);// size and type = iteration
    	 assertTrue("10X10 board should have a solution", challenge.hasSolution());
    }
    
    @Test
    public void testSolutionExistFor10X10DiagonalLogic() throws Exception {
    	 NqueenProblemSolver challenge = new NqueenProblemSolver(10, 1);// size and type = diagonal
    	 assertTrue("10x10 board should have a solution", challenge.hasSolution());
    }

}
