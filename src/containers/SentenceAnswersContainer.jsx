import React from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { initializeState, playYesNoQuestion } from '../redux/slice';

import { get } from '../utils/utils';

import SentenceAnswers from '../components/SentenceAnswers';

import { flexBoxCenter } from '../styles/common';
import ActiveButton from '../styles/CommonButtonActive';
import InactiveButton from '../styles/CommonButtonInactive';

const ButtonBox = styled.div({
  ...flexBoxCenter,
  marginTop: '2rem',
});

export default function SentenceAnswersContainer() {
  const answers = useSelector(get('answers'));
  const isGameEnd = useSelector(get('isGameEnd'));

  const Button = isGameEnd ? ActiveButton : InactiveButton;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickRestart = () => {
    dispatch(initializeState());
    history.push('/');
  };

  const handleClickReplay = (example) => {
    dispatch(playYesNoQuestion(example));
  };

  return (
    <>
      <SentenceAnswers answers={answers} onClickReplay={handleClickReplay} />
      <ButtonBox>
        <Button type="button" onClick={handleClickRestart}>
          처음으로
        </Button>
      </ButtonBox>
    </>
  );
}
