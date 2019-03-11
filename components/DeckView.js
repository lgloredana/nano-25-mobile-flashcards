import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors'
import {fetchDecks} from "../utils/api";
import {retreiveDecks} from "../actions";

class DeckView extends Component {

    state = {
        ready: false,
    };

    addCard = () => {
        //TODO: NAVIGATE TO ADD CARD
    };

    startQuiz = () => {
        // todo: navigate to start quiz
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
        const nrCards = this.state.ready
            ? this.props.deckers[this.props.title].questions.length
            : null;
        return (
            <View>
                <Text>{this.props.title}</Text>
                <Text>{nrCards}</Text>

                <TouchableOpacity style={styles.button} onPress={this.addCard}>
                        <Text style={styles.buttonText}>
                            Add Card
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
                        <Text style={styles.buttonText}>
                            Start Quiz
                        </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (state) {

    return {
        deckers: state
    }
}

export  default connect(
    mapStateToProps
)(DeckView)

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText :{
        color: white,
        fontSize: 20,
    },
})