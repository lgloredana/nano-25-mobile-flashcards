
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import {retreiveDecks} from "../actions";
import {fetchDecks} from "../utils/api";
import DeckSummary from "./DeckSummary";

class DeckListView extends Component {
    state = {
        ready: false,
    };

    redirectToDetailsView() {
        // todo: add navigation to Details View
    }

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
            debugger; //this is the decks view
            decksResult = Object.keys(this.props.deckers).map((deckTitle) => {
                return (<DeckSummary key={deckTitle} title={deckTitle} onClick={this.redirectToDetailsView}/>)
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