function searchListforMFID (listToSearch, mf_id) {

    let appearsInList = false; 

    for(let i = 0; i < listToSearch.length; i++){
        if(listToSearch[i].mf_id === mf_id){
            appearsInList = true;
        }
    }

    return appearsInList;

}

export default searchListforMFID;