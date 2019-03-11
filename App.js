import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import NewQuestion from "./components/NewQuestion";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={styles.container}>
                  <NewQuestion title={'React'}/>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});