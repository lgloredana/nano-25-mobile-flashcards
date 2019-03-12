import { AsyncStorage } from 'react-native'
import {FLASHCARD_STORAGE_KEY, setDummyData} from "./_decks";

export function fetchDecks(){
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((decks) => {
           if (decks === null)
                setDummyData()
                    .then((response) => {
                        fetchDecks();
                    })
                    .catch(() => {
                        console.log('error');
                    });
           else {
               return JSON.parse(decks);
           }
        });
}

export function saveQuestion ({ deckTitle, question, answer }) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,{[deckTitle]: {
            questions: {
                question: question,
                answer: answer
            }
        }});
}
export function saveDeck (title) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,{[title]: {}})
        .then((response) => {
            console.log('response = ' + response)
        });
}



export function removeEntry (key) {
    return AsyncStorage.getItem()
        .then((results) => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}