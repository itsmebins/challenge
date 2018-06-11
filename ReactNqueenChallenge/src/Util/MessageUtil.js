import messages from '../messages/localeMessage.js';
export function fetchLocaleMessage(localeValue) {
  if(localeValue === '') {
    return {}
  }
  const localeMsg = messages[localeValue];
  if(localeMsg) {
    return localeMsg
  } else {
    return {}
  }
}
