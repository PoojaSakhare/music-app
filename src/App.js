import './App.css';
import { useEffect, useRef } from 'react';
import { notesData } from './data';

import Note from './Note';
import sound1 from './samples/D3.mp3'
import sound2 from './samples/D3.ogg'
import sound3 from './samples/E2.mp3'
import sound4 from './samples/E2.ogg'
import sound5 from './samples/E4.mp3'
import sound6 from './samples/E4.ogg'
import sound7 from './samples/G3.mp3'
import sound8 from './samples/G3.ogg'

const NOTES = notesData;

function App() {
  const ChildRef = useRef();
  const audioRef = useRef();
  const notes = [...Array(88).keys()];
  const audios = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8]

  let userClickedNotes = [];

  // useEffect(() => {
  //   ChildRef.current.callChildFunction();
  //   console.log(NOTES)
  // })

  const addNote = (noteIndex) => {

    let exists = false;
    let existingNote;

    Object.entries(NOTES).forEach(
      ([key, note]) => {
        if (note.column === NOTES[noteIndex].column && note.active === true) { exists = true; existingNote = note; note.active = false }
      }
    );
    if(exists){
      removeNote(existingNote.index);
  }

    NOTES[noteIndex].active = true;
    userClickedNotes.push(NOTES[noteIndex]);
    console.log("added", userClickedNotes)
  }

  const removeNote = (noteIndex) => {
     NOTES[noteIndex].active = false
    userClickedNotes = userClickedNotes.filter(function (audio) {
      return audio.index !== noteIndex
    })
    ChildRef.current.callChildFunction();
    console.log("remove", userClickedNotes)
  }

  const playAllNotes = () => {
    let index = 1;
    audio.src = audios[0]
    audio.play();
    audio.onended = function () {
      if (index < userClickedNotes.length) {
        //TODO: Uncomment this when all audios are added 
        // audio.src = audios[userClickedNotes[index].index % 8]
        audio.src = audios[0]
        audio.play();
        index++;
      }
    };
  }

  var audio = new Audio(sound1);

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
        <div className='nodeboxesHolder'>
          <img id='music' src='/note.png' alt='musicIcon' />
          <div className='stringsWrapper'>
            {notes.map((note, i) => {
              console.log("check",NOTES[i])
              return <Note ref={ChildRef} index={i} note={NOTES[i]} addNote={addNote} removeNote={removeNote} onClick={() => { new Audio(sound2).play(); }} />
            })}
          </div>
        </div>
        <div className='action-buttons'>
          <div>
            <button className='delete-button' onClick={() => { userClickedNotes = []; window.location.reload(false); }}>🗑️ Delete</button>
            <button className='play-button' onClick={playAllNotes}>▷ Play</button>
          </div>
          <div>
            <button className='harmonize-button'>Harmonize</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
