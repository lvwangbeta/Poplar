'use strict';

const regPageState = {
  regPageVisible: false,
}

export function showRegPage(state=regPageState, action) {
  console.log('action.type:'+action.type);
  switch (action.type) {
    case 'REG_PAGE_VISIBLE':
      return {
        ...state,
        regPageVisible: true,
      }
      break;
    case 'REG_PAGE_INVISIBLE':
      return {
        ...state,
        regPageVisible: false,
      }
      break;
    default:
      return state;
  }
}
