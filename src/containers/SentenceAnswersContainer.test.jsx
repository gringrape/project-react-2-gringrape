import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SentenceAnswersContainer from './SentenceAnswersContainer';
import { playYesNoQuestion } from '../redux/slice';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceAnswersContainer', () => {
  const goHomeButton = '처음으로';
  const replayButton = 'replay';
  const example = '사과사과사과';

  const answers = [
    { prompt: '사과', spokenSentence: '사과는 맛있다', examples: [example] },
    { prompt: '양파', spokenSentence: '양파는 맛없다', examples: [] },
  ];

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      answers,
    }));
  });

  it('renders answers', () => {
    const { container } = render(<SentenceAnswersContainer />);

    answers.forEach(({ prompt, spokenSentence }) => {
      expect(container).toHaveTextContent(prompt);
      expect(container).toHaveTextContent(spokenSentence);
    });
  });

  it('renders go home button', () => {
    const { getByText } = render(<SentenceAnswersContainer />);

    fireEvent.click(getByText(goHomeButton));

    expect(dispatch).toBeCalled();
    expect(mockPush).toBeCalledWith('/');
  });

  it('renders replay button', () => {
    const { getByTitle } = render(<SentenceAnswersContainer />);

    fireEvent.click(getByTitle(replayButton));

    expect(dispatch).toBeCalledWith(
      playYesNoQuestion(example),
    );
  });
});
