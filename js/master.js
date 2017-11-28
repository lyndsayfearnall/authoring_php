(function () {
  const carButtons = document.querySelectorAll('.data-ref');
  const httpRequest = new XMLHttpRequest();

  function getCarData() {
    // make an AJAX call to the database; handle errors first
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = processRequest;
    httpRequest.open('GET', './includes/functions.php?carModel=' + this.id); // pass in the id from the element we're clicking on
    httpRequest.send();
  }

  function processRequest() {
    let reqIndicator = document.querySelector('.request-state');
    reqIndicator.textContent = httpRequest.readyState;

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) { // 200 means everything is awesome
        //debugger;
        let data = JSON.parse(httpRequest.responseText);

        processResult(data);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

  function processResult(data) {
    // deconstruct the data and extract only what we need
    const { modelName, pricing, modelDetails } = data;

    let model = document.querySelector('.modelName').textContent = modelName;
    let price = document.querySelector('.priceInfo').innerHTML = pricing;
    let desc = document.querySelector('.modelDetails').textContent = modelDetails;

    //model.textContent = carData[this.id].model;
    //price.innerHTML = "$" + carData[this.id].price;
    //desc.textContent = carData[this.id].description;

    carButtons.forEach(function(car, index) {
      car.classList.add('nonActive');
    });

    //this.classList.remove('nonActive');
    document.querySelector(`#${data.model}`).classList.remove('nonActive');
  }

  carButtons.forEach(function(car, index) {
    car.addEventListener('click', getCarData, false);
  });

  //getCarData();
})();
