import { fork } from 'redux-saga/effects'
import {
  fetchLanguagesWatcher,
} from 'core/language/sagas'


export default function* () {
  yield [
    fork(fetchLanguagesWatcher),
  ]
}
