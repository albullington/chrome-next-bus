const nextBusUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions';
const sfMuniTag = 'sf-muni';
const routeTag = '27';
const stopTag = '3930';

if (!('fetch' in window)) {
  console.log('Fetch API not found, try including polyfill');
  return;
}

const logResult = (result) => {
  console.log(result);
};

const logError = (error) => {
  console.log('Looks like there was a problem: \n', error);
};

const validateResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const readResponseAsJSON = (response) => {
  return response.json();
}

const fetchJSON = (pathToResource) => {
  fetch(pathToResource)
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError)
}

fetchJSON(`${nextBusUrl}&a=${sfMuniTag}&r=${routeTag}&s=${stopTag}`);