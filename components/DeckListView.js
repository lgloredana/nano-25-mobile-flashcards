
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import {retreiveDecks} from "../actions";
import {fetchDecks} from "../utils/api";
import DeckSummary from "./DeckSummary";

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

    render(){
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
            <View>
                {decksResult}
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        deckers: state
    }
}


export  default connect(mapStateToProps)(DeckListView)