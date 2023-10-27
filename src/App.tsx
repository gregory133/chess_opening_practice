import React, { useEffect, useRef, useState } from 'react';
import Board from './components/Board';
import './styles/App.css'
import * as cg from 'chessground/types.js';
import { Chess, Move } from 'chess.js';
import { fetchMastersDB, getSanListFromMasterDB } from './api/mastersDBApi';
import TrainingModeStrategy from './interfaces/TrainingModeStrategy';
import HumanVSMaster from './classes/trainingModes/HumanVSMaster';

function App() {

  const STARTING_FEN='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

  const [orientation, setOrientation]=useState<'black'|'white'>('white')
  const [currentFen, setCurrentFen]=useState<string>(STARTING_FEN)
  const currentFenRef=useRef<string>(currentFen)
  const [colorPlayerCanControl, setColorPlayerCanControl]=
  useState<'white'|'black'|null>('white')
  const [currentTrainingModeStrategy, setCurrentTrainingModeStrategy]=
  useState<TrainingModeStrategy>(new HumanVSMaster(makeEngineMove))
  const divRef=useRef(null)

  useEffect(()=>{
    const {fen, colorPlayerCanControl, orientation, canPlayerMove, onInit
    }=currentTrainingModeStrategy.initialValues; 

    currentFenRef.current=fen
    setColorPlayerCanControl(colorPlayerCanControl)
    setOrientation(orientation)
    onInit()
    
  }, [])

  /**
   * callback function that is run after a human player makes a move on the 
   * chess board
   * @param newFen 
   * @param previousMove 
   */
  function afterMove(newFen:string, previousMove:Move){
    currentFenRef.current=newFen
    currentTrainingModeStrategy?.afterMove(newFen, previousMove);
  }

  function makeEngineMove(san:string){
    let chess:Chess=new Chess(currentFenRef.current)
    chess.move(san)
    setCurrentFen(chess.fen())
  }
  
  return (
    <div ref={divRef} style={{width: '100vw', height: '100vh'}}>
      <Board parentRef={divRef} lastMove={undefined} 
      fen={currentFen} 
      colorPlayerCanControl={colorPlayerCanControl} 
      orientation={orientation}
       afterMove={afterMove} />
    </div>
   
  );
}

export default App;
