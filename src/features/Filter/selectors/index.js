import { createSelector } from 'reselect';
import { getHotels } from 'containers/Search/selectors';
import { getObjectValue } from 'utils/functions';
import { List } from 'immutable';
import { OR_RULE } from 'containers/Filter/constants';
export const selectGobal = (state) => state.get('filter');
export const selectFiltersHotels = createSelector(
    selectGobal,
    (state) => state.get('hotels')
);
/* eslint-disable arrow-body-style */
/**
 * Compute a AND filter on an iterable object
 * Filter the list with the specific filters function
 * compute() is a selector function dispatched to the list of filters.
 *
 * @param {List} datas
 * @param {List} filters
 */
export const computeAndFilter = (datas, filters) => (filters.reduce((data, f) => data.filter(f.compute), datas));

/**
 * Compute a OR filter on an iterable object
 * Reduce the list with the specific filters function and add the result
 * to the current list to get all the matching occurences.
 * compute() is a selector function dispatched to the list of filters.
 *
 * @param {List} datas
 * @param {List} filters
 */
export const computeOrFilter = (datas, filters) => (filters.reduce((acc, f) => {
  return acc.concat(datas.filter(f.compute));
}, new List()));

/**
 * Compute a list of different filters (AND/OR rule) on datas
 * filterGroups is a List of List containing object describing the filter to apply
 * to the datas.
 *
 * @param {List} datas
 * @param {List} filtersGroups
 */
export const compute = (datas, filtersGroups) => {
  if (!datas.size || Object.keys(filtersGroups).length === 0) return datas;
  let filteredDatas = datas;
  filtersGroups.forEach((filters) => {
    const hasFilters = filters.get('filters').length;
    switch (filters.get('rule')) {
      case OR_RULE:
        if (hasFilters) {
          filteredDatas = computeOrFilter(filteredDatas, filters.get('filters'));
          // Because it's a OR filter rule, we need to add the filtered datas to the current list
          filteredDatas.reduce((acc, item) => acc.concat(item), new List());
        }
        break;
      default:
        if (hasFilters) {
          filteredDatas = computeAndFilter(filteredDatas, filters.get('filters'));
        }
        break;
    }
  }, datas);
  return filteredDatas;
};

export const computeHotels = (datas, filtersGroups) => compute(datas, filtersGroups);
/**
 * This function compares two values
 * @param {Object} item The item to filter
 * @param {string|Array|Number} key The key to get the value in the item
 * @param {string|Array|Number} value the value to compare with the item value
 * @return boolean True if the two values matches
 */
export const matchValue = (item, key, value) => {
  if (Array.isArray(getObjectValue(item, key))) {
    return (getObjectValue(item, key).includes(value));
  } else if (Array.isArray(value)) {
    return (value.includes(getObjectValue(item, key)));
  }
  // eslint-disable-next-line
  return value == getObjectValue(item, key);
};

export const createMatchFilter = (key, value, text) => {
  return {
    value,
    text,
    name: `matchFilter${key}${value}`,
    compute: (item) => matchValue(item, key, value),
    key,
  };
};

export const createMinFilter = (key, value, text) => ({
  key,
  value,
  text,
  name: `maxFilter${key}}`,
  compute: (item) => getObjectValue(item, key) >= value,
});

export const createMaxFilter = (key, value, text) => ({
  key,
  value,
  text,
  name: `maxFilter${key}}`,
  compute: (item) => getObjectValue(item, key) <= value,
});

export const createRangeFilter = (key, { min, max }, text) => ({
  key,
  value: {
    min,
    max,
  },
  text,
  name: `maxFilter${key}`,
  compute: (item) => {
    const tmp = getObjectValue(item, key);
    return tmp >= min && tmp <= max;
  },
});

/**
 *
 * @param {*} items
 * @param {*} key
 * @param {*} value
 */
export const countMatchedOccurences = (items, key, value) => items.filter((item) => matchValue(item, key, value));


export const getFilteredHotels = (state) => createSelector(
  [getHotels(state), selectFiltersHotels],
  (datas, filters) => (computeHotels(datas, filters)),
);

