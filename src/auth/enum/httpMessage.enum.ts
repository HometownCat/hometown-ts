export enum HttpMessage {
  BAD_REQUEST = 'bad request',
  NOT_FOUND_USER = 'Not found user',
  NOT_FOUND_PROVIDER = 'Not found provider',
  FAIL_TO_OAUTH = 'Auth fail',
  FAIL_RESPONSE = 'Failed to response',
  FAIL_REDIRECT = 'Redirect fail',
  INVALID_ERROR = 'Failed to invalid',
  FAIL_AXIOS = 'Failed to axios connect',
  FAIL_GOOGLE_LOGIN = 'Failed to google login',
  FAIL_NAVER_LOGIN = 'Failed to naver login',
  FAIL_KAKAO_LOGIN = 'Failed to kakao login',
}
