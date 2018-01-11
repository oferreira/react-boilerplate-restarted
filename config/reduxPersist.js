import { asyncLocalStorage } from 'redux-persist/storages';
import { jsToRecordTransform } from 'utils/immutablePersistTransform';

import { version } from '../package.json';

// this file is not compiled by babel and cause an exception in Safari because of the strict mode
// /!\ DO NOT CHANGE VAR TO CONST /!\
var REDUX_PERSIST = { // eslint-disable-line
  active: true,
  reducerVersion: version,
  storeConfig: {
    keyPrefix: 'GT_',
    storage: asyncLocalStorage,
    blacklist: ['route'], // reducer keys that you do NOT WANT stored to persistence here
    whitelist: ['cart', 'global', 'cookie_policy', 'cgv', 'hotel'], // Optionally, just specify the keys you WANT stored to persistence
    transforms: [jsToRecordTransform],
  },
};

export default REDUX_PERSIST;
