import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SubmitSentenceButton from './SubmitSentenceButton';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SubmitSentenceButton', () => {
  const nextButton = '다음 문제';
  const exitButton = '종료';

  const handleClickNext = jest.fn();
  const handleClickExit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSubmitSentenceButton = ({ isComplete }) => render(
    <SubmitSentenceButton
      onClickNext={handleClickNext}
      onClickExit={handleClickExit}
      isComplete={isComplete}
    />,
  );

  context('when answering is not complete', () => {
    const isComplete = false;

    it('renders next button', () => {
      const { getByText } = renderSubmitSentenceButton({ isComplete });

      fireEvent.click(getByText(nextButton));

      expect(handleClickNext).toBeCalled();
    });
  });

  context('when answering is complete', () => {
    const isComplete = true;

    it('renders exit button', () => {
      const { getByText } = renderSubmitSentenceButton({ isComplete });

      fireEvent.click(getByText(exitButton));

      expect(handleClickExit).toBeCalled();
    });
  });
});
