function getListEntryByID (listToSearch, mf_id) {

    for(let i = 0; i < listToSearch.length; i++){
        if(listToSearch[i].mf_id === mf_id){
            return listToSearch[i];
        }
    }

    return false;

}

export default getListEntryByID;