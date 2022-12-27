export enum HttpMessage {
  BAD_REQUEST = 'bad request',
  NOT_FOUND_USER = 'Not found user',
  NOT_FOUND_PROVIDER = 'Not found provider',
  NOT_FOUND_XORGIN = 'Not found x-origin',
  FAIL_TO_OAUTH = 'Auth fail',
  FAIL_RESPONSE = 'Failed to response',
  FAIL_REDIRECT = 'Redirect fail',
  INVALID_ERROR = 'Failed to invalid',
  FAIL_AXIOS = 'Failed to axios connect',
  FAIL_GOOGLE_LOGIN = 'Failed to google login',
  FAIL_TWITTER_LOGIN = 'Failed to twitter login',
  FAIL_LINE_LOGIN = 'Failed to line login',
  FAIL_YAHOO_LOGIN = 'Failed to yahoo login',
  FAIL_APPLE_LOGIN = 'Failed to apple login',
}
