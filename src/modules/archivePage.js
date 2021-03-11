import React, { useState, useEffect } from 'react';
import Word from './word';
import Menu from './menu';
import Score from './score';
import Tiles from './tiles';
import BarTimer from './barTimer'
import iterateComponent from './iterateComponent';
import veracityOfDefinitions from'./wordVeracity';
import chooseLetters from './chooseLetters';

const ArchivePage = (props) => {

//*********************************STATE DECLARATIONS***********************************
  const [gameState, setGameState] = useState('middle');
  const [letters,setLetters] = useState(null);
  const [score, setScore] = useState(0);
  const [savedWords, setSavedWords] = useState([]);
  const [wordVeracity,setWordVeracity] = useState([])

//****************************GAME STATE FUNCTION**************************************
  const manageGameState = () => {
    if(gameState==='start') setGameState('middle');
    else if(gameState==='middle') setGameState('end');
    else if (gameState==='end') setGameState('middle'); 
  }
//***********************************HOOKS*************************************
  useEffect(() => {
    const selectedLetters = chooseLetters(9);
    setLetters(selectedLetters);
  }, [])

//*******************************SCORE FUNCTION*****************************************

const scoreFunction = (points) => {
  if(typeof(points)==="number") setScore(score+points)
}
  
//**********************************ANSWER FUNCTIONS*************************************

  const saveWord = async (word) => {
    const wordIsUnique = !savedWords.includes(word);
    if(wordIsUnique) setSavedWords((prev) => [...prev, word])
    const veracity = await veracityOfDefinitions(word);
    setWordVeracity((prev) => [...prev, veracity]);
    if(wordIsUnique) {
      veracity ? scoreFunction(word.length) : scoreFunction(-1*word.length);
    }
  }

  const removeWord = (index) => {
    setSavedWords((prev) => prev.filter((e,i) => index!==i));
  }

  const answersProperties = {
    removeWord: removeWord,
    veracity: wordVeracity,
    score: scoreFunction,
  }
  const answers = iterateComponent(Word,savedWords,answersProperties)


//*********************************COMPONENTS********************************************
  return(
    <div className="grid-container">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="score-container">
        <Score value={score} />
      </div>
     
        <BarTimer time={30} />
     
      <ul className="word-container"> 
        {answers} 
      </ul>
      <div className="tiles-container">
        <Tiles  
          letters={letters}
          saveWord={saveWord}
          manageGameState={manageGameState}
          gameState={gameState}
        />
      </div>
    </div>
  )
}

export default ArchivePage;