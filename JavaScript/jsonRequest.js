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
            var address = carArray[x].towed_to_address;
            address = address.replace(/\s/g, "+");
            var googleLink = ("https://www.google.com/maps/place/" + address + ",Chicago,+IL");
            
            document.getElementById("returnedCars").innerHTML += ("<h3>Located Car</h3>" + "<p>" + "<b>Plate: </b>" + carArray[x].plate + " <b>State: </b>" + carArray[x].state + "<br />" + "<b>Make: </b>" + carArray[x].make + " <b>Color: </b>" + carArray[x].color + "<br /></p>");   
            
            document.getElementById("returnedCars").innerHTML += ("<h3>Tow Location</h3>" + "<b>Inventory No. </b>" + carArray[x].inventory_number + "<br />" + "<b>Address: </b>" + "<a target='_blank' href="  + googleLink + ">" +  carArray[x].towed_to_address + "</a>" + "<br />" + "<b>Phone: </b>" + carArray[x].tow_facility_phone + "</p>");                                                 
        }  
    }
    else {
        document.getElementById("returnedCars").innerHTML = ("<h3>No car has been found.</h3>");
    }        
}

document.getElementById('plateStateForm').addEventListener('submit', (evt) => {
    var formData = document.getElementById("plateStateForm");
    var plate = formData[0].value;
    var state = formData[1].value;
    
    console.log(formData);
    //returnCar(plate, state, "", "");
    console.log("HERE" + state + " " + plate);
    evt.preventDefault();
    
    
    return("S387215", "IL", "", "");
    //returnCar("", "", "CHEV", "GLD");
})

