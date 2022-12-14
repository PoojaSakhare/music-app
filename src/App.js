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

  const addNote = (noteIndex) => {

    audio.src = audios[Number(store.getState().allNoteReducer[noteIndex].audio)]
    let audioDuration = 0

    //Play clicked audio
    audio.play();

    //Get Audio Duration
    audio.addEventListener('loadedmetadata', (e) => {
      console.log(e.target.duration);
      audioDuration = e.target.duration;
      console.log('step 1');
      // audio.playbackRate = 2;

      //Add new note
      store.dispatch({
        type: actions.ADDED,
        payload: {
          note: store.getState().allNoteReducer[noteIndex],
          duration: audioDuration
        }
      })
      console.log('duration step 2', audioDuration )
    });

    // Remove all existing same column clicks
    store.getState().allNoteReducer.map(note => {
      if(note.column === store.getState().allNoteReducer[noteIndex].column && note.active === true ) { console.log('found'); removeNote(note.index)}
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

  const playAllNotes = () => {
    //Sort before play
    store.dispatch({
      type: actions.SORT
    })
    const audioHolder = store.getState().userClickedNoteReducer;
    console.log("audioholder", audioHolder[0].duration)

    let index = 1;
    //TODO: Add Silent sound to get started
    //Play first sound and add start/end time
    var audio = new Audio();
    audio.src = audios[0]
    audio.play();
    store.dispatch({
      type: actions.SET_START_END_TIME,
      payload: {
        duration: audioHolder[0].duration
      }
    })

    //Play Remaining audio and add start/end time
    audio.onended = function () {
      if (index < audioHolder.length) {
        console.log("before dispatch");
        store.dispatch({
          type: actions.SET_START_END_TIME,
          payload: {
            duration: audioHolder[index].duration
          }
        })
        console.log("after dispatch");
        audio.src = audios[Number(audioHolder[index].audio)]
        audio.play();
        index++;
      }
    };

    console.log("after play",store.getState().userClickedNoteReducer )
  }

  const deleteAllNotes = () => {
    console.log("got inside delete")
    store.dispatch({
      type: actions.DELETE
    })
    //TODO:Get rid of reload
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
              return <Note key={i} ref={ChildRef} index={i} note={NOTES[i]} addNote={addNote} removeNote={removeNote} setPitchText={setPitchText} onClick={() => { new Audio(sound2).play(); }} />
            })}
          </div>
        </div>
        <div className='action-buttons'>
          <div>
            <button className='delete-button' onClick={deleteAllNotes}>???????</button>
            <button className='play-button' onClick={playAllNotes}>??? </button>
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
