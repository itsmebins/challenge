import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import HomeHeader from '../../components/Home/HomeHeader.js';

const NO_OF_BOARDS = 30;
class QueenGame extends Component {
  constructor(props) {
    super(props);
    this.queens = [];
    this.state = {
      boardSize: 4,
      board: this.initializeBoard(4),
      isGameOver: true,
      gameInProgress: false,
      msg: 'Please click start button to run this program',
      tableKey: Date.now(),
      queenThreeLine: false
    };
    this.findQueenPositionUsingDiagonalAlgorithm = this.findQueenPositionUsingDiagonalAlgorithm.bind(
      this
    );
    this.findQueeenPositions = this.findQueeenPositions.bind(this);
    this.applyBoardChanges = this.applyBoardChanges.bind(this);
  }

  findQueeenPositions() {
    setTimeout(_ => this.setState({ gameInProgress: true }), 1000 * 0.01);
    // this.setState({ gameInProgress: true });
    setTimeout(_ => this.startGame(), 1000 * 0.03);
  }

  angle = (anchor, point) =>
    Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;

  handleThreeLineQueenCheck = ev => {
    this.setState({ queenThreeLine: ev.target.checked });
  };

  applyBoardChanges(board) {
    this.setState({ board, tableKey: Date.now() });
    //this.forceUpdate();
  }

  startGame() {
    let hasSolution = false;
    for (let i = 0; i < this.state.boardSize; i++) {
      // reinitialize the array as we want to try with next row position freshly...
      let board = this.initializeBoard(this.state.boardSize);
      board[i][0] = 1;
      this.queens = [{ row: i, column: 0 }];
      const foundSolution = this.findQueenPositionUsingDiagonalAlgorithm(
        board,
        i,
        1
      );
      if (foundSolution) {
        console.log('Solution Exist with row position = ' + i);
        hasSolution = true;
        this.setState({
          gameInProgress: false,
          board,
          msg: 'We found first workiing set,please check the result..'
        });
        break;
      }
    }

    if (!hasSolution) {
      console.log(
        'Solution does not exist with this size = ' + this.state.boardSize
      );
      this.setState({
        board: this.initializeBoard(this.state.boardSize),
        gameInProgress: false,
        msg: 'We could not find the solution with this size, please try again'
      });
    }
  }

  findQueenPositionUsingDiagonalAlgorithm(board, rowRef, colRef) {
    try {
      /*  algorithm
       * 
       *  1. Keep queen in one initial position.
       *  
       *  2. Set that initial queen row as base and do iterations after finding the element which are available for next safe location..
       *  
       *  3. find the next position using diagonal algorithm
       *  
       *   initilal position: 00, then next position would be row = (row+2, row+3, etc or row-2, row -3, etc, column = column +1, then set new position as new base and continue till we reach a solution or 
       *  no slution criteria. 
       *  
       *  
       *  
       *  
      /*
       * If all queens are placed then return true
       */
      if (colRef >= this.state.boardSize) {
        return true;
        //return true;
      }

      // find the next available rows... then iterate

      let avaialbleRows = [];

      // find upper positions...
      let tempRowRef = rowRef - 2;
      while (tempRowRef >= 0) {
        avaialbleRows.push(tempRowRef);
        tempRowRef--;
      }

      // find lower positions...
      tempRowRef = rowRef + 2;
      while (tempRowRef < this.state.boardSize) {
        avaialbleRows.push(tempRowRef);
        tempRowRef++;
      }

      //  console.log('**** nextAvailable rows = ' + avaialbleRows);
      for (let i = 0; i < avaialbleRows.length; i++) {
        let rowPosition = avaialbleRows[i];
        const itemSatify = this.isItemSatisfyProgramRule(
          board,
          colRef,
          rowPosition
        );
        if (itemSatify) {
          /* console.log(
            '**** this position is safe, continue to next backtrack = ' +
              '[' +
              rowPosition +
              ']' +
              '[' +
              colRef +
              ']'
          ); */
          // continue backtracking, after setting safe position...
          board[rowPosition][colRef] = 1;
          try {
            document
              .getElementById(`cell_${rowPosition}${colRef}`)
              .classList.remove('emptyWhiteCell');
            document
              .getElementById(`cell_${rowPosition}${colRef}`)
              .classList.add('queenCell');
            console.log(
              document.getElementById(`cell_${rowPosition}${colRef}`).classList
            );
          } catch (e) {}
          //this.setState({board, tableKey: Date.now()});
          //this.applyBoardChanges([...board]);
          //setTimeout(_ => this.setState({board, tableKey: Date.now()}), 1000 * 1);
          // setTimeout(_ => this.applyBoardChanges([...board]), 1000 * 1);
          this.queens = [...this.queens, { row: rowPosition, column: colRef }];
          // queenPositions.add(new QueenPosition(avaialbleRows.get(i), colRef));
          const nextIteration = this.findQueenPositionUsingDiagonalAlgorithm(
            board,
            rowPosition,
            colRef + 1
          );
          if (nextIteration) {
            /* console.log(
              '**** this position is safe return true= ' +
                '[' +
                rowPosition +
                ']' +
                '[' +
                colRef +
                ']'
            ); */
            // printBoard(board);
            return true;
          } else {
            /* console.log(
              '**** this position is not safe reset board = ' +
                '[' +
                rowPosition +
                ']' +
                '[' +
                colRef +
                ']'
            ); */
            board[rowPosition][colRef] = 0;
            try {
              document
                .getElementById(`cell_${rowPosition}${colRef}`)
                .classList.remove('queenCell');
              document
                .getElementById(`cell_${rowPosition}${colRef}`)
                .classList.add('emptyWhiteCell');
            } catch (e) {}
            // this.setState({board, tableKey: Date.now()});
            // setTimeout(_ => this.setState({board, tableKey: Date.now()}),
            //1000 * 3);
            const removedQueens = this.queens.filter(queen => {
              return queen.row !== rowPosition && queen.column !== colRef;
            });
            this.queens = [...removedQueens];
            //  queenPositions.remove(new QueenPosition(avaialbleRows.get(i), colRef));
            //printBoard(board);
          }
        }
      }
      // no postion is fit in the column... so change the row sequence...
      return false;
    } catch (e) {
      console.log('**** Error : findQueenPosition = ');
      console.log(e);
    }
  }

