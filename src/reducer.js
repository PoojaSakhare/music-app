import * as actions from './actions'
import { notesData }  from './data'

const userClickedNotes= []


//Update note when clicked
export function allNoteReducer(state = notesData, action) {
    if (action.type === actions.ADDED) {
        console.log("here IN ADD")
        return state.map((note) => note.index !== action.payload.note.index? note : {...note, active: true})
    }
    if (action.type === actions.REMOVE) {
        console.log("here in upd" )
        return state.map((note) => note.index !== action.payload.note.index? note : {...note, active: false})
    }
    if (action.type === actions.DELETE) {
        console.log("got inside delete allnotes")
        return state.map((note) => note.active !== true? note : {...note, active: false})
    }
    return state
}

//add note to sequence when clciked
export function userClickedNoteReducer(state = userClickedNotes, action) {
    if (action.type === actions.ADDED) {
        return [
            ...state,
            {
                index: action.payload.note.index,
                endTime: 46753,
                pitchName: 'A',
                pitch: 67,
                active: true,
                column: action.payload.note.column,
                audio: action.payload.note.audio,

            }

        ]
    }
    if (action.type === actions.REMOVE) {
        return state.filter((note) => note.index !== action.payload.note.index)
    }
    if (action.type === actions.DELETE) {
        console.log("got inside delete user clicked")
        return []
    }
    return state
}