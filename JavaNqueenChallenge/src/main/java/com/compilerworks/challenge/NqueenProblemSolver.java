package com.compilerworks.challenge;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * @author binu varghese
 *
 */

public class NqueenProblemSolver {

	private int arraySize = 4;
	private int startRowPosition = 0;
	private int startColumnPosition = 0;
	private int algorithamType = 1; // 0 --> linear search, 1--> diagnoal search
	private Set<QueenPosition> queenPositions = null;
	private int[][] finalQueenPositions;

	/**
	 * @param args
	 * @throws Exception
	 */

	NqueenProblemSolver() {
	}

	/**
	 * @param arraySize
	 * @param algorithamType
	 */
	NqueenProblemSolver(int arraySize, int algorithamType) {
		this.arraySize = arraySize;
		this.algorithamType = algorithamType;
	}

	/**
	 * @return
	 * @throws Exception
	 */
	public boolean hasSolution() throws Exception {

		setQueenPositions(new HashSet<QueenPosition>(arraySize));
		int board[][] = fillArrayWithZeros(new int[arraySize][arraySize]);

		/*
		 * 2 algorithms one is basic and another one that I found myself
		 * 
		 * Algoitham 1. Iteration and backtracking ... // basic algoritham
		 * 
		 * 
		 */

		if (this.algorithamType == 0) {
			// Enable this one for base itration logic...
			if (findQueenPositionUsingIterationLogic(board,0, 0)) {
				System.out.print("Solution  exist");
				setFinalQueenPositions(board);
				//printBoard(board);
				return true;
			}

			return false;

		} else {

			/*
			 * Algoritham2. Find the element which is not in the column, row and diagonally
			 * then set that as base queen then continue the same logic till we find
			 * solution..
			 * 
			 * For an element [i, j] , we need a element that does not exist diagonally that
			 * will be anyone from this array..{[i+2, i+1], [i+3....<N, j+1] or [i-2, i+1],
			 * [i-3... > 0, j+1]}
			 * 
			 * then take next element from this array {[i+2, i+1], [i+3....<N, j+1] or [i-2,
			 * i+1], [i-3... > 0, j+1]} , then apply the same logic on thsese elements till
			 * we find the solution
			 * 
			 * 
			 */
			boolean hasSolution = false;
			/* no need this for loop, we can acheive this without for loop 
			 * 
			 * 
			 * just call this method with row=0 , if you do not want for loop...
			 * findQueenPositionUsingDiagonalAlgorithm(board, 0, 0)
			 * 
			 * 
			 */
			for (int i = 0; i < arraySize; i++) {
				// reinitialize the array as we want to try with next row position freshly...
				fillArrayWithZeros(board);
				board[i][0] = 1;
				queenPositions.clear();
				queenPositions.add(new QueenPosition(i, 0));
				if (findQueenPositionUsingDiagonalAlgorithm(board, i, 1)) {
					System.out.print("Solution Exist with row position = " + i);
					setFinalQueenPositions(board);
					// printBoard(board);
					return true;
				}
			}

			if (!hasSolution) {
				System.out.print("Solution does not exist with this size = " + getArraySize());
			}

			return false;
		}

	}

	/**
	 * @param board
	 */
	private void printBoard11(int board[][]) {
		System.out.println(" *************** board position ****************");
		for (int i = 0; i < arraySize; i++) {
			for (int j = 0; j < arraySize; j++) {
				System.out.print(" " + board[i][j] + " ");
			}
			System.out.println();
			System.out.println();
		}
	}
	
	/**
	 * 
	 */
	public void printBoard() {
		System.out.println(" *************** board position ****************");
		StringBuilder sw = new StringBuilder();

        for (int r = this.finalQueenPositions.length - 1; r >= 0; r--) {
            for (int c = 0; c < this.finalQueenPositions.length; c++) {
                sw.append(String.format("%d ", Integer.valueOf(this.finalQueenPositions[r][c])));
            }
            if (r > 0) {
                sw.append("\n");
            }
        }

        System.out.println(sw.toString());
	}
	
	private void printBoard(int board[][]) {
		System.out.println(" *************** board position ****************");
		StringBuilder sw = new StringBuilder();

        for (int r = board.length - 1; r >= 0; r--) {
            for (int c = 0; c < board.length; c++) {
                sw.append(String.format("%d ", Integer.valueOf(board[r][c])));
            }
            if (r > 0) {
                sw.append("\n");
            }
        }

        System.out.println(sw.toString());
	}


