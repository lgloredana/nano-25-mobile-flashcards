import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

class QuizView extends Component {
    render(){
        return (
            <View>
                <Text>Questin nr order</Text>

            </View>
        )
    }
}

function mapStateToProps (state) {

    return {
    }
}

export  default connect(
    mapStateToProps
)(QuizView)