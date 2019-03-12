import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { connect } from 'react-redux';
import {saveNewQuestion} from "../actions";
import {saveQuestion} from "../utils/api";
import {gray, purple, white} from "../utils/colors";

class NewQuestion extends Component {

    state = {
        question: '',
        answer: '',
    };

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} Add Card`
        }
    }

    onSaveCard = () => {
        const card = {
            deckTitle: this.props.title,
            question: this.state.question,
            answer: this.state.answer
        };

        saveQuestion(card)
            .then( () => {
                this.props.dispatch(saveNewQuestion(card))
            })
            .then( () => {
                this.props.navigation.navigate(
                    'DeckView',
                    { title: this.props.title }
                )
            })
    };


    render(){
        const { deckers, title } = this.props;
        const nrCards =  deckers[title].questions.length;
        return (
            <View style={styles.container}>
                <View style={styles.formBox}>
                {/*<Text>Add Card</Text>*/}
                {/*<Text>{this.props.title}</Text>*/}
                {/*<Text>{nrCards}</Text>*/}

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({question: text})}
                        value={this.state.question}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({answer:text})}
                        value={this.state.answer}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onSaveCard}>
                        <Text style={styles.buttonText}>
                            Submit
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
)(NewQuestion)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: white,
        alignItems: 'center',
    },
    formBox: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    text: {
        color: purple,
        fontSize: 30,
        textAlign: 'center'
    },
    input: {
        width: 350,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: white,
        margin: 10,
        alignSelf: 'center',
    },
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
