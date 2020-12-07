import { createAction, createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
  answers: [],
  isGameEnd: false,
};

const { reducer, actions } = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSpokenSentence(state, { payload: spokenSentence }) {
      return {
        ...state,
        spokenSentence,
      };
    },
    setMicState(state, { payload: micState }) {
      return {
        ...state,
        micState,
      };
    },
    setPrompt(state, { payload: prompt }) {
      return {
        ...state,
        prompt,
      };
    },
    addAnswer(state, { payload: answer }) {
      const { answers } = state;

      return {
        ...state,
        answers: [
          ...answers,
          answer,
        ],
      };
    },
    clearAnswers(state) {
      return {
        ...state,
        answers: [],
      };
    },
    setYesNoQuestion(state, { payload: yesNoQuestion }) {
      return {
        ...state,
        yesNoQuestion,
      };
    },
    endGame(state) {
      return {
        ...state,
        isGameEnd: true,
      };
    },
    startPlaying(state) {
      return {
        ...state,
        isPlaying: true,
      };
    },
    stopPlaying(state) {
      return {
        ...state,
        isPlaying: false,
      };
    },
    initializeState() {
      return initialState;
    },
  },
});

export const {
  setSpokenSentence,
  setMicState,
  setPrompt,
  addAnswer,
  clearAnswers,
  setYesNoQuestion,
  startGame,
  endGame,
  startPlaying,
  stopPlaying,
  initializeState,
} = actions;

export const recognizeSpeech = createAction('recognizeSpeech');
export const getNextQuestion = createAction('getNextQuestion');
export const saveAnswer = createAction('saveAnswer');

export default reducer;
