import React from 'react';

import { cleanup, fireEvent, render } from '@testing-library/react';

import SentenceSpeakInput from './SentenceSpeakInput';

import MicState from '../../enums/MicState';

import { useAudio } from '../../hooks/audio';

jest.mock('../../hooks/audio.js');
jest.mock('../../services/instances/audioContext.instance.js');

global.HTMLCanvasElement.prototype.getContext = jest.fn();

describe('SentenceSpeakInput', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';
  const warningMessage = '제시어를 사용해서 문장을 말해보세요';

  const handleClick = jest.fn();
  const play = jest.fn();

  const renderSentenceSpeakInput = ({
    isCorrectSentence = true, sentence = spokenSentence, micState = MicState.OFF,
  } = {}) => render(
    <SentenceSpeakInput
      isCorrectSentence={isCorrectSentence}
      spokenSentence={sentence}
      onClick={handleClick}
      micState={micState}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
    play.mockClear();

    useAudio.mockImplementation(() => ['', play]);
  });

  it('renders spoken sentence with sentence', () => {
    const { container } = renderSentenceSpeakInput({
      sentence: spokenSentence,
    });

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSentenceSpeakInput();

    fireEvent.click(getByTitle(micButton));

    expect(handleClick).toBeCalled();
  });

  it('cannot click speak sentence button while mic is not off', () => {
    [MicState.ON, MicState.SPEAKING].forEach((micState) => {
      handleClick.mockClear();

      const { getByTitle } = renderSentenceSpeakInput({ micState });

      fireEvent.click(getByTitle(micButton));

      expect(handleClick).not.toBeCalled();

      cleanup();
    });
  });

  context('when spoken sentence is correct', () => {
    const isCorrectSentence = true;

    it('play correct sound ', () => {
      renderSentenceSpeakInput({
        isCorrectSentence,
      });

      expect(play).toBeCalled();
    });
  });

  context('when spoken sentence does not contain prompt', () => {
    const isCorrectSentence = false;

    it('does not play correct sound', () => {
      renderSentenceSpeakInput({
        isCorrectSentence,
      });

      expect(play).not.toBeCalled();
    });

    it('shows warning message', () => {
      const { container } = renderSentenceSpeakInput({
        isCorrectSentence,
      });

      expect(container).toHaveTextContent(warningMessage);
    });
  });
});
