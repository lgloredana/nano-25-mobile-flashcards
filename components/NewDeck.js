import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import {saveDeck} from "../utils/api";
import {saveNewDeck} from "../actions";

class NewDeck extends Component {
    saveDeck =() => {
        saveDeck(this.state.title)
            .then(() => {
                this.props.dispatch(saveNewDeck({title: this.state.title}));
            });
    }

    render(){
        return (
            <View>
                <Text>What is the title of your new deck ?</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
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
    }
}

export default connect(
    mapStateToProps
)(NewDeck)