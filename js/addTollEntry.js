const addNewToll = document.getElementById('addNewToll');
const tollGatePage = document.querySelector('.overlays-toll-gate');
const tollgateCloseButton = document.querySelector('.close-btn-toll-gate');
const submitTollGate = document.querySelector('#submitTollGate');
const tollGateNameTag = document.querySelector('#tollGateName');
const singleReturnCarJeepVan = document.querySelectorAll('#CarJeepVan');
const singleReturnLVC = document.querySelectorAll('#LVC');
const singleReturnTruckBus = document.querySelectorAll('#truckBus');
const singleReturnHeavyVehicle = document.querySelectorAll('#heavyVehicle');

// class to store the toll gate details
class tollGate {
    constructor(tollName, carJeepVan, LVC, truckBus, heavyVehicle ){
        this.tollName = tollName;
        this.carJeepVan = carJeepVan;
        this.LVC = LVC;
        this.truckBus = truckBus;
        this.heavyVehicle = heavyVehicle;
    }
}

// check whether the tollgate name already present or not
function searchTollGateName(tollGateName){
    tollGateList = updateTollGateList();
    const toll = tollGateList.filter((entry) => {
        return entry.tollName.includes(tollGateName);
    })
    console.log(toll.length);
    return toll.length;
}

// to show the popup for adding toll
addNewToll.addEventListener('click', ()=>{
    tollGatePage.classList.add('overlays-toll-gate-show');
});

// to close the popup
tollgateCloseButton.addEventListener('click', ()=>{
    tollGatePage.classList.remove('overlays-toll-gate-show');
});

// to submit the toll gate details
submitTollGate.addEventListener('click', (e)=>{

    let tollGateName = tollGateNameTag.value;
   
        let carJeepVan = [];
        carJeepVan.push(singleReturnCarJeepVan[0].value);
        carJeepVan.push(singleReturnCarJeepVan[1].value);
    
        let LVC = [];
        LVC.push(singleReturnLVC[0].value);
        LVC.push(singleReturnLVC[1].value);
    
        let truckBus = [];
        truckBus.push(singleReturnTruckBus[0].value);
        truckBus.push(singleReturnTruckBus[1].value);

        let heavyVehicle = [];
        heavyVehicle.push(singleReturnHeavyVehicle[0].value);
        heavyVehicle.push(singleReturnHeavyVehicle[1].value);

        let obj = new tollGate(tollGateName, carJeepVan, LVC, truckBus, heavyVehicle);
    

        if(JSON.parse(window.localStorage.getItem('tollGate'))){
            tollGateList = JSON.parse(window.localStorage.getItem('tollGate'));
        }
        tollGateList.push(obj);
        window.localStorage.setItem('tollGate', JSON.stringify(tollGateList));
    
});






