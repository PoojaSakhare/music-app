import './App.css';
import { useRef } from 'react';

import Note from './Note';
import sound1 from './samples/D3.mp3'
import sound2 from './samples/D3.ogg'
import sound3 from './samples/E2.mp3'
import sound4 from './samples/E2.ogg'
import sound5 from './samples/E4.mp3'
import sound6 from './samples/E4.ogg'
import sound7 from './samples/G3.mp3'
import sound8 from './samples/G3.ogg'
function App() {
  const audioRef = useRef();
  const notes = [...Array(88).keys()];
  const audios = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8]

  let userClickedNotes = [];

  const addNote = (noteIndex) => {
    userClickedNotes.push(audios[noteIndex % 8]);
    console.log("added note", userClickedNotes)
  }

  const playAllNotes = () => {
    userClickedNotes.map((sound) => {
      const audioObj = new Audio(sound)
      return audioObj.play()
    })
  }
  // var audio = new Audio(sound1);

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
            {notes.map((ele, i) => {
              return <Note index={i} addNote={addNote} onClick={() => { new Audio(sound1).play(); }} />
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
