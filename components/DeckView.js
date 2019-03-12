import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors'
import {fetchDecks} from "../utils/api";
import {retreiveDecks} from "../actions";

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
           title
        }
    }

    addCard = () => {
        this.props.navigation.navigate(
            'NewQuestion',
            { title: this.props.title }
    )};

    startQuiz = () => {
         this.props.navigation.navigate(
            'QuizView',
            { title: 'deckTitle' }
    )};

    render(){
        const { title,  deckers} = this.props;
        const nrCards = deckers[title].questions.length;
        return (
            <View>
                <Text>{title}</Text>
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

function mapStateToProps (state, props) {

    return {
        deckers: state,
        title: props.navigation.state.params.title
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