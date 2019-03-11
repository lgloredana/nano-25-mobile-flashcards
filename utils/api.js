import { AsyncStorage } from 'react-native'
import {FLASHCARD_STORAGE_KEY, setDummyData} from "./_decks";

export function fetchDecks(){
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((decks) => {
            let result = decks === null
                ? setDummyData()
                : decks;
            return result;
        });
}

export function submitEntry ({ entry, key }) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,JSON.stringify({
        [key]: entry
    }))
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