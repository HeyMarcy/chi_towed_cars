var requestURL = "https://data.cityofchicago.org/resource/rp42-fxjt.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();

function returnCar(searchState, searchPlate, searchMake, searchColor) {
    "use strict";
    document.getElementById("returnedCars").innerHTML = "";
    var towedCar = request.response;
    var length = Object.keys(towedCar).length;
    var returnedString = "";
    
    searchColor = searchColor.trim();
    searchPlate.toUpperCase();
    searchPlate = searchPlate.trim();
    searchState = searchState.trim();
    searchMake = searchMake.trim();
    
    var carArray = towedCar.filter(function (cars) {
        return ((cars.state === searchState && cars.plate === searchPlate) || (cars.color === searchColor && cars.make === searchMake));
    });
    
    if (carArray.length >= 1) {
        for (var x = 0; x < carArray.length; x++){
            
            var towDate = new Date(carArray[x].tow_date);
            
            var address = carArray[x].towed_to_address;
            address = address.replace(/\s/g, "+");
            var googleLink = ("https://www.google.com/maps/place/" + address + ",Chicago,+IL");
        
            
            returnedString += ("<table align='center'><tbody><tr>");
            
            returnedString += ("<td valign='top' width='30%'><h3>Located Car</h3>" + "<p>" + "<b>Plate: </b>" + carArray[x].plate + " <b>State: </b>" + carArray[x].state + "<br />" + "<b>Make: </b>" + carArray[x].make + " <b>Color: </b>" + carArray[x].color + "<br /></p></td>");   
            
            returnedString += ("<td width='30%'><h3>Tow Location</h3>" + "<p>" + "<b>Tow Date: </b>" + towDate.toDateString() + "<br />" + "<b>Inventory No. </b>" + carArray[x].inventory_number + "<br />" + "<b>Address: </b>" + "<a target='_blank' href="  + googleLink + ">" +  carArray[x].towed_to_address + "</a>" + "<br />" + "<b>Phone: </b>" + carArray[x].tow_facility_phone + "</p></td>");   
            
            returnedString += ("</tr></tbody></table>");
        }  
    }
    else {
        returnedString = ("<h3>No car has been found.</h3>");
    }  
    
    document.getElementById("returnedCars").innerHTML = returnedString;
}

document.getElementById('plateStateForm').addEventListener('submit', (evt) => {
    var formData = document.getElementById("plateStateForm");
    var plate = formData[0].value;
    var state = formData[1].value;
    
    returnCar(state, plate, "", "");
    
    evt.preventDefault(); 
})

document.getElementById('colorMakeForm').addEventListener('submit', (evt) => {
    var formData = document.getElementById("colorMakeForm");
    var make = formData[0].value;
    var color = formData[1].value;
    
    returnCar("", "", make, color);
    
    evt.preventDefault(); 
})