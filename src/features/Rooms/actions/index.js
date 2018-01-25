/*
 *
 * Rooms actions
 *
 */

import {
  REQUEST_ROOMS_AVAILABILITIES,
  REQUEST_ROOMS_AVAILABILITIES_SUCCESS,
  REQUEST_ROOMS_AVAILABILITIES_ERROR,
  REQUEST_ROOMS_FEATURES,
  REQUEST_ROOMS_FEATURES_SUCCESS,
  REQUEST_ROOMS_FEATURES_ERROR,
  REQUEST_ROOMS_GALLERY,
  REQUEST_ROOMS_GALLERY_SUCCESS,
  REQUEST_ROOMS_GALLERY_ERROR,
} from '../constants'

// Availabilities
export const requestRoomsAvailabilities = (query) => ({
  type: REQUEST_ROOMS_AVAILABILITIES,
  payload: { query },
})

export const requestRoomsAvailabilitiesSuccess = (rooms, ratePlans) => ({
  type: REQUEST_ROOMS_AVAILABILITIES_SUCCESS,
  payload: { rooms, ratePlans },
})

export const requestRoomsAvailabilitiesError = (error) => ({
  type: REQUEST_ROOMS_AVAILABILITIES_ERROR,
  payload: { error },
})

// Features
export const requestRoomsFeatures = (query) => ({
  type: REQUEST_ROOMS_FEATURES,
  payload: { query },
})

export const requestRoomsFeaturesSuccess = (roomsFeatures) => ({
  type: REQUEST_ROOMS_FEATURES_SUCCESS,
  payload: { roomsFeatures },
})

export const requestRoomsFeaturesError = (error) => ({
  type: REQUEST_ROOMS_FEATURES_ERROR,
  payload: { error },
})

// Gallery
export const requestRoomsGallery = (id) => ({
  type: REQUEST_ROOMS_GALLERY,
  payload: { id },
})

export const requestRoomsGallerySuccess = (pictures) => ({
  type: REQUEST_ROOMS_GALLERY_SUCCESS,
  payload: { pictures },
})

export const requestRoomsGalleryError = (error) => ({
  type: REQUEST_ROOMS_GALLERY_ERROR,
  payload: { error },
})
