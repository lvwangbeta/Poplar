'use strict';

const pageState = {
  loginPageVisible: false,
}

const loginStatus = {
  status: 'NOT_LOGGED_IN',
}

export function isLogin(state=loginStatus, action) {
    switch (action.type) {
      case 'LOGGED_IN':
        return {
          ...state,
          status: 'LOGGED_IN',
        }
        break;
      case 'NOT_LOGGED_IN':
        return {
          ...state,
          status: 'NOT_LOGGED_IN',
        }
        break;
      default:
        return state;

    }
}

export function showLoginPage(state=pageState, action) {
  switch (action.type) {
    case 'LOGIN_PAGE_VISIBLE':
      return {
        ...state,
        loginPageVisible: true,
      }
      break;
    case 'LOGIN_PAGE_INVISIBLE':
      return {
        ...state,
        loginPageVisible: false,
      }
      break;
    default:
      return state;
  }
}

// export function login(state=initialState, action) {
//   switch (action.type) {
//     case 'LOGGIN_DONING':
//       return {
//         ...state,
//         status: 'LOGGIN_DONING'
//       }
//       break;
//     case 'LOGGIN_DONE':
//       return {
//         ...state,
//         status: 'LOGGIN_DONE',
//         user: action.user,
//       }
//       break;
//     case 'LOGGIN_ERROR':
//       return {
//         ...state,
//         status: 'LOGGIN_ERROR',
//         user: null,
//       }
//       break;
//     default:
//       return state;
//
//   }
// }
