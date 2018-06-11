import { RESTORE_GAME_STATUS } from '../Actions/types.js';

const INITIAL_STATE = {
  coffeeCupNo: 2,
  totalCoffeeDrunkValue: 0,
  highestScore: 0,
  highScoreCupNo:0,
  isGameOver: false,
  gameInProgress: false,
  coffeeMugArrayData: [{
    id: 0,
    coffeeMugFillValue: 0,
    coffeeMuGLastFillId:55,
    startInterval: 55,
    endInterVal: 10,
    isGameOver: false
  },
  {
    id: 1,
    coffeeMugFillValue: 0,
    coffeeMuGLastFillId:55,
    startInterval: 55,
    endInterVal: 10,
    isGameOver: false
  }]
};

  export default (state = INITIAL_STATE, action) => {
    ////console.log(action);
  switch (action.type) {
    case RESTORE_GAME_STATUS:
      return { ...state,
        coffeeCupNo: action.payload.coffeeCupNo,
        totalCoffeeDrunkValue:action.payload.totalCoffeeDrunkValue,
        highestScore: action.payload.highestScore,
        highScoreCupNo:action.payload.highScoreCupNo,
        isGameOver: action.payload.isGameOver,
        gameInProgress: action.payload.gameInProgress,
        coffeeMugArrayData:action.payload.coffeeMugArrayData
        };
    default:
      return state;
  }
};
