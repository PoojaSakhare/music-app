import * as actions from './actions'
import { notesData }  from './data'

const userClickedNotes= []



//Update note when clicked
export function allNoteReducer(state = notesData, action) {
    if (action.type === actions.ADDED) {
        console.log("here IN ADD")
        return state.map((note) => note.index !== action.payload.note.index? note : {...note, active: true, duration: action.payload.duration })
    }
    if (action.type === actions.REMOVE) {
        console.log("here in upd" )
        return state.map((note) => note.index !== action.payload.note.index? note : {...note, active: false, duration: 0, startTime: 0, endTime: 0})
    }
    if (action.type === actions.DELETE) {
        console.log("got inside delete allnotes")
        return state.map((note) => note.active !== true? note : {...note, active: false, duration: 0, startTime: 0, endTime: 0})
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
                duration: action.payload.duration,
                audio: action.payload.note.audio
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
    if (action.type === actions.SORT) {
        return state.sort((a, b) => a.column - b.column)
    }
    if (action.type === actions.SET_START_END_TIME) {
        console.log("action.payload", action.payload)
        let startTime = 0;
        return state.map((note) => {
            let lastTime = startTime;
            startTime += action.payload.duration;
            return note ? { ...note, startTime: lastTime, endTime: startTime } : ''
        })
    }
    return state
}