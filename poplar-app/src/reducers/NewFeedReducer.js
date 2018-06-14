'use strict';

const newFeedPageState = {
  newFeedPageVisible: false,
}

export function showNewFeedPage(state=newFeedPageState, action) {
  switch (action.type) {
    case 'NEWFEED_PAGE_VISIBLE':
      return {
        ...state,
        newFeedPageVisible: true,
      }
      break;
    case 'NEWFEED_PAGE_INVISIBLE':
      return {
        ...state,
        newFeedPageVisible: false,
      }
      break;
    default:
      return state;
  }
}
