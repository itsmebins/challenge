import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import HomeHeader from '../../components/Home/HomeHeader.js';

const NO_OF_BOARDS = 50;

class QueenGame extends Component {
  constructor(props) {
    super(props);
    this.queens = [];
    this.workerUpdateIntervalId = -1;
    this.state = {
      boardSize: 4,
      board: this.initializeBoard(4),
      isGameOver: true,
      gameInProgress: false,
      msg: 'Please click start button to run this program',
      tableKey: Date.now(),
      queenThreeLine: true,
      showAnimation: true,
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight
    };
    this.findQueenPositionUsingDiagonalAlgorithm = this.findQueenPositionUsingDiagonalAlgorithm.bind(
      this
    );
    this.findQueeenPositions = this.findQueeenPositions.bind(this);
    this.applyBoardChanges = this.applyBoardChanges.bind(this);
    this.startGameUsingWorker = this.startGameUsingWorker.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

   findQueeenPositions() {
    let timeoutValue = 1000;
    if(this.state.boardSize < 15) {
       timeoutValue = 10;
    }
    setTimeout(_ => this.setState({ gameInProgress: true,  board:this.initializeBoard(this.state.boardSize) }), 0);
    if(!this.state.showAnimation) {
      setTimeout(_ => this.startGame(), 1000 * 0.03);
      return true;
    }
    let workerStarted = false;
    try {
      workerStarted = this.startGameUsingWorker();
    } catch (e) {
      console.error(e);
      workerStarted = false;
    }
    if (!workerStarted) {
      // start the game process in main thread...
      console.error('Worker failed.., starting program in main thread..');
      setTimeout(_ => this.startGame(), 1000 * 0.03);
    } else {
      this.workerUpdateIntervalId = setInterval(() => {
       /// console.log('worker update func...');
        ///console.log(window.workerData);
        try {
          if (window && window.workerData) {
            let data = window.workerData;
            let size = data && data.size ? data.size : 0;
            let localBoard = data && data.board ? data.board : undefined;
            let status = data && data.status ? data.status : undefined;
            let hasSolution = data && data.hasSolution ? data.hasSolution : undefined;
            if (status === 'finished') {
              clearInterval(this.workerUpdateIntervalId);
              for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                  try {
                    //const x = localBoard[i].row;
                    //const y = localBoard[i].column;
                    if(localBoard[i][j] === 1) {
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('emptyWhiteCell');
                    document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('queenCell');
                    document
                      .getElementById(`cell_${i}${j}`)
                      .classList.add('queenCell');
                    } else {
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('queenCell');
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.add('emptyWhiteCell');
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }
              }
              this.setState({
                gameInProgress: false,
                board: localBoard,
                msg: hasSolution === true ? 'We found first workiing set,please check the result..' : 'We could not find the solution with this size, please try again'
              });
            } else if (localBoard && status === 'inProgress') {
              for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                  try {
                    //const x = localBoard[i].row;
                    //const y = localBoard[i].column;
                    if(localBoard[i][j] === 1) {
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('emptyWhiteCell');
                    document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('queenCell');
                    document
                      .getElementById(`cell_${i}${j}`)
                      .classList.add('queenCell');
                    } else {
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.remove('queenCell');
                      document
                      .getElementById(`cell_${i}${j}`)
                      .classList.add('emptyWhiteCell');
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }
              }
            } else {
              // we could not find the state so reset everything..
              clearInterval(this.workerUpdateIntervalId);
              this.setState({
                gameInProgress: false,
                msg: 'There is a problem with your browser worker'
              });
            }
          } else {
            console.error('no worker data ');
            clearInterval(this.workerUpdateIntervalId);
            this.setState({
              gameInProgress: false,
              msg: "Your Browser does not support worker so please 'Please remove show animation option' "
            });
          }
        } catch (e) {}
      }, timeoutValue);
    }

    return Promise.resolve(true);
  }

  angle = (anchor, point) =>
    Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;

  handleThreeLineQueenCheck = ev => {
    this.setState({ queenThreeLine: this.state.showAnimation === true ? true: ev.target.checked });
  };

  handleAnimationCheck = ev => {
    console.log('animation');
    this.setState({ showAnimation: ev.target.checked,  queenThreeLine: ev.target.checked === true ? true: this.state.queenThreeLine});
  };

  applyBoardChanges(board) {
    this.setState({ board, tableKey: Date.now() });
    //this.forceUpdate();
  }

  async startGameUsingWorker() {
    if (window && window.gameWorker) {
      window.gameWorker.postMessage({ size: this.state.boardSize });
      return true;
    } else {
      console.log('no window.gameWorker');
      return false;
    }
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
          board[rowPosition][colRef] = 1;
          this.queens = [...this.queens, { row: rowPosition, column: colRef }];
          const nextIteration = this.findQueenPositionUsingDiagonalAlgorithm(
            board,
            rowPosition,
            colRef + 1
          );
          if (nextIteration) {
            return true;
          } else {
            board[rowPosition][colRef] = 0;
            const removedQueens = this.queens.filter(queen => {
              return queen.row !== rowPosition && queen.column !== colRef;
            });
            this.queens = [...removedQueens];
          }
        }
      }
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
      for (let i = 0; i < this.state.boardSize; i++) {
        if (board[i][colPos] === 1 || board[rowPos][i] === 1) {
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

      if (slopes.has(slope)) {
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
   // console.log(boardLocal);
    const count = this.state.boardSize;
    const size = Math.floor((100) / count);
    let heightSize = Math.floor((200) / count);
    const widthSize = Math.floor((300) / count);
    let columnStyle =  {
      width: `${size}%`,
      alignItems: 'center',
      borderStyle: 'ridge'
    }
    if(this.state.windowWidth > 350 && count < 11) {
      columnStyle =  {
        width: `30px`,
        height: '30px',
        alignItems: 'center',
        borderStyle: 'ridge'
      }
    } else if(this.state.windowWidth < 350 && count < 11) {
      columnStyle =  {
        width: `20px`,
        height: '20px',
        alignItems: 'center',
        borderStyle: 'ridge'
      }
    } else if(this.state.windowWidth > 350 && count < 14) {
      columnStyle =  {
        width: `30px`,
        height: '30px',
        alignItems: 'center',
        borderStyle: 'ridge'
      }
    }
    for (let i = 0; i < count; i++) {
      let columns = [];
      for (let j = 0; j < count; j++) {
        columns.push(
         /* <td
            key={`${i}${j}`}
            id={`cell_${i}${j}`}
            className={boardLocal[i][j] === 1 ? 'queenCell' : 'emptyWhiteCell'}
            style={{
              width: `${size}%`,
              height: `${heightSize}px`
            }}
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
          </td> */
          <div key={`${i}${j}`}
          id={`cell_${i}${j}`} 
          style={columnStyle}
          className={boardLocal[i][j] === 1 ? 'queenCell' : 'emptyWhiteCell'}>
          <span>
            {boardLocal[i][j] === 1 ? (
              <i className="fa fa-check" />
            ) : (
              <i className="fa fa-ban" />
            )}
          </span>
        </div>
        ); 
        cellCount++;
      }
      rows.push(
       /* <tr key={`${i}`} style={{ backgroundColor: 'white' }}>
          {columns}
        </tr> */
        <div key={`${i}`} className="row">
          {columns}
        </div>
      );
    }

    return (

      <div className="justify-content-cente" 
      style={{
        width: `95%`,
        height: `60%`,
        maxWidth: '95%',
        alignItems: 'center'
      }}>
          {rows}
      </div>


     /* <table
        className="table table-bordered"
        key={this.state.tableKey}
        style={{ width: '70%', height: '80%' }}
      >
        <tbody>{rows}</tbody>
      </table> */
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
                <div className="col-md-2 col-sm-3">
                  <span>Select board size</span>
                </div>
                <div className="col-md-2 col-sm-3">
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
                <div className="col-md-2 col-sm-2 justify-content-center">{this.renderStartBtn()}
                {'   '}
                </div>
                <div className="col-md-2 col-sm-2 justify-content-center">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      this.resetGame();
                    }}
                    disabled={this.state.gameInProgress}
                  >
                   {'   '} Reset
                  </button>
                </div>
              </div>
              <hr />
              <div className="col-xl-9 col-md-9 col-sm-9 justify-content-center">
                <div className="row justify-content-center">
                  {this.renderQueenBoard()}
                </div>
              </div>
              <hr />
              <div className="form-group row">
                <div className="col-sm-4 col-md-4">
                  <label className="form-control-label justify-content-center">
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
              <hr />
              <div className="form-group row">
              <div className="col-sm-4 col-md-4">
                  <label className="form-control-label justify-content-center">
                   Program options: 
                  </label>
                  <span>{'  '}</span>
                </div>
                <div className="col-sm-3 col-md-2">
                <div>
                <input
                      type="checkbox"
                      onChange={this.handleAnimationCheck}
                      checked={this.state.showAnimation}
                    />
                    <span> {' '}Show animation </span>
                  </div>
                </div>
                <div className="col-sm-3 col-md-2">
                <div>
                <input
                      type="checkbox"
                      onChange={this.handleThreeLineQueenCheck}
                      checked={this.state.queenThreeLine}
                    />
                    <span> {' '} Do not show 3 Queens in one line </span>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(QueenGame);

