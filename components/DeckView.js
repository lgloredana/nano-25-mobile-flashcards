import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { purple, white, black } from '../utils/colors'
import {fetchDecks} from "../utils/api";
import {retreiveDecks} from "../actions";

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

        return {
            title: entryId
        }
    }

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
            { title: this.props.title }
        )};

    render(){
        const { title,  deckers} = this.props;
        const nrCards = deckers[title].questions.length;
        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'center'}}>
                    <Text>{title}</Text>
                    <Text>{nrCards}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.addCardButton} onPress={this.addCard}>
                        <Text style={styles.addCardText}>
                            Add Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizButton} onPress={this.startQuiz}>
                        <Text style={styles.startQuizText}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                </View>
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
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: white,
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 60,
        marginRight: 60,
    },
    addCardButton: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
    },
    startQuizButton: {
        backgroundColor: black,
        borderColor: purple,
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        marginTop: 20,
    },
    addCardText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    startQuizText: {
        fontSize: 20,
        color: white,
        alignSelf: 'center',
    },
})