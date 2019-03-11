import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { connect } from 'react-redux';
import {retreiveDecks, saveNewQuestion} from "../actions";
import {fetchDecks, saveQuestion} from "../utils/api";
import {purple, white} from "../utils/colors";

class NewQuestion extends Component {

    state = {
        ready: false,
        question: '',
        answer: '',
    };

    saveCard = () => {
        const card = {
            deckTitle: this.props.title,
            question: this.state.question,
            answer: this.state.answer
        };

        saveQuestion(card)
            .then(
                () => {
                    this.props.dispatch(saveNewQuestion(card))
                }
            )
            // .then( () => {
            //     fetchDecks()
            //         .then((entries) =>{
            //                 this.props.dispatch(retreiveDecks(entries))
            //         } )
            // })
            .catch( error => {
                debugger;
            })


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
                <Text>Add Card</Text>
                <Text>{this.props.title}</Text>
                <Text>{nrCards}</Text>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({answer:text})}
                    value={this.state.answer}
                />
                <TouchableOpacity style={styles.button} onPress={this.saveCard}>
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (state) {
debugger;
    return {
        deckers: state
    }
}

export  default connect(
    mapStateToProps
)(NewQuestion)

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