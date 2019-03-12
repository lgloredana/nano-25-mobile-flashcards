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

    onSaveCard = () => {
        const card = {
            deckTitle: this.props.decktitle,
            question: this.state.question,
            answer: this.state.answer
        };

        saveQuestion(card)
            .then( () => {
                this.props.dispatch(saveNewQuestion(card))
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
        const nrCards =  this.state.ready
            ? this.props.deckers[this.props.decktitle].questions.length
            : 0;
        return (
            <View>
                <Text>Add Card</Text>
                <Text>{this.props.decktitle}</Text>
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
                <TouchableOpacity style={styles.button} onPress={this.onSaveCard}>
                    <Text style={styles.buttonText}>
                        Submit
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