import { ofType } from 'redux-observable';

import { of } from 'rxjs';

import {
  map,
  mergeMap,
  tap,
  filter,
} from 'rxjs/operators';
import SoundState from '../../enums/SoundState';

import { fetchNextYesNoQuestion } from '../../services/dataService';
import { play, playEnded, stop } from '../../services/speechSynthesisService';

import {
  endPlaying,
  idlePlaying,
  setYesNoQuestion, startPlaying,
} from '../slice';

export const getNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('getNextYesNoQuestion'),
  map(fetchNextYesNoQuestion),
  map(setYesNoQuestion),
);

export const playYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('playYesNoQuestion'),
  tap(({ payload }) => play(payload)),
  mergeMap(() => of(
    startPlaying(),
    { type: 'listenYesNoEndEvent' },
  )),
);

export const stopYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('stopYesNoQuestion'),
  tap(() => stop()),
  map(() => idlePlaying()),
);

export const listenYesNoEndEventEpic = (action$, state$) => action$.pipe(
  ofType('listenYesNoEndEvent'),
  map(() => playEnded()),
  mergeMap((end$) => end$.pipe(
    filter(() => state$.value.soundState !== SoundState.IDLE),
    map(() => endPlaying()),
  )),
);
