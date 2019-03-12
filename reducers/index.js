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
                ...action.title
            }
        case ADD_CARD_TO_DECK :
            let updatedQuestions = state[action.card.deckTitle].questions
            updatedQuestions.push(
                {
                    question: action.card.question,
                    answer: action.card.answer
                });
            return {
                ...state,
                [action.card.deckTitle]: {
                    title: action.card.deckTitle,
                    questions: updatedQuestions
                }
            }

        default :
            return state
    }
}

export default entries