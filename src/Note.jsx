import React, {useState} from "react";

function Note(props) {

    const [popNoteIcon, SetPopNoteIcon] = useState(false);

    const popNoteIconTrigger = () => {
        SetPopNoteIcon(!popNoteIcon)
        var audio = new Audio(props.sound);
        audio.play();
        props.addNote(props.index)
    }

    return (<>
        <div style={{ display: "flex" }}>
            <div className={`nodeBox ${props.index>79 ? 'bottom-border': ''}`} onClick={popNoteIconTrigger}>
                {popNoteIcon && <img className='musical-note' src='/musical-note.png' />}
            </div>
        </div>
    </>);
}

export default Note;