	/**
	 * @param board
	 * @return
	 * @throws Exception
	 */
	private int[][] fillArrayWithZeros(int[][] board) throws Exception {
		try {
			// expecting this as square and size that userselected
			for (int i = 0; i < arraySize; i++) {
				for (int j = 0; j < arraySize; j++) {
					board[i][j] = 0;
				}
			}
			return board;
		} catch (Exception e) {
			System.err.println("**** Error : fillArrayWithZeros = " + e.getMessage());
			e.printStackTrace();
			// error in program, it should not come here... so do not proceed
			// further.
			throw new Exception("Error while filling array with zero");
		}

	}

	/**
	 * @param board
	 * @param colPos
	 * @param rowPos
	 * @return
	 * @throws Exception
	 */
	private boolean isItemSatisfyProgramRule(int board[][], int colPos, int rowPos) throws Exception {
		try {

			/*
			 * rule no: 1--> only one queen in the row..
			 * 
			 * rule no: 2--> only one queen in the column...
			 */
			for (int i = 0; i < arraySize; i++) {

				if (board[i][colPos] == 1 || board[rowPos][i] == 1) {
					System.err.println("**** failed position  : row = " + rowPos + " , column = " + colPos
							+ " , position =  " + i);
					return false;
				}
			}

			/*
			 * rule no: 3 --> there should no only one queen in diagonal that point towards
			 * left side ie row side diagonal
			 */

			/* Check upper diagonal on left side */
			int i, j;
			for (i = rowPos, j = colPos; i >= 0 && j >= 0; i--, j--) {
				if (board[i][j] == 1) {
					return false;
				}

			}

			/* Check lower diagonal on left side */
			for (i = rowPos, j = colPos; j >= 0 && i < arraySize; i++, j--) {
				if (board[i][j] == 1) {
					return false;
				}

			}

			/*
			 * 
			 * rule 5, no 3 queens should not be in line... find the slope of the 2 queen
			 * points and save it , if slope is repeated then it means there are two pairs
			 * of points with same slope
			 * 
			 */

			if (isPosSharedSameSlopeWithOtherPoints(rowPos, colPos)) {
				return false;
			}

			return true;

		} catch (Exception e) {
			System.err.println("**** Error : isItemSatisfyProgramRule = " + e.getMessage());
			e.printStackTrace();
			// error in program, it should not come here... so do not proceed
			// further.
			throw new Exception("Error while checking rules isItemSatisfyProgramRule");
		}
	}

	/**
	 * @param board
	 * @param column
	 * @return
	 * @throws Exception
	 */
	private boolean findQueenPositionUsingIterationLogic(int board[][], int rowRef, int column) throws Exception {
		try {

			if (column >= arraySize) {
				return true;
			}
			
			if(rowRef == 0) {
				// starting new iteration
				queenPositions.clear();
			}

			for (int i = 0; i < arraySize; i++) {
				if (isItemSatisfyProgramRule(board, column, i)) {
					System.err.println("**** this position is safe, continue to next backtrack = " + "[" + i + "]" + "["
							+ column + "]");
					// continue backtracking, after setting safe position...
					board[i][column] = 1;
					queenPositions.add(new QueenPosition(i, column));
					if (findQueenPositionUsingIterationLogic(board, i, column + 1)) {
						System.err.println(
								"**** this position is safe return true= " + "[" + i + "]" + "[" + column + "]");
						printBoard(board);
						return true;
					} else {
						System.err.println(
								"**** this position is not safe reset board = " + "[" + i + "]" + "[" + column + "]");
						board[i][column] = 0;
						// since we added equalls and hashcode, it will remove the item with same row
						// and column
						queenPositions.remove(new QueenPosition(i, column));
						printBoard(board);
					}

				}

			}

			// no postion is fit in the column... so change the row sequence...
			return false;

		} catch (Exception e) {
			System.err.println("**** Error : findQueenPosition = " + e.getMessage());
			e.printStackTrace();
			// error in program, it should not come here... so do not proceed
			// further.
			throw new Exception("Error while finding  findQueenPosition");
		}

	}

