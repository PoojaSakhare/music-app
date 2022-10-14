import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";

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
            {/* {props.index} */}
            <div className={`nodeBox ${props.index>79 ? 'bottom-border': ''} ${props.index<16? 'border-top': ''} ${props.index>55 ? 'top-border': ''} `}
             onClick={popNoteIconTrigger}
              onMouseOver={() => { props.setPitchText(props.index)}}
              onMouseOut= {() => { props.setPitchText('')}}
              >
        
                { popNoteIcon && <img className='musical-note' src='/musical-note.png' alt="" />}
            </div>
        </div>
    </>);
})

export default Note;