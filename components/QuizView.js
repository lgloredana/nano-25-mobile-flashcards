import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} Quiz`
        }
    }

    render(){
        return (
            <View>
                <Text>Questin nr order</Text>

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
)(QuizView)