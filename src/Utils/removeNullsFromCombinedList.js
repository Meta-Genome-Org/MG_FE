function removeNullsFromCombinedList (combinedList) {

    const combinedListWithNullReturned = [];

    for(let i = 0; i < combinedList.length; i++){
        if((combinedList[i].yAxis.mean_value == null || combinedList[i].xAxis.mean_value == null) === false){
            combinedListWithNullReturned.push(combinedList[i]);
        }
    }

    return combinedListWithNullReturned;

}

export default removeNullsFromCombinedList;