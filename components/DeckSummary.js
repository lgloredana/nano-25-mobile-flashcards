import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { white, purple, gray } from '../utils/colors'

class DeckSummary extends Component {
    render(){
        const nrCards = this.props.deckers[this.props.title].questions.length;
        return (
            <View style={styles.deck}>
                <Text style={styles.deckTitle}>{this.props.title}</Text>
                <Text style={styles.questions}>{nrCards} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'column',
        marginTop: 10,
        height: 65,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 20,
        color: purple,
        textAlign: 'center',
    },
    questions: {
        textAlign: 'center',
        fontSize: 16,
        color: gray,
    },
})

function mapStateToProps (state) {

    return {
        deckers: state
    }
}

export  default connect(
    mapStateToProps
)(DeckSummary)