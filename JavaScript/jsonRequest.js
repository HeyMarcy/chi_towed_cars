var requestURL = "https://data.cityofchicago.org/resource/rp42-fxjt.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();

function returnCar(searchState, searchPlate, searchMake, searchColor) {
    "use strict";
    var towedCar = request.response;
    var length = Object.keys(towedCar).length;
    
    var carArray = towedCar.filter(function (cars) {
        return ((cars.state === searchState && cars.plate === searchPlate) || (cars.color === searchColor && cars.make === searchMake));
    })
    
    if (carArray.length >= 1) {
        for (var x = 0; x < carArray.length; x++){
            var date = new Date(carArray[x].tow_date);
            
            document.getElementById("text").innerHTML = ("<br />" + carArray[x].state + " - " + carArray[x].plate + "<br />" +  carArray[x].make + " - " + carArray[x].model + " - " + carArray[x].style + " - " + carArray[x].color + "<br />" + date.toDateString() + "<br /><br />" + carArray[x].inventory_number + "<br />" + carArray[x].towed_to_address + "<br />" + carArray[x].tow_facility_phone + "<br />");
        }  
    }
    else {
        document.getElementById("text").innerHTML = ("<br />No car has been found.<br />");
    }
              
}

request.onload = function () {
    'use strict';
    //returnCar("", "", "ACUR", "BLK");
    
    //returnCar("", "", "",  "");
    
    returnCar("IL", "L756917" , "", "");
    
    //returnCar("", "", "SUZI", "WHI");
};

