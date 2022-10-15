import './App.css';
import { useRef, useState } from 'react';
import { notesData } from './data';
import store from './store';
import * as actions from './actions'

import Note from './Note';
import sound0 from './samples/1A.mp3'
import sound1 from './samples/2G.mp3'
import sound2 from './samples/3F.mp3'
import sound3 from './samples/4E.mp3'
import sound4 from './samples/5D.mp3'
import sound5 from './samples/6C.mp3'
import sound6 from './samples/7B.mp3'
import sound7 from './samples/8A.mp3'
import sound8 from './samples/9G.mp3'
import sound9 from './samples/10F.mp3'
import sound10 from './samples/11E.mp3'
import sound11 from './samples/12D.mp3'
import sound12 from './samples/13C.mp3'
import sound13 from './samples/14B.mp3'
import sound14 from './samples/15A.mp3'


const NOTES = notesData;

function App() {
  const ChildRef = useRef();
  const audioRef = useRef();
  const notes = [...Array(120).keys()];
  const audios = [sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10,  sound11, sound12, sound13, sound14]

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
          width: '70px',
          marginTop: '-158px',
          marginRight: '-106px'
        }}></div>
       <div className='nodeboxesHolder'>
          <img id='music' src='/note.png' alt='musicIcon' />
        <hr style={{marginTop: '-79px'}}/><hr style={{marginTop: '-43px'}}/><hr style={{marginTop: '-11px'}}/><hr style={{marginTop: '27px'}}/><hr style={{marginTop: '62px'}}/>
        
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