	/**
	 * @param board
	 * @param rowRef
	 * @param colRef
	 * @return
	 * @throws Exception
	 */
	public boolean findQueenPositionUsingDiagonalAlgorithm(int board[][], int rowRef, int colRef) throws Exception {
		try {

			/*
			 * algorithm
			 * 
			 * 1. Keep queen in one initial position.
			 * 
			 * 2. Set that initial queen row as base and do iterations after finding the
			 * element which are available for next safe location..
			 * 
			 * 3. find the next position using diagonal algorithm
			 * 
			 * initilal position: 00, then next position would be row = (row+2, row+3, etc
			 * or row-2, row -3, etc, column = column +1, then set new position as new base
			 * and continue till we reach a solution or no slution criteria.
			 * 
			 * 
			 * 
			 * 
			 * /* If all queens are placed then return true
			 */
			if (colRef >= arraySize) {
				return true;
			}

			// find the next available rows... then iterate

			ArrayList<Integer> avaialbleRows = new ArrayList<Integer>();

			// find upper positions...
			int tempRowRef = rowRef - 2;
			while (tempRowRef >= 0) {
				avaialbleRows.add(tempRowRef);
				tempRowRef--;
			}

			// find lower positions...
			tempRowRef = rowRef + 2;
			while (tempRowRef < arraySize) {
				avaialbleRows.add(tempRowRef);
				tempRowRef++;
			}

			System.out.println("**** nextAvailable rows = " + avaialbleRows);
			for (int i = 0; i < avaialbleRows.size(); i++) {
				if (isItemSatisfyProgramRule(board, colRef, avaialbleRows.get(i))) {
					System.err.println("**** this position is safe, continue to next backtrack = " + "["
							+ avaialbleRows.get(i) + "]" + "[" + colRef + "]");
					// continue backtracking, after setting safe position...
					board[avaialbleRows.get(i)][colRef] = 1;
					queenPositions.add(new QueenPosition(avaialbleRows.get(i), colRef));
					if (findQueenPositionUsingDiagonalAlgorithm(board, avaialbleRows.get(i), colRef + 1)) {
						System.err.println("**** this position is safe return true= " + "[" + avaialbleRows.get(i) + "]"
								+ "[" + colRef + "]");
						printBoard(board);
						return true;
					} else {
						System.err.println("**** this position is not safe reset board = " + "[" + avaialbleRows.get(i)
								+ "]" + "[" + colRef + "]");
						board[avaialbleRows.get(i)][colRef] = 0;
						queenPositions.remove(new QueenPosition(avaialbleRows.get(i), colRef));
						printBoard(board);
					}

				}

			}
			// no postion is fit in the column... so change the row sequence...
			return false;

		} catch (Exception e) {
			System.err.println("**** Error : findQueenPosition = " + e.getMessage());
			e.printStackTrace();
			// error in program, it should not come here... so do not proceed
			// further.
			throw new Exception("Error while finding  findQueenPosition");
		}

	}

	/**
	 * @param row
	 * @param col
	 * @return
	 */
	boolean isPosSharedSameSlopeWithOtherPoints(int row, int col) {
		if (queenPositions.size() < 2) {
			return false;
		}

		Set<Double> slopes = new HashSet<>();
		for (QueenPosition queenPos : queenPositions) {

			double slope = (queenPos.row - row == 0) ? (double) Integer.MAX_VALUE
					: 0.0 + (double) (queenPos.column - col) / (double) (double) (queenPos.row - row);
			System.out
					.println("**** Slope, point = " + queenPos.toString() + " and poition [" + row + "][" + col + "]");

			System.out.println("**** slopes values = " + slopes);

			if (slopes.contains(slope)) {
				System.err.println("**** 3 points same line : Slope, point = " + queenPos.toString() + " and poition ["
						+ row + "][" + col + "]");
				return true;
			}
			slopes.add(slope);
		}
		return false;
	}

	public int getStartRowPosition() {
		return startRowPosition;
	}

	public void setStartRowPosition(int startRowPosition) {
		this.startRowPosition = startRowPosition;
	}

	public int getStartColumnPosition() {
		return startColumnPosition;
	}

	public void setStartColumnPosition(int startColumnPosition) {
		this.startColumnPosition = startColumnPosition;
	}

	public int getArraySize() {
		return arraySize;
	}

	/**
	 * @return the queenPositions
	 */
	public Set<QueenPosition> getQueenPositions() {
		return queenPositions;
	}

	/**
	 * @param queenPositions
	 *            the queenPositions to set
	 */
	public void setQueenPositions(Set<QueenPosition> queenPositions) {
		this.queenPositions = queenPositions;
	}

	public int[][] getFinalQueenPositions() {
		return finalQueenPositions;
	}

	public void setFinalQueenPositions(int[][] finalQueenPositions) {
		this.finalQueenPositions = finalQueenPositions;
	}
}
