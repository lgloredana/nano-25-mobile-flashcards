export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const NEW_DECK = 'NEW_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

export function retreiveDecks () {
    return {
        type: GET_DECKS
    }
}

export function getDeck (title) {
    return {
        type: GET_DECK,
        title,
    }
}

export function saveDeck (title) {
    return {
        type: NEW_DECK,
        title,
    }
}

export function saveNewQuestion (title) {
    return {
        type: ADD_CARD_TO_DECK,
        title,
    }
}