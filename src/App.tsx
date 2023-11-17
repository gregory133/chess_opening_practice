import React, { useEffect, useRef, useState } from 'react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

import styles from './styles/App.module.css'
import './styles/Colors.css'
import './styles/Fonts.css'

import RefreshButton from './components/RefreshButton';
import { useChessStore } from './stores/chessStore';
import Stockfish, { Eval } from './classes/Stockfish';
import EvalBar from './components/EvalBar';

function App() {
  const navigateBackward=useChessStore(state=>state.navigatePositionListBackward)
  const navigateForward=useChessStore(state=>state.navigatePositionListForward)
  const boardParentRef=useRef(null)
  
  useEffect(()=>{
    Stockfish.getInstance().getEval(
      'rnb1kb1r/ppp1pppp/5n2/3q3Q/8/2N5/PPPP1PPP/R1B1KBNR b KQkq - 1 4')
    .then((evaluation:Eval)=>{
    })
  }, [])


  useEffect(()=>{
    hookupArrowKeyEvents()
  }, [])

  /**
   * hooks the arrow key press events. must be called once inside useEffect
   */
  function hookupArrowKeyEvents(){
    document.addEventListener('keydown', function(event){
      if (event.key=='ArrowLeft'){
        onLeftArrowKeyPressed()
      }
      else if (event.key=='ArrowRight'){
        onRightArrowKeyPressed()
      }
    })
  }

  /**
   * called when the left arrow key is pressed
   */
  function onLeftArrowKeyPressed(){
    navigateBackward()
  }

   /**
   * called when the right arrow key is pressed
   */
  function onRightArrowKeyPressed(){
    navigateForward()
  }

  return (
    <div className={styles.container}>
      <div className={styles.boardParent} ref={boardParentRef}>
        <Board parentRef={boardParentRef}/>
      </div> 
      <EvalBar/>
      <RefreshButton/>
      <Sidebar/>
    </div>
   
  );
}

export default App;
