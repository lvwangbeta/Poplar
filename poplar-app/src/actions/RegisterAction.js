'use strict';

export function showRegPage(flag=true) {
  console.log('showing register page');
  if(flag == true) {
    return {
      type: 'REG_PAGE_VISIBLE'
    }
  } else {
    return {
      type: 'REG_PAGE_INVISIBLE'
    }
  }

}
