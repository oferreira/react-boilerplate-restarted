/**
 * Find node by id
 *
 * @param id
 *
 * @return {object|undefined} Returns either the response, or undefined
 */
const nodeByIdFilter = (id) => (elem, index) => id === index

export default nodeByIdFilter
