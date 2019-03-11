
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import {retreiveDecks} from "../actions";
import {fetchDecks} from "../utils/api";

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
        let decksResult;
        if (this.state.ready) {
            decksResult = Object.keys(this.props.deckers).map((deckTitle) => {
                return (<Text key={deckTitle}>{deckTitle}</Text>)
            });
        }else{
            decksResult =(<Text>No result</Text>)
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