// const vehicleList = [
//     {
//         vehicleType: "Car/Jeep/Van", 
//         vehicleNumber: "TN24AQ4644", 
//         dateTime : () => {return new Date().toString()},
//         tollName: "Chengalpatttu", 
//         traiff: 60
//     },
//     {
//         vehicleType: "Car/Jeep/Van", 
//         vehicleNumber: "TN19QQ1234", 
//         dateTime : () => {return new Date().toString()},
//         tollName: "Kapplur", 
//         traiff: 75
//     },
//     {
//         vehicleType: "Heavy Vehicle", 
//         vehicleNumber: "TN24AA1234", 
//         dateTime : () => {return new Date().toString()},
//         tollName: "Kapplur", 
//         traiff: 400
//     }
// ]


// const tollGateList = [
//     {
//         tollName: "Chengalpatttu",
//         carJeepVan : [60, 30], 
//         LVC:[95, 50],
//         truckBus: [205, 100],
//         heavyVehicle:[320, 160]
        
//     },
//     {
//         tollName: "Kapplur",
//         carJeepVan : [75, 50], 
//         LVC:[125, 80],
//         truckBus: [260, 120],
//         heavyVehicle:[400, 200]
        
//     },
//     {
//         tollName: "Krishnagiri",
//         carJeepVan : [70, 40], 
//         LVC:[125, 80],
//         truckBus: [235, 130],
//         heavyVehicle:[365, 200]
        
//     }
// ];

const vehicleListView = document.querySelector('.vehicle-container');
const searchInputForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const filterOption = document.querySelector('#select-container');

let vehicleList = [];
let tollGateList = [];

function updateTollGateList(){
    if(JSON.parse(window.localStorage.getItem('tollGate'))){
        tollGateList = JSON.parse(window.localStorage.getItem('tollGate'));
        return tollGateList;
    }
    return tollGateList;
}

function updateVehicleList(){
    if(JSON.parse(window.localStorage.getItem('vehicleEntryList'))){
        vehicleList = JSON.parse(window.localStorage.getItem('vehicleEntryList'));
    }
    return vehicleList;
}



// to display the tollname as dropdown menu
function displayTollName(parentContainer, tollGateList) {
    tollGateList.forEach( (e) => {
        let option = document.createElement("option");
        option.value = e.tollName;
        option.text = e.tollName;
        parentContainer.appendChild(option);
    });
}

// display the vechicle type as drop down menu
function displayVehicleType(parentContainer){
    const vechicleType = ['Car/Jeep/Van', 'LVC', 'Truck/Bus', 'Heavy Vehicle'];
    vechicleType.forEach( (e)=>{
        let option = document.createElement("option");
        option.value = e;
        option.text = e;
        parentContainer.appendChild(option);
    });
}

// display  Vehicle List funcion 
const displayVehicleList = (vehicleList) =>{

    // checking whether we have any vechicle entry or not
    if(vehicleList.length <1){
        vehicleListView.innerHTML = `<div class="empty">
        <h2>Opps, Kindly add the entry first</h2>
        </div>`;
        return;
    };

    // If vehicleList is not empty
    vehicleListView.innerHTML = vehicleList.map(entry => {
        const {vehicleType, vehicleNumber, dateTime, tollName, traiff} = entry;
        let vehicleTypeToShow;
        if( vehicleType === 'carJeepVan'){
            vehicleTypeToShow = 'Car/Jeep/Van';
        }
        else if(vehicleType === 'LVC'){
            vehicleTypeToShow = 'LVC';
        }
        else if(vehicleType === 'truckBus'){
            vehicleTypeToShow = 'Truck/Bus';
        }
        else if(vehicleType === 'heavyVehicle'){
            vehicleTypeToShow = 'Heavy Vehicle'
        }

        return `<div class="vehicle-list">
        <p>${vehicleTypeToShow}</p>
        <p>${vehicleNumber}</p>
        <p>${dateTime}</p>
        <p>${tollName}</p>
        <p>${traiff}</p>
        </div>`;
    }).join('');
};


// searching vechicle by vechicle number 
searchInputForm.addEventListener('keyup', () =>{
    const inputValue = searchInput.value;
    const updatedVehicleList = vehicleList.filter((entry) => {
        return entry.vehicleNumber.includes(inputValue);
    })
    displayVehicleList(updatedVehicleList);
});



// Filter vehicle entry list by toll name
window.addEventListener('DOMContentLoaded', displayTollName(filterOption, updateTollGateList()));
filterOption.addEventListener('change', (e) => {
    vehicleList=(JSON.parse(window.localStorage.getItem('vehicleEntryList')));
    let tollName = e.target.value;
    if(tollName === 'All'){
        displayVehicleList(vehicleList);
    }
    else{
        let updateVehicleList = vehicleList.filter((entry) => {
            return entry.tollName.includes(tollName);
        });
        displayVehicleList(updateVehicleList);
    }
});



// calling display function 
displayVehicleList(updateVehicleList());

