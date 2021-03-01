import React, { useState } from 'react';
import SingleTile from './singleTile';
import BabyTile from './babyTile';
import Button from './button';

const Tiles = (props) => {
    //BabyTiles
    const newWord = [];
    const [word, setWord] = useState(newWord);
    const addLetter = (event) => {
        setWord([...word, event.target.value]);
        console.log(newWord)
    }
    const selectedTiles = 
        word.map((e,i) => {
            return (
                <BabyTile key={i.toString()} value={e} />
            )
        })

    //BigTiles
    const tileContents = ["S","L","A","N","G","D","O","W","N"];
    const selectLetters = () => {
        if(props.letters===9) {
            props.letters.forEach((e,i) => {
                tileContents[i] = e;
            })
        }
    }
    selectLetters();

    const tiles = 
        tileContents.map((e,i) => {
            return (
                <SingleTile key={i.toString()} value={e} addLetter={addLetter} />
            )
        });

    return(
    <div className="gameTiles">
         <div className="letterTiles-container">
            {tiles}
        </div>
        <div className="babyTiles-container">
            {selectedTiles}
        </div>
        <div className="button-container">
            <Button value="Enter" />
        </div>
    </div>
       
    )
}

export default Tiles; 