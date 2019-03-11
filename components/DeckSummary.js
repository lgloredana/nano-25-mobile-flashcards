
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

class DeckSummary extends Component {
    render(){
        const nrCards = this.props.deckers[this.props.title].questions.length;
        return (
            <View>
                <Text>{this.props.title}</Text>
                <Text>{nrCards}</Text>
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
)(DeckSummary)