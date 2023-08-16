import { WINNER_COMBOS } from "../constants/constants";

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b ,c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null
  }

export const checkEndGame = (boardToCheck)=>{
    return boardToCheck.every(element => element !== null);
}

export const saveToLocalStorage = (nameInLocal, item) => {
  console.log(nameInLocal + " " + JSON.stringify(item));
  window.localStorage.setItem(nameInLocal, JSON.stringify(item));
}
export const getToLocalStorage = (nameInLocal) => {
  return window.localStorage.getItem(nameInLocal)
}