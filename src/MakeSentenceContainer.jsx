import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import SpeakSentenceForm from './SpeakSentenceForm';

import { flexBoxCenter } from './styles/common';

import {
  recognizeVoice,
  saveAnswer,
  getNext,
} from './redux/slice';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const PromptBox = styled.div({
  ...flexBoxCenter,
  marginTop: '.5rem',
  padding: '2rem 0',
  backgroundColor: '#DDD',
  width: '18rem',
  borderRadius: '6px',
});

const Prompt = styled.p({
  fontSize: '1.7rem',
});

const ButtonBox = styled.div({
  marginTop: '2rem',
});

export default function MakeSentenceContainer() {
  const MAX_ANSWERS = 5;

  const {
    prompt, spokenSentence, speaking, answers,
  } = useSelector((state) => state);

  const isAnsweringComplete = answers.length === MAX_ANSWERS - 1;

  const history = useHistory();

  const dispatch = useDispatch();

  const handleClickSpeak = () => {
    dispatch(recognizeVoice());
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch(getNext());
  };

  const handleClickExit = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    history.push('/answers');
  };

  return (
    <Container>
      <PromptBox>
        <Prompt>
          {prompt}
        </Prompt>
      </PromptBox>
      <SpeakSentenceForm
        spokenSentence={spokenSentence}
        speaking={speaking}
        onClick={handleClickSpeak}
      />
      <ButtonBox>
        {
          isAnsweringComplete
            ? (
              <button type="button" onClick={handleClickExit}>
                종료
              </button>
            )
            : (
              <button type="button" onClick={handleClickNext}>
                다음 문제
              </button>
            )
        }
      </ButtonBox>
    </Container>
  );
}
