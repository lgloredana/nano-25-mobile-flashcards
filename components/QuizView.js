import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import {purple, white, turquoise, red, green } from "../utils/colors";

class QuizView extends Component {

    state = {
        showAnswer: false,
        currentQuestion: 0,
        showResult: false,
        statisticCorrectAnswer: 0,
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

    nextQuestion = (nrCards, correct) => {
        this.setState((prevState) => {
            const newCurrentQuestion = prevState.currentQuestion + 1;
            const increseCorrect = correct ? 1 : 0;
            if ( nrCards === newCurrentQuestion){
                return {
                    showResult: true,
                    statisticCorrectAnswer: prevState.statisticCorrectAnswer + increseCorrect,
                }
            }else {
                return {
                    currentQuestion: newCurrentQuestion,
                    showAnswer: false,
                    statisticCorrectAnswer: prevState.statisticCorrectAnswer + increseCorrect,
                }
            }
        })
    }

    render(){
        const {deckers, title} = this.props;
        const { currentQuestion, showResult, showAnswer, statisticCorrectAnswer} = this.state;
        const nrCards = deckers[title].questions.length;
        const questions = deckers[title].questions;
        return (
            <View style={styles.container}>
                { showResult
                    ? (
                        <View>
                            <Text style={styles.text}>We have {statisticCorrectAnswer} correct answers !</Text>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.setState({
                                    showAnswer: false,
                                    currentQuestion: 0,
                                    showResult: false,
                                    statisticCorrectAnswer: 0,
                                })
                            }}>
                                <Text style={styles.buttonText}>
                                    Restart Quiz
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.props.navigation.navigate(
                                    'DeckView',
                                    { title: this.props.title }
                                )
                            }}>
                                <Text style={styles.buttonText}>
                                    Back to Deck
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <View  style={styles.formBox}>
                            <Text style={styles.text}>{nrCards + '/' + (currentQuestion+1)}</Text>
                            <Text style={styles.text}>
                                { questions[currentQuestion].question }

                            </Text>
                            {showAnswer &&  (<Text style={styles.text}>
                                { questions[currentQuestion].answer }
                            </Text>)}
                            {
                                <View style={styles.formBox}>
                                    {(!showAnswer &&
                                        <TouchableOpacity style={styles.button} onPress={this.showAnswer}>
                                            <Text style={styles.answerText}>
                                            Show Answer
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                        <View style={styles.answerBtnsBox}>
                                            <TouchableOpacity style={[styles.correct, styles.button]} onPress={() => this.nextQuestion(nrCards, true)}>
                                                <Text style={styles.correctText}>
                                                    Correct
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={[styles.incorrect, styles.button]} onPress={() => this.nextQuestion(nrCards, false)}>
                                                <Text style={styles.incorrectText}>
                                                    Incorrect
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
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
    button: {
        paddingTop: 20,
        borderRadius: 2,
        height: 60,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        width: 250,
        height: 60,
    },
    buttonText :{
        color: white,
        fontSize: 20,
    },
    answerBtnsBox: {
        margin: 20,
        alignItems: 'center',
    },
    correct: {
        backgroundColor: green,
    },
    correctText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    incorrect: {
        backgroundColor: red,
    },
    incorrectText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    answerText: {
        fontSize: 18,
        color: red,
    },
})

