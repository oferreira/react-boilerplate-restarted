const mockAvailabilitiesResortPayload = {
  resortIdList: ['FRA40267', 'FRA42193', 'FRA23316'], specialCodeValue: '', specialCodeType: '', roomOccupancyList: [{ adult: '1', child: '0' }], numberOfRooms: 1, numberOfAdults: 1, numberOfChildren: 0, startDate: '2018-01-16T00:00:00', endDate: '2018-01-17T00:00:00', locale: 'en-us',
}

import { call, select } from 'redux-saga/effects'
import request from 'core/utils/request'

/**
 * Get resort availabilities according to the searched payload with the lighter API
 * @param {object} payload Params from URL query
 * @param {*} resorts Array of selected resorts
 * @param {bool} multi Define if the call is on multi dates
 */
export function* getAvailabilities(payload, resorts) {
  // const locale = yield select(makeSelectLocale())
  // const queryAvailabilities = payloadToQueryAvailability({ ...payload, resorts, locale })

  const res = yield call(request, config.api.availabilities_resort, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: mockAvailabilitiesResortPayload,
  })

  if (res && res.resortAvailabilities) {
    return res.resortAvailabilities
      .map((item) => ({ ...item, resortId: item.resortCode }))
  }
  return []
}
