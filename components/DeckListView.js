
import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import {retreiveDecks} from "../actions";
import {fetchDecks} from "../utils/api";
import DeckSummary from "./DeckSummary";
import { white } from '../utils/colors'

class DeckListView extends Component {
    state = {
        ready: false,
    };

    componentDidMount () {
        const { dispatch } = this.props;
        fetchDecks()
            .then((entries) =>{
                dispatch(retreiveDecks(entries))
            } )
            .then(() => this.setState(() => ({ready: true})))
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.deck}
                          key={item.title}
                          onPress={() => this.props.navigation.navigate(
                              'DeckView',
                              { title: item.title }
                          )}>
            <DeckSummary  title={item.title}/>
        </TouchableOpacity>
    )

    render(){
        let data = Object.values(this.props.deckers).sort(
            (a, b) => a.title > b.title,
        )
        let decksResult = (<Text>No result</Text>);

        if (this.state.ready) {
            decksResult = Object.keys(this.props.deckers).map((deckTitle) => {
                return (
                    <TouchableOpacity
                        key={deckTitle}
                        onPress={() => this.props.navigation.navigate(
                            'DeckView',
                            { title: deckTitle }
                        )}>
                        <DeckSummary  title={deckTitle}/>
                    </TouchableOpacity>
                )
            });
        }
        return (
            <View style={styles.container}>
                <FlatList data={data} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: white,
        padding: 20
    },
    deck: {
        margin: 0,
        padding: 0,
    },
})

function mapStateToProps(state){
    return {
        deckers: state
    }
}


export  default connect(mapStateToProps)(DeckListView)