/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  UPDATE_TIMEOUT,
  LOGIN,
  LOGOUT,
  SET_AVAILABLE_DISPLAY,
  SET_USE_GOOGLE,
  SET_IS_CHINA,
  MESSAGE,
  ERROR,
} from '../constants'

/**
 * Log the user
 *
 * @param  {string} username The current username
 * @param  {string} password the current password
 * @return {object} An object with the user informations
 */
export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  }
}

/**
 * Destroy the current user session
 */
export function logout() {
  return {
    type: LOGOUT,
  }
}

/**
 * Set display and navigation as trusted
 */
export function setAvailableDisplayApp() {
  return {
    type: SET_AVAILABLE_DISPLAY,
  }
}

/**
 * Set google / woosmap or not
 */
export function setGoogleUsage(isGoogle) {
  return {
    type: SET_USE_GOOGLE,
    isGoogle,
  }
}

/**
 * Set flag isChina
 */
export function setIsChina(isChina) {
  return {
    type: SET_IS_CHINA,
    isChina,
  }
}

export function displayMessage(title = null, body = null) {
  return {
    type: MESSAGE,
    value: { title, body },
  }
}

export function clearMessage() {
  return {
    type: MESSAGE,
    value: null,
  }
}

export function clearError() {
  return {
    type: MESSAGE,
    error: null,
  }
}

/**
 * Update the last time an action is executed
 * Used for displaying a message after a certain time of inactivity
 */
export function updateTimeout() {
  return {
    type: UPDATE_TIMEOUT,
    value: Date.now(),
  }
}

export const errorAction = (error) => ({
  type: ERROR,
  payload: { error },
})
