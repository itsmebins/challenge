import { RESTORE_GAME_STATUS  } from './types.js';

export const logoutAction = () => {
  return (dispatch,  getState) => {
    //take it from local storage
    const gameStatus = {}
    dispatch({
      type: RESTORE_GAME_STATUS,
      payload: {gameStatus}
    });
  };
};
