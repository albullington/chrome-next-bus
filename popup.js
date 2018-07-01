const nextBusUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions';
const sfMuniTag = 'sf-muni';
const routeTag = '27';
const stopTag = '3930';

if (!('fetch' in window)) {
  console.log('Fetch API not found, try including polyfill');
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

const appendResponseToHTML = (response) => {
  const nextBus = response.predictions.direction.prediction[0].minutes;
  console.log(nextBus, 'next bus');

  const list = document.getElementById('next-bus');
  list.innerHTML = `<ul>Bus ${routeTag}: ${nextBus} minute(s)</ul>`;
}

const fetchJSON = (pathToResource) => {
  fetch(pathToResource)
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(appendResponseToHTML)
    .then(logResult)
    .catch(logError)
}

fetchJSON(`${nextBusUrl}&a=${sfMuniTag}&r=${routeTag}&s=${stopTag}`);