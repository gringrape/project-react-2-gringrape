import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import FlowCounter from '../components/FlowCounter';

import { setNumberOfQuestions } from '../redux/slice';

import { get } from '../utils/utils';

export default function SentenceAnswersContainer() {
  const numberOfQuestions = useSelector(get('numberOfQuestions'));

  const dispatch = useDispatch();

  const handleClickIncrease = () => {
    dispatch(setNumberOfQuestions(numberOfQuestions + 1));
  };

  const handleClickDecrease = () => {
    dispatch(setNumberOfQuestions(numberOfQuestions - 1));
  };

  return (
    <>
      <FlowCounter
        numberOfQuestions={numberOfQuestions}
        onClickIncrease={handleClickIncrease}
        onClickDecrease={handleClickDecrease}
      />
    </>
  );
}
