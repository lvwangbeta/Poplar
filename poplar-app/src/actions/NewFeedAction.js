'use strict';

export function showNewFeedPage(flag=true) {
  console.log('[action]show new feed page:'+flag);
  if(flag == true) {
    return {
      type: 'NEWFEED_PAGE_VISIBLE'
    }
  } else {
    return {
      type: 'NEWFEED_PAGE_INVISIBLE'
    }
  }

}
