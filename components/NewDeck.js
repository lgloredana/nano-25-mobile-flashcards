import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import {fetchDecks, saveDeck} from "../utils/api";
import {retreiveDecks, saveNewDeck} from "../actions";
import {purple, white} from "../utils/colors";

class NewDeck extends Component {

    state = {
        ready: false,
        title: '',
    };

    saveDeck =() => {
        saveDeck(this.state.title)
            .then(() => {
                this.props.dispatch(saveNewDeck({title: this.state.title}));
            })
            .catch( (error) => {
                debugger;
            });
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
        const decksCount = Object.keys(this.props.decks);
        return (
            <View>
                <Text>{decksCount}</Text>
                <Text>What is the title of your new deck ?</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                />
                <TouchableOpacity style={styles.button} onPress={this.saveDeck}>
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
        decks: state
    }
}

export default connect(
    mapStateToProps
)(NewDeck)

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