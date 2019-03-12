import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import {purple, white} from "../utils/colors";

class QuizView extends Component {

    state = {
        showAnswer: false,
        currentQuestion: 0,
        showResult: false,
    };

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} Quiz`
        }
    }

    showAnswer = () => {
       this.setState({
           showAnswer: true,
       })
    };

    nextQuestion = (nrCards) => {
        this.setState((prevState) => {
            const newCurrentQuestion = prevState.currentQuestion + 1;
            if ( nrCards === newCurrentQuestion){
                return {
                    showResult: true,
                }
            }else {
                return {
                    currentQuestion: newCurrentQuestion,
                    showAnswer: false
                }
            }
        })
    }

    render(){
        const {deckers, title} = this.props;
        const { currentQuestion, showResult, showAnswer } = this.state;
        const nrCards = deckers[title].questions.length;
        const questions = deckers[title].questions;
        return (
            <View>
                { showResult
                    ? <Text>Statistic</Text>
                    : (
                        <View>
                            <Text>{nrCards + '/' + (currentQuestion+1)}</Text>
                            <Text>
                                { questions[currentQuestion].question }

                            </Text>
                            {showAnswer &&  (<Text>
                                { questions[currentQuestion].answer }
                            </Text>)}
                            {
                                <View>
                                    {!showAnswer &&
                                    (<TouchableOpacity style={styles.button} onPress={this.showAnswer}>
                                            <Text style={styles.buttonText}>
                                            Show Answer
                                            </Text>
                                        </TouchableOpacity>)}
                                        <TouchableOpacity style={styles.button} onPress={() => this.nextQuestion(nrCards)}>
                                            <Text style={styles.buttonText}>
                                            Correct
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.button} onPress={() => this.nextQuestion(nrCards)}>
                                            <Text style={styles.buttonText}>
                                            Incorrect
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                    )
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
