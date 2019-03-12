import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import {fetchDecks, saveDeck} from "../utils/api";
import {retreiveDecks, saveNewDeck} from "../actions";
import {purple, white, gray} from "../utils/colors";

class NewDeck extends Component {

    state = {
        ready: false,
        title: '',
    };

    onSaveDeck =() => {

        saveDeck(this.state.title)
            .then(() => {
                return this.props.dispatch(saveNewDeck(
                    {[this.state.title]: {
                            title: this.state.title,
                            questions: []
                        }
                    }
                ));
            })
            .then(() => {
                this.props.navigation.navigate(
                    'DeckView',
                    { title: this.state.title }
                )
            })
            .catch((error) => console.warn('Error', error));
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
        const decksCount = Object.keys(this.props.deckers).length;
        return (
            <View style={styles.container}>
                <View style={styles.formBox}>
                    <Text>{decksCount}</Text>
                    <Text style={styles.text}>What is the title of your new deck ?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({title: text})}
                        value={this.state.title}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onSaveDeck}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps (state) {

    return {
        deckers: state
    }
}

export default connect(
    mapStateToProps
)(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
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
        width: 250,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: white,
        margin: 20,
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
