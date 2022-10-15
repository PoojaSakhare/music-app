import './App.css';
import { useRef, useState } from 'react';
import { notesData } from './data';
import store from './store';
import * as actions from './actions'

import Note from './Note';
import sound1 from './samples/D3.mp3'
import sound2 from './samples/D3.ogg'
import sound3 from './samples/E2.mp3'
import sound4 from './samples/E2.ogg'
import sound5 from './samples/E4.mp3'
import sound6 from './samples/E4.ogg'
import sound7 from './samples/G3.mp3'
import sound8 from './samples/G3.ogg'
import sound9 from './samples/G3.ogg'
import sound10 from './samples/G3.ogg'
import sound11 from './samples/G3.ogg'

const NOTES = notesData;

function App() {
  const ChildRef = useRef();
  const audioRef = useRef();
  const notes = [...Array(88).keys()];
  const audios = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11]

  const [pitchText, setPitchText] = useState('');

  let userClickedNotes = [];

  const addNote = (noteIndex) => {

    //Play clicked audio
    audio.src = audios[Number(store.getState().allNoteReducer[noteIndex].audio)]
    audio.play();

    // Remove all existing same column clicks
    store.getState().allNoteReducer.map(note => {
      if(note.column === store.getState().allNoteReducer[noteIndex].column && note.active === true ) { console.log('found'); removeNote(note.index)}
    })

    //Add new note
    store.dispatch({
      type: actions.ADDED,
      payload:{
        note: store.getState().allNoteReducer[noteIndex]
      }
    })
  }

  const removeNote = (noteIndex) => {
    console.log("remove", noteIndex)
    store.dispatch({
      type: actions.REMOVE,
      payload:{
        note: store.getState().allNoteReducer[noteIndex]
      }
    })
  }

  //Sort sequence and play all notes
  const playAllNotes = () => {
    const audioHolder = store.getState().userClickedNoteReducer;
    audioHolder.sort((a, b) => a.column - b.column)
    let index = 1;
    //TODO: Add Silent sound to get started
    var audio = new Audio();
    audio.src = audios[0]
    audio.play();
    audio.onended = function () {
      if (index < audioHolder.length) {
        audio.src = audios[Number(audioHolder[index].audio)]
        audio.play();
        index++;
      }
    };
  }

  const deleteAllNotes = () => {
    console.log("got inside delete")
    store.dispatch({
      type: actions.DELETE
    })
    if(window) window.location.reload();
  }

  var audio = new Audio();

  return (
    <div className="App">
      <audio
        controls="controls"
        preload="auto"
        autobuffer="true"
        style={{ display: "none" }}
        ref={audioRef}
      >
        <source src={sound1} />
      </audio>
      <div className='wrapper'>
        <div style={{
          transform: 'rotate(90deg)', position: 'absolute',
          height: '2px',
          background: 'black',
          width: '98px',
          marginTop: '-139px',
          marginRight: '-106px'
        }}></div>
       <div className='nodeboxesHolder'>
          <img id='music' src='/note.png' alt='musicIcon' />
        <hr style={{marginTop: '-53px'}}/><hr style={{marginTop: '-36px'}}/><hr style={{marginTop: '-19px'}}/><hr style={{marginTop: '-1px'}}/><hr style={{marginTop: '17px'}}/>
        
          <div className='stringsWrapper'>
            {notes.map((note, i) => {
              return <Note ref={ChildRef} index={i} note={NOTES[i]} addNote={addNote} removeNote={removeNote} setPitchText={setPitchText} onClick={() => { new Audio(sound2).play(); }} />
            })}
          </div>
        </div>
        <div className='action-buttons'>
          <div>
            <button className='delete-button' onClick={deleteAllNotes}>🗑️</button>
            <button className='play-button' onClick={playAllNotes}>▷ </button>
          </div>
          <div className='pitchDisplay'><span>{pitchText}</span></div>
          <div>
            <button className='harmonize-button'>Harmonize</button>
          </div>
        </div>
      </div>
      <div className='createdBy'> Created By
      </div>
      <div className='tooltiptext'> <span>Srish Kulkarni</span><span>Srish Kulkarni</span><span>Srish Kulkarni</span><span>Srish Kulkarni</span></div>
    </div>
  );
}

export default App;
