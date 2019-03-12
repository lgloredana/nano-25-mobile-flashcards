import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import {purple, white} from "../utils/colors";

class QuizView extends Component {

    state = {
        showQuestion: true,
        currentQuestion: 0
    };

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} Quiz`
        }
    }

    showAnswer = () => {
       this.setState({
           showQuestion: false,
       })
    };

    showQuestion = () => {
        this.setState({
            showQuestion: true,
        })
    };

    render(){
        const {deckers, title} = this.props;
        const { currentQuestion } = this.state;
        const nrCards = deckers[title].questions.length;
        const questions = deckers[title].questions;
        return (
            <View>
                <Text>{nrCards + '/' + currentQuestion}</Text>
                <Text>{this.state.showQuestion
                    ? questions[currentQuestion].question
                    : questions[currentQuestion].answer
                }</Text>
                {
                    this.state.showQuestion
                        ? ( <View>
                                <TouchableOpacity style={styles.button} onPress={this.showAnswer}>
                                    <Text style={styles.buttonText}>
                                        Show Answer
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {this.setState((prevState) => {
                                    return {
                                        currentQuestion: prevState.currentQuestion+1,
                                    }
                                })}}>
                                    <Text style={styles.buttonText}>
                                        Correct
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={() => {this.setState((prevState) => {
                                    return {
                                        currentQuestion: prevState.currentQuestion+1,
                                    }
                                })}}>
                                    <Text style={styles.buttonText}>
                                        Incorrect
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                        :(
                            <TouchableOpacity style={styles.button} onPress={this.showQuestion}>
                                <Text style={styles.buttonText}>
                                    Show Question
                                </Text>
                            </TouchableOpacity>)
                }



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