  /**
   * @param board
   * @param colPos
   * @param rowPos
   * @return
   * @throws Exception
   */
  isItemSatisfyProgramRule(board, colPos, rowPos) {
    try {
      /*
     * rule no: 1--> only one queen in the row..
     * 
     * rule no: 2--> only one queen in the column...
     */
      for (let i = 0; i < this.state.boardSize; i++) {
        if (board[i][colPos] === 1 || board[rowPos][i] === 1) {
          /*console.log(
            '**** failed position  : row = ' +
              rowPos +
              ' , column = ' +
              colPos +
              ' , position =  ' +
              i
          ); */
          return false;
        }
      }

      /* Check upper diagonal on left side */
      let i, j;
      for (let i = rowPos, j = colPos; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
          return false;
        }
      }

      /* Check lower diagonal on left side */
      for (
        i = rowPos, j = colPos;
        j >= 0 && i < this.state.boardSize;
        i++, j--
      ) {
        if (board[i][j] === 1) {
          return false;
        }
      }

      /*
     * 
     *  rule 5, no 3 queens should not be in line...
     *  find the slope of the 2 queen points and save it , if slope is repeated then it means there are two pairs of points with same slope
     *  
     */

      if (
        this.state.queenThreeLine === true &&
        this.isPosSharedSameSlopeWithOtherPoints(rowPos, colPos)
      ) {
        return false;
      }

      return true;
    } catch (e) {
      console.error('**** Error : isItemSatisfyProgramRule = ');
    }
  }

  isPosSharedSameSlopeWithOtherPoints(row, col) {
    if (this.queens.length < 2) {
      return false;
    }

    let slopes = new Set();
    //console.log('queens')
    //console.log(this.queens)
    for (let i = 0; i < this.queens.length; i++) {
      const x = this.queens[i].row;
      const y = this.queens[i].column;
      let slope =
        x - row === 0
          ? Number.MAX_VALUE
          : this.angle({ x, y }, { x: row, y: col });
      // let slope =(this.queens[i].row - row === 0) ? Number.MAX_VALUE:
      // 0.0 + parseFloat((this.queens[i].column - col) / (this.queens[i].row - row));
      //System.out.println("**** Slope, point = "+ queenPos.toString() + " and poition [" + row + "]["+ col + "]");

      // System.out.println("**** slopes values = "+ slopes);

      //Double slope = (queenPos.row - row) == 0
      //   ? Integer.MAX_VALUE
      //  : Double.valueOf((double) (queenPos.column - col) / (double) (queenPos.row - row));
      //console.log('slopes')
      // console.log(slopes);
      if (slopes.has(slope)) {
        //console.log('slope ****')
        //console.log(slope);
        // console.log("**** 3 points = "+ x+", "+ y + " and poition [" + row + "]["+ col + "]");
        return true;
      }
      slopes.add(slope);
    }
    return false;
  }

  resetGame() {
    //set final reset object to component
    this.setState({
      boardSize: 4,
      gameInProgress: false,
      isGameOver: false,
      board: this.initializeBoard(4)
    });
    //console.log(currentMugArray);
  }

  setBoardValue(ev) {
    //if game is in progress do not do anything...
    if (this.state.gameInProgress === true) {
      return;
    }

    //console.log(coffeMugs);
    this.setState({
      boardSize: ev.target.value,
      board: this.initializeBoard(ev.target.value)
    });
  }

  renderQueenBoard() {
    let rows = [];
    let cellCount = 0;
    //console.log("board");
    //console.log(this.state.board);
    const boardLocal = this.state.board;
    const count = this.state.boardSize;
    const size = Math.floor(400 / count);
    for (let i = 0; i < count; i++) {
      let columns = [];
      for (let j = 0; j < count; j++) {
        columns.push(
          <td
            key={`${i}${j}`}
            id={`cell_${i}${j}`}
            style={{
              width: `${size}px`,
              height: `${size}px`
            }}
            className={boardLocal[i][j] === 1 ? 'queenCell' : 'emptyWhiteCell'}
          >
            <div style={{ alignItems: 'center' }}>
              <span>
                {boardLocal[i][j] === 1 ? (
                  <i className="fa fa-check" />
                ) : (
                  <i className="fa fa-ban" />
                )}
              </span>
            </div>
          </td>
        );
        cellCount++;
      }
      rows.push(
        <tr key={`${i}`} style={{ backgroundColor: 'white' }}>
          {columns}
        </tr>
      );
    }

    return (
      <table
        className="table table-bordered "
        style={{ width: '400', height: '400' }}
        key={this.state.tableKey}
      >
        <tbody>{rows}</tbody>
      </table>
    );
  }

  initializeBoard(boardSize) {
    //let coffeMugs = [];
    let rows = [];

    for (let i = 0; i < boardSize; i++) {
      let columns = [];
      for (let j = 0; j < boardSize; j++) {
        columns.push(0);
      }
      rows.push(columns);
    }

    return rows;
  }

  renderBoardOptions() {
    let optionsArray = [];
    for (let i = 2; i <= NO_OF_BOARDS; i++) {
      optionsArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return optionsArray;
  }

  renderStartBtn() {
    if (this.state.gameInProgress === true) {
      return (
        <button type="button" className="btn btn-info">
          Please wait...
        </button>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          this.findQueeenPositions();
        }}
      >
        Start
      </button>
    );
  }

  applyAnimationToRow(ev, elementName, startValue, endValue) {
    let childsNodes = document.getElementById(elementName).childNodes;
    for (let i = startValue; i >= endValue; i--) {
      try {
        if (
          childsNodes[i].children[0].classList.value === 'circle circle-fill'
        ) {
        } else {
          childsNodes[i].children[0].classList.add('circle', 'circle-fill');
        }
      } catch (e) {}
    }
  }

  render() {
    let msg = this.state.msg;
    if (this.state.gameInProgress) {
      msg = 'Please wait program is running';
    }

    return (
      <div className="app">
        <HomeHeader />
        <div className="animated fadeIn">
          <div className="card">
            <div className="card-header">
              <strong>
                {' '}
                <FormattedMessage id="N_QUEEN_PROBLEM_SOLVE" />
              </strong>
            </div>
            <div className="card-block">
              <div className="form-group row">
                <div className="col-md-3 col-sm-3">
                  <span>Select board size</span>
                </div>
                <div className="col-md-3 col-sm-4">
                  <select
                    id="coffeCupListSelect"
                    name="coffeCupListSelect"
                    className="form-control"
                    onChange={event => this.setBoardValue(event)}
                    ref={select => {
                      this.coffeCupListSelect = select;
                    }}
                    value={this.state.boardSize}
                  >
                    {this.renderBoardOptions()}
                  </select>
                </div>
                <div className="col-sm-3">{this.renderStartBtn()}</div>
              </div>
              <hr />
              <div className="form-group row" />
              <div className="form-group row">
                <div className="col-sm-4 col-md-4">
                  <label className="col-md-2 col-sm-2 form-control-label justify-content-center">
                    <FormattedMessage id="RESULT" />
                  </label>
                  <span>{'  '}</span>
                </div>
                <div className="col-sm-4 col-md-4">
                  <label className="form-control-label justify-content-center">
                    {msg}
                  </label>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 col-md-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      this.resetGame();
                    }}
                  >
                    Reset
                  </button>
                  <span>{'  '}</span>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="row">
                    <input
                      type="checkbox"
                      onChange={this.handleThreeLineQueenCheck}
                      defaultChecked={this.state.queenThreeLine}
                    />
                    <label className="cform-control-label justify-content-center">
                      {
                        ' Should not show 3 queens in one straight line. Please select lower values if you are selecting this option'
                      }
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-xl-9 col-md-9 col-sm-9 justify-content-center">
                <div className="row justify-content-center">
                  {this.renderQueenBoard()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(QueenGame);
