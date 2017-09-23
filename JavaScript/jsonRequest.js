var requestURL = "https://data.cityofchicago.org/resource/rp42-fxjt.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();

function returnCar(searchState, searchPlate, searchMake, searchStyle, searchColor, searchDate){
    var towedCar = request.response;
    var length = Object.keys(towedCar).length;
    
    var carArray = towedCar.filter(function (cars) {
        return ((cars.state == searchState && cars.plate == searchPlate) || (cars.style == searchStyle && cars.color == searchColor && cars.tow_date && searchDate && cars.make == searchMake));
    })
    
    for (var x = 0; x < carArray.length; x++){
        document.getElementById("text").innerHTML = (carArray[x].state + " - " + carArray[x].plate + "<br />" +  carArray[x].make + " - " + carArray[x].style + " - " + carArray[x].color + "<br /><br />" + carArray[x].inventory_number + "<br />" + carArray[x].towed_to_address + "<br />" + carArray[x].tow_facility_phone);
    }        
}

request.onload = function () {
    'use strict';
    returnCar("", "", "ACUR", "LL", "BLK", "2017-09-23T00:00:00.000");
};

