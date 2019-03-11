import {GET_DECKS, GET_DECK, NEW_DECK, ADD_CARD_TO_DECK } from '../actions'

function entries (state = {}, action) {
    switch (action.type) {
        case GET_DECKS :
            return {
                ...state,
                ...action.deckers,
            }
        case NEW_DECK :
            return {
                ...state,
                ...action.entry
            }
        default :
            return state
    }
}

export default entries