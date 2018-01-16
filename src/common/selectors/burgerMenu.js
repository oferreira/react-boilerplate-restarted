import { createSelector } from 'reselect'

const selectMenu = (state) => state.get('menu')

export const isBurgerOpen = () => createSelector(
  selectMenu,
  (menu) => menu.get('burgerMenu')
)

export default isBurgerOpen
