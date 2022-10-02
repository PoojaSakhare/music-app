import './App.css';
import Note from './Note';

function App() {

  const notes = [...Array(88).keys()];
  var audio = new Audio("https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_nade_9_q2");
  console.log(audio.play());
 
  return (
    <div className="App">
     
      <div className='wrapper'>
        <div className='nodeboxesHolder'>
         
    
          <img id='music' src='/note.png' />
          <div className='stringsWrapper'>
       
            {notes.map((ele, i) => {
             return <Note index={i}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
