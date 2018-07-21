import { AsyncStorage } from 'react-native';

const WEB_TOKEN = 'TOKEN';

export function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export function setWebToken(token) {
  AsyncStorage.setItem(WEB_TOKEN, JSON.stringify(token))
}

export function getWebToken() {
  return AsyncStorage.getItem(WEB_TOKEN)
}

export function removeWebToken() {
  return AsyncStorage.removeItem(WEB_TOKEN)
}