import React, { Component } from 'react';
import {
  FormattedMessage,
  injectIntl
} from 'react-intl';
import HomeHeader from  '../components/Home/HomeHeader.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../localStorage.js';

const NO_OF_COFFEE_MUGS = 10;
const COFFEE_MUG_MAX_FILL_LIMIT = 250;
const COFFEE_MUG_FILL_INTERVAL = 5;

const COFFEE_MUG_FILL_TOTAL_INTERVAL = 55;

const COFFEE_MUG_MAX_LIMIT = 100;
const COFFEE_MUG_MIN_LIMIT = 50;

const COFFEE_MUG_FILL_TIME_MAX_LIMIT = .3;
const COFFEE_MUG_FILL_TIME_MIN_LIMIT = .6;

class CoffeeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeCupNo: 2,
      totalCoffeeDrunkValue: 0,
      highestScore: 0,
      highScoreCupNo:0,
      isGameOver: false,
      gameInProgress: false,
      gamePaused: false,
      coffeeMugArrayData: [{
        id: 0,
        coffeeMugFillValue: 0,
        coffeeMuGLastFillId:COFFEE_MUG_FILL_TOTAL_INTERVAL,
        startInterval: COFFEE_MUG_FILL_TOTAL_INTERVAL,
        endInterVal: 10,
        isGameOver: false
      },
      {
        id: 1,
        coffeeMugFillValue: 0,
        coffeeMuGLastFillId:COFFEE_MUG_FILL_TOTAL_INTERVAL,
        startInterval: COFFEE_MUG_FILL_TOTAL_INTERVAL,
        endInterVal: 10,
        isGameOver: false
      }]
    }
    this.restartGame = this.restartGame.bind(this);
  };

  getRandomValue(maxValue, minValue) {
     return Math.floor(Math.random()*(maxValue-minValue+1)+minValue);
  };

  getRandomFillValue() {
     return Math.floor(Math.random()*(COFFEE_MUG_MAX_LIMIT-COFFEE_MUG_MIN_LIMIT+1)+COFFEE_MUG_MIN_LIMIT);
  };

  getRandomFillTimeValue() {
     return Math.floor(Math.random()*(COFFEE_MUG_FILL_TIME_MAX_LIMIT-COFFEE_MUG_FILL_TIME_MIN_LIMIT+1)+COFFEE_MUG_FILL_TIME_MIN_LIMIT);
  };

  startTheCoffeeGame() {
    //need to reset the game...
    if(this.state.isGameOver === true) {
      return;
    }
     const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
     //console.log("coffeeCupId "+coffeeCupId);
     const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
     this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId);
     this.setState({gameInProgress: true});
  };

  restartGame() {
    const savedState = loadFromLocalStorage("coffeeGameStatus");
    this.setState({gamePaused: false});
    const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
    const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
      setTimeout(_ => this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId),
      1000 * .1);

    /*just reset the game..
    if(true) {
       this.setState({gamePaused: false});
       const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
       const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
         setTimeout(_ => this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId),
         1000 * .1);
      //this.resetGame();
      return;
    }
    //
    const savedState = null
    //console.log(savedState);
    if(savedState) {
     const newState ={...savedState, gamePaused: false}
     const noOfMug = parseInt(savedState.coffeeCupNo, 10);
     this.setState({
       coffeeCupNo: noOfMug,
       totalCoffeeDrunkValue: savedState.totalCoffeeDrunkValue,
       highestScore: savedState.highestScore,
       highScoreCupNo:savedState.highScoreCupNo,
       isGameOver: savedState.isGameOver,
       gameInProgress: savedState.gameInProgress,
       gamePaused: false,
       coffeeMugArrayData: savedState.coffeeMugArrayData,
     });
     //console.log("savedState");
     //console.log(this.state);
     const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
     //console.log("coffeeCupId "+coffeeCupId);
     const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
     this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId);
     if(this.state.gamePaused === true) {
       //this.total();
       ////console.log(this.state);
       //const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
       ////console.log("coffeeCupId "+coffeeCupId);
       //const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
      // this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId);
     }
    } else {
      this.resetGame();
    //  this.startTheCoffeeGame();
    }

    //this.startTheCoffeeGame(); */
  };

  saveStateToLocalStorage() {
     const currentState = this.state;
     saveToLocalStorage("coffeeGameStatus",  currentState);
     this.setState({gamePaused: true});
     //console.log(loadFromLocalStorage("coffeeGameStatus"))
  };

  resetGame() {
    saveToLocalStorage("coffeeGameStatus",  null);
    let currentMugArray = this.state.coffeeMugArrayData;
    for(let i=0; i<currentMugArray.length; i++) {
      //reset all values
      currentMugArray[i].coffeeMugFillValue = 0;
      currentMugArray[i].coffeeMuGLastFillId = COFFEE_MUG_FILL_TOTAL_INTERVAL;
      currentMugArray[i].startInterval = COFFEE_MUG_FILL_TOTAL_INTERVAL;
      currentMugArray[i].endInterVal = 10;
      currentMugArray[i].isGameOver = false;

      // remove animated rows
      let childsNodes = document.getElementById(`coffeCup_${currentMugArray[i].id}`).childNodes;
      for(let i=0; i<55; i++) {
        try{
          if(childsNodes[i].children[0].classList.value === 'circle circle-fill') {
            childsNodes[i].children[0].classList.remove("circle", "circle-fill");
          } else {
            //childsNodes[i].children[0].classList.remove("circle", "circle-fill");
          }
        } catch(e) {
        }
      }
    }
    const currentMugNo = this.state.coffeeCupNo;
    const curhighestScore = this.state.highestScore;
    const curhighScoreCupNo = this.state.highScoreCupNo;
    //set final reset object to component
    this.setState({
      coffeeCupNo: currentMugNo,
      totalCoffeeDrunkValue: 0,
      highestScore: curhighestScore,
      highScoreCupNo:curhighScoreCupNo,
      gameInProgress: false,
      gamePaused: false,
      isGameOver: false,
      coffeeMugArrayData: currentMugArray
    });
    //console.log(currentMugArray);
  };

  drinkCoffee(mugName, id) {
    // game paused no need to fill
    if(this.state.gamePaused === true) {
      return;
    }

    let selectedMug = this.state.coffeeMugArrayData.find(
     mug => {
       return mug.id === id
     }
   );
   //if cup is empty no need to do any processing..
   if( selectedMug.coffeeMugFillValue === 0) {
     return;
   }

   //if game is over do not do anything....
   if(selectedMug.isGameOver === true) {
     return;
   }

    let childsNodes = document.getElementById(mugName).childNodes;
    for(let i=0; i<55; i++) {
      try{

        if(childsNodes[i].children[0].classList.value === 'circle circle-fill') {
            //childsNodes[i].children[0].classList.toggle('slideLeft');
            childsNodes[i].children[0].classList.remove("circle", "circle-fill");
              ////console.log(childsNodes[i].children[0].classList);
       } else {
        //console.log(childsNodes[i].id);
    //childsNodes[i].children[0].classList.add("circle", "circle-fill");
    //  //console.log(childsNodes[i].children[0].classList);
        }
      } catch(e) {

      }
    }


   selectedMug.coffeeMuGLastFillId = COFFEE_MUG_FILL_TOTAL_INTERVAL;
   let currentMugFillValue = selectedMug.coffeeMugFillValue
   selectedMug.coffeeMugFillValue = 0;

   const mugArray = this.state.coffeeMugArrayData.filter(
     mug => {
       return mug.id !== id
     }
   );
   mugArray.push(selectedMug);
   mugArray.sort((a, b) => {return a.id - b.id});

  //update total drink value
  const totalDrink = this.state.totalCoffeeDrunkValue + currentMugFillValue;
   this.setState({coffeeMugArrayData: mugArray, totalCoffeeDrunkValue: totalDrink});

  };

  setCoffeeMugsValue(ev) {
    //if game is in progress do not do anything...
    if(this.state.gameInProgress === true) {
      return;
    }
    let coffeMugs = [];
    for(let i= 0; i < ev.target.value; i++) {
      let mugObj = {
        id: i,
        coffeeMugFillValue: 0,
        coffeeMuGLastFillId:COFFEE_MUG_FILL_TOTAL_INTERVAL,
        startInterval: COFFEE_MUG_FILL_TOTAL_INTERVAL,
        endInterVal: 10,
        isGameOver: false
      }
      coffeMugs.push(mugObj)
    }
    //console.log(coffeMugs);
    this.setState({coffeeCupNo: ev.target.value, coffeeMugArrayData: coffeMugs});
  };

  fillCoffeeMug(mugName, id) {
    // game paused no need to fill
    if(this.state.gamePaused === true) {
      return;
    }
    // game is over so mo need to fill
    if(this.state.isGameOver === true) {
      return;
    }

    let selectedMug = this.state.coffeeMugArrayData.find(
     mug => {
       return mug.id === id
     }
   );
   //skip scheduled all cup functions..

   if(selectedMug && selectedMug.isGameOver === true) {
     return;
   }
   //check

   //console.log(id);
    const randomFillNumber = this.getRandomFillValue();
    const intervalValue = Math.floor((randomFillNumber/COFFEE_MUG_FILL_INTERVAL));
    const startingInter = selectedMug.coffeeMuGLastFillId;
    let endingInterVal = selectedMug.coffeeMuGLastFillId - intervalValue;
    //const unfilledValue = COFFEE_MUG_MAX_FILL_LIMIT - randomFillNumber;
    //const filledNo = (randomFillNumber/COFFEE_MUG_FILL_INTERVAL);
    //const unfilledNo = (unfilledValue/COFFEE_MUG_FILL_INTERVAL);
    //const minValue = COFFEE_MUG_FILL_TOTAL_INTERVAL - filledNo;
    if(endingInterVal < 0 || (selectedMug.coffeeMugFillValue + randomFillNumber) >= COFFEE_MUG_MAX_FILL_LIMIT) {
      endingInterVal = 0;
    }
    //console.log("this.state.coffeeMugFillValue"+ selectedMug.coffeeMugFillValue);
     //console.log("randomFillNumber"+ randomFillNumber);
    //console.log("startingInter"+ startingInter);
      //console.log("endingInterVal"+ endingInterVal);
    // if ending interval == 0 means need to animate and end game
    if(endingInterVal === 0) {
      this.applyAnimationToRow('', mugName, startingInter, endingInterVal);
      selectedMug.coffeeMuGLastFillId = endingInterVal;
      const la = selectedMug.coffeeMugFillValue + randomFillNumber;
      selectedMug.coffeeMugFillValue = la;

      const mugArray = this.state.coffeeMugArrayData.filter(
        mug => {
          return mug.id !== id
        }
      );
      mugArray.push(selectedMug);

      //inform all mugs that do not process the timer function
      const finalyMugArray = mugArray.map(
        mug => ({...mug, isGameOver: true})
      );
      finalyMugArray.sort((a, b) => {return a.id - b.id});
      if(this.state.totalCoffeeDrunkValue > this.state.highestScore) {
        this.setState({highestScore: this.state.totalCoffeeDrunkValue,
          highScoreCupNo: this.state.coffeeCupNo, isGameOver: true,
          gameInProgress: false,coffeeMugArrayData: finalyMugArray});
      } else{
        this.setState({gameInProgress: false, isGameOver: true, coffeeMugArrayData: finalyMugArray});
      }

      //return...
      return;
    }

    if(selectedMug.coffeeMuGLastFillId > 0 &&
      selectedMug.coffeeMugFillValue <= COFFEE_MUG_MAX_FILL_LIMIT) {
      this.applyAnimationToRow('', mugName, startingInter, endingInterVal);
      selectedMug.coffeeMuGLastFillId = endingInterVal;
      const la = selectedMug.coffeeMugFillValue + randomFillNumber;
      selectedMug.coffeeMugFillValue = la;

      const mugArray = this.state.coffeeMugArrayData.filter(
        mug => {
          return mug.id !== id
        }
      );
      mugArray.push(selectedMug);
      mugArray.sort((a, b) => {return a.id - b.id});

      this.setState({coffeeMugArrayData: mugArray});
      const coffeeCupId = this.getRandomValue((this.state.coffeeCupNo - 1), 0);
      const coffeeCupHtmlId = `coffeCup_${coffeeCupId}`;
        setTimeout(_ => this.fillCoffeeMug(coffeeCupHtmlId, coffeeCupId),
        1000 * this.getRandomFillTimeValue());
    } else {
      //inform all mugs that do not process the timer function
      const finalyMugArray = this.state.coffeeMugArrayData.map(
        mug => ({...mug, isGameOver: true})
      );
      finalyMugArray.sort((a, b) => {return a.id - b.id});
      if(this.state.totalCoffeeDrunkValue > this.state.highestScore) {
        this.setState({highestScore: this.state.totalCoffeeDrunkValue,
          highScoreCupNo: this.state.coffeeCupNo, isGameOver: true,
          gameInProgress: false,coffeeMugArrayData: finalyMugArray});
      } else{
        this.setState({gameInProgress: false, isGameOver: true, coffeeMugArrayData: finalyMugArray});
      }
    }
    //this.setState({coffeeCupNo: ev.target.value});
  };

  renderCoffeeMugs() {
    //let coffeMugs = [];
    const coffeMugs = this.state.coffeeMugArrayData.map( mug =>
      <div key={mug.id}>
        <div  id={`coffeCup_${mug.id}`} className="coffee-div-cup">
          {this.renderCoffeeTable(55,0)}
          <button
            type="button" className='btn'
            onClick={(e) => {this.drinkCoffee('coffeCup_'+mug.id, mug.id)}}>Drink</button>
        </div>
      </div>
    );
    return coffeMugs;
  };

  renderCoffeeMugsOptions() {
    let optionsArray = [];
    for(let i= 2; i <= NO_OF_COFFEE_MUGS; i++) {
      optionsArray.push(
          <option key={i} value={i}>{i}</option>
      )
    }
    return optionsArray;
  };

  renderStartBtn() {
    if(this.state.gamePaused  === true) {
      return(
        <button
          type="button" className='btn btn-info'
          onClick={()=> {this.restartGame()}}>Restart</button>
      );
    }

    if(this.state.gameInProgress  === true) {
      return(
        <button
          type="button" className='btn btn-primary'
          onClick={()=> { this.saveStateToLocalStorage() }}>Take a break</button>
      );
    }
    return(
      <button
        type="button" className='btn btn-primary'
        onClick={()=> {this.startTheCoffeeGame()}}>Start</button>
    )
  };


  renderCoffeeTable(colorRowNo, colorLessRowNo) {
    let colorRows = [];
    for(let i= 0; i < colorRowNo; i++) {
      ////console.log(this.getRandomFillValue());
      colorRows.push(
        <div id={i} key={i} className="circle circle-outer-border animated">
          <div  ></div>
        </div>
      )
    }
    let colorLessRows = [];
    for(let i= 0; i < colorLessRowNo; i++) {
        //console.log(this.getRandomFillValue());
      colorLessRows.push(
        <div id={colorRowNo+ 1+ i} key={colorRowNo+ 1+ i} className="circle circle-outer-border animated">
          <div  ></div>
        </div>
      )
    }

    return colorLessRows.concat(colorRows);
  };

  applyAnimationToRow(ev, elementName, startValue, endValue) {
    let childsNodes = document.getElementById(elementName).childNodes;
    for(let i=startValue; i>=endValue; i--) {
      try{
        if(childsNodes[i].children[0].classList.value === 'circle circle-fill') {
        } else {
          childsNodes[i].children[0].classList.add("circle", "circle-fill");
        }
      } catch(e) {
      }
    }
  };

  render() {
    let highScoreMsg = this.state.highestScore === 0 ? "" :
    `${this.state.highestScore} ml  with  ${this.state.highScoreCupNo} cups`;

    return (
      <div className="app">
        <HomeHeader />
        <div className="animated fadeIn">
          <div className="card">
            <div className="card-header">
              <strong>  <FormattedMessage id='COFFEE_GAME'/></strong>
            </div>
            <div className="card-block">

              <div className="form-group row">
                <div className="col-md-3 col-sm-3">
                  <span>Select coffee mug</span>
                 </div>
                <div className="col-md-3 col-sm-4">
                  <select id="coffeCupListSelect"
                    name="coffeCupListSelect"
                    className="form-control"
                    onChange={(event) => this.setCoffeeMugsValue(event)}
                    ref={(select) => { this.coffeCupListSelect = select; }}
                    value={this.state.coffeeCupNo}
                    >
                  {this.renderCoffeeMugsOptions()}
                  </select>

                </div>
                <div className="col-sm-3">
                  {this.renderStartBtn()}
                </div>
              </div>
             <hr></hr>
              <div className="form-group row">
                <label className="col-md-2 col-sm-2 form-control-label justify-content-center">
                   <FormattedMessage id='HIGH_SCORE'/>
                </label>
                <label className="col-md-2 col-sm-2 form-control-label">
                   {highScoreMsg}
                </label>
              </div>

              <div className="form-group row">
                <label className="col-md-2 col-sm-2 form-control-label">
                   <FormattedMessage id='TOTAL_DRUNK'/>{'ml  :  '}
                   {this.state.totalCoffeeDrunkValue}
                </label>
                <div className="col-sm-4 col-md-4">
                  <button
                    type="button" className='btn btn-primary'
                    onClick={()=> {this.resetGame()}}>Reset</button>
                    <span>{'  '}</span>

                </div>
              </div>
              <hr></hr>
              <div className="col-xl-9 col-md-9 col-sm-9 justify-content-center" >
                <div className="row">
                  <div className="coffee-div">
                    {this.renderCoffeeMugs()}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
    </div>
    );
  }
}

export default injectIntl(CoffeeGame);
