export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const NEW_DECK = 'NEW_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

export function retreiveDecks (deckers) {
    return {
        type: GET_DECKS,
        deckers
    }
}

export function saveNewDeck (title) {
    return {
        type: NEW_DECK,
        title,
    }
}

export function saveNewQuestion (card) {
    return {
        type: ADD_CARD_TO_DECK,
        card,
    }
}