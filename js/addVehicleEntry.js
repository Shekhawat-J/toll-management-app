const enteredVehicleNumber = document.querySelector('.vehicle-number');
const traiffInput = document.querySelector('.tariff-amount');
const addVehicleEntry = document.getElementById('addVehicleEntry');
const addVehicleEntryPage = document.querySelector('.overlays');
const addVehicleEntryClose = document.querySelector('.close-btn');
const selectTollName = document.getElementById('selectTollName');
const submitVehicleEntry = document.querySelector('#submitVehicleEntry');
const showError = document.querySelector('.small');
const selectVehicleType = document.getElementById('vehicleType');

class newEntry  {
    constructor(tollName, vehicleType, vehicleNumber, dateTime, traiff, time){
        this.tollName = tollName;
        this.vehicleType = vehicleType;
        this.dateTime = dateTime;
        this.vehicleNumber = vehicleNumber.toUpperCase();
        this.traiff = traiff;
        this.time = time;
    }
}


let tollName;
let vehicleType;
let vehicleNumber;
let traiff;



// update Traiff value
function traiffValue(tollNameArg, vechicleTypeArg){
    tollGateList = (JSON.parse(window.localStorage.getItem('tollGate')));
    let tollGate = tollGateList.filter((entry) => {
        return entry.tollName.includes(tollNameArg);
    });
    traiff = tollGate[0][vechicleTypeArg][0];
}

// checking the mandaroty field
function checkRequired(arr){
    let requiredField = true;
    arr.forEach(input => {
        if(input === ''){
            showError.innerHTML = `<p>Kindly fill all required filed.</p>`;
            requiredField = false;
        }
    });
    return requiredField;
}



selectTollName.addEventListener('click', displayTollName(selectTollName, updateTollGateList()));
selectTollName.addEventListener('change', (e)=>{
    tollName = e.target.value;  
    if(vehicleType){
    traiffValue(tollName, vehicleType);
    traiffInput.value = traiff;
    }
});





selectVehicleType.addEventListener('click', displayVehicleType(selectVehicleType));

selectVehicleType.addEventListener('change', (e)=>{

    if(e.target.value === 'Car/Jeep/Van'){
        vehicleType = 'carJeepVan';
    }
    else if(e.target.value === 'LVC'){
        vehicleType = 'LVC';
    }
    else if(e.target.value === 'Truck/Bus'){
        vehicleType = 'truckBus';
    }
    else if(e.target.value === 'Heavy Vehicle'){
        vehicleType = 'heavyVehicle'
    }
    traiffValue(tollName, vehicleType);
    traiffInput.value = traiff
});
 


addVehicleEntry.addEventListener('click', ()=>{
    addVehicleEntryPage.classList.add('overlays-show');
});
 


addVehicleEntryClose.addEventListener('click', ()=> {
    addVehicleEntryPage.classList.remove('overlays-show');
});



submitVehicleEntry.addEventListener('click', (e)=>{
    
    vehicleNumber = enteredVehicleNumber.value;
    if(checkRequired([tollName, vehicleType, vehicleNumber, traiff])){

        let time = Date.now().toString();
        let dateTime = new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString();
        let obj = new newEntry(tollName, vehicleType, vehicleNumber, dateTime, traiff, time);

        if(JSON.parse(window.localStorage.getItem('vehicleEntryList'))){
            vehicleList = JSON.parse(window.localStorage.getItem('vehicleEntryList'));
        }
        vehicleList.push(obj);
        window.localStorage.setItem('vehicleEntryList', JSON.stringify(vehicleList));
        displayVehicleList(updateVehicleList());
    }
    else{
        e.preventDefault();
    }
});
