package com.compilerworks.challenge;
/**
 * @author binu varghese
 *
 */
public class QueenPosition {

	int row;
	int column;

	QueenPosition() {
		row = 0;
		column = 0;
	}

	QueenPosition(int row, int column) {
		this.row = row;
		this.column = column;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + column;
		result = prime * result + row;
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof QueenPosition)) {
			return false;
		}
		QueenPosition other = (QueenPosition) obj;
		if (column != other.column) {
			return false;
		}
		if (row != other.row) {
			return false;
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "QueenPosition [row=" + row + ", column=" + column + "]";
	}

}
