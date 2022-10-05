import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";

import {notesData} from './data';

const Note = forwardRef((props, ref) => {

    const [popNoteIcon, SetPopNoteIcon] = useState(false);

    useImperativeHandle(ref, () => ({
        callChildFunction(){
            SetPopNoteIcon(!popNoteIcon);
        }
    }))

    useEffect(() => {
        console.log("changd", props.note.active)
        SetPopNoteIcon(props.note.active)
    },[props.note.active])

    const popNoteIconTrigger = () => {
        if (!popNoteIcon) {
            SetPopNoteIcon(!popNoteIcon)
            props.addNote(props.index)
        }
        else{
            SetPopNoteIcon(!popNoteIcon)
            props.removeNote(props.index)
        }
    }

    return (<>
        <div style={{ display: "flex" }}>
            <div className={`nodeBox ${props.index>79 ? 'bottom-border': ''}`} onClick={popNoteIconTrigger}>
                { popNoteIcon && <img className='musical-note' src='/musical-note.png' />}
            </div>
        </div>
    </>);
})

export default Note;