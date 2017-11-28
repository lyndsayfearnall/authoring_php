(function () {
  var carButtons = document.querySelectorAll('.data-ref');

  function getCarData() {
    let model = document.querySelector('.modelName');
    let price = document.querySelector('.priceInfo');
    let desc = document.querySelector('.modelDetails');

    model.textContent = carData[this.id].model;
    price.innerHTML = "$" + carData[this.id].price;
    desc.textContent = carData[this.id].description;

    carButtons.forEach(function(car, index) {
      car.classList.add('nonActive');
    });

    this.classList.remove('nonActive');
  }

  carButtons.forEach(function(car, index) {
    car.addEventListener('click', getCarData, false);
  });
})();
