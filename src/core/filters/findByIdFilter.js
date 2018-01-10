/**
 * Find menu by id
 *
 * @param id
 *
 * @return {object|undefined} Returns either the response, or undefined
 */
const findByIdFilter = (id) => (elem, index) => id === index

export default findByIdFilter
