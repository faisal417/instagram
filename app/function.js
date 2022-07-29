

// /*
// *Set Alert Function
// */
 
const setAlert=( msg, type='danger')=>{
    return `<p class="alert alert-${type} d-flex justify-content-between">
    ${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}


// Product app individual function

/**
 * set value ls (Step- 1)
 */


const createLsData = (key, value) =>{

    // init value
    let data = [];

    // check key exist or not
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
        
    }
    // push data to local storage
    data.push(value);
    // set data
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * get all local host data ( Step -2 )
 */

const readlsData = (key) =>{
    
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}

/**
 * Update ls data
 */

 const updatelsData = (key, array) =>{   
    
    localStorage.setItem(key, JSON.stringify(array))
}