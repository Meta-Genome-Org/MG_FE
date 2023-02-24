import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import getListEntryByID from '../Utils/getListEntryByID';
import removeNullsFromCombinedList from '../Utils/removeNullsFromCombinedList';
import searchListforMFID from '../Utils/searchListForID';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';
import getPubIds from '../Utils/getPubData'


function Home () {
    const { height, } = useWindowDimensions();

    const [xAxisLabel, setXAxisLabel] = useState("X-Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y-Axis");

    const [xAxisData, setXAxisData] = useState([]);
    const [yAxisData, setYAxisData] = useState([]);

    const [listToPlot, setListToPlot] = useState([]);

    const [dropDownOptions, setDropDownOptions] = useState([]);

    const [selectedData, setSelectedData] = useState({});
    const [mfid, setmfid] = useState([]);
    
    const [pubDetails, setpubDetails] = useState([]);

    const onPlotClick = (data) => {
  setmfid(listToPlot[data.points[0].pointIndex].xAxis.mf_id);
  // axios.post('http://localhost:4000/QueryDataBase', {"SQL" : "SELECT authors, title, journal, year FROM MetF_References WHERE mf_id = ${mfid}"})
  //     .then((response)=>{
  //       (setpubDetails(response.data[0]))
  //     });

  // getPubIds(mfid).then(() => {
  //   setpubDetails(getPubIds(mfid))
  //   console.log("PUB DETAILS");
  //   console.log(pubDetails);
    
  // });
  setSelectedData(data.points[0]);
};
    
    


    
    // function truncateArray(arr1, arr2) {
    //   let shorterArray = arr1.length < arr2.length ? arr1 : arr2;
    //   let longerArray = arr1.length >= arr2.length ? arr2 : arr1;
    
    //   let shorterIds = shorterArray.map(item => item.mf_id);
    //   let longerArraySnipped = longerArray.filter(item => shorterIds.includes(item.mf_id));
    //   return [shorterArray, longerArraySnipped]

    // }



    useEffect(()=>{
      axios.get('http://meta-genome.org:4000/getkeys')
      .then((response)=>{
        
        setDropDownOptions(response.data.response)
      });
    },[])


    useEffect(()=>{
      // const [shorterArray, longerArraySnipped ] = truncateArray(xAxisData, yAxisData);
      const combinedXYDataArray = [];
      if(xAxisData.length > yAxisData.length){
        for(let i = 0; i < yAxisData.length; i++){
          if(searchListforMFID(xAxisData, yAxisData[i].mf_id)){
            combinedXYDataArray.push({yAxis: yAxisData[i], xAxis: getListEntryByID(xAxisData, yAxisData[i].mf_id)})
          }
        }
      }
      else  if(xAxisData.length <= yAxisData.length) {
        for(let i = 0; i < xAxisData.length; i++){
          if(searchListforMFID(yAxisData, xAxisData[i].mf_id)){
            combinedXYDataArray.push({xAxis: xAxisData[i], yAxis: getListEntryByID(yAxisData, xAxisData[i].mf_id)})
          }
        }
      }
      setListToPlot(removeNullsFromCombinedList(combinedXYDataArray));
     
    },[xAxisData, yAxisData])


    useEffect(()=>{
      if (xAxisLabel !== "X-Axis"  || yAxisLabel !== "Y-Axis"){
      axios.get(`http://meta-genome.org:4000/MetF?label=${xAxisLabel}`)
      .then((response)=>{
        setXAxisData(response.data.response)
      })};
    },[xAxisLabel])

    useEffect(()=>{
      if (xAxisLabel !== "X-Axis" || yAxisLabel !== "Y-Axis"){
      axios.get(`http://meta-genome.org:4000/MetF?label=${yAxisLabel}`)
      .then((response)=>{
;        setYAxisData(response.data.response);
      })};
    },[yAxisLabel])

    useEffect(()=>{
      if (mfid.length !== 0) {
      axios.get(`http://meta-genome.org:4000/MetF/${mfid}`)
      .then((response)=>{
;        setpubDetails(response.data.response[0]);
        console.log("POG")  
        console.log(pubDetails)
  
      })};
    },[mfid])

    // useEffect(()=> {
    //   setpubDetails(getPubIds(mfid));
    // },[])


    return (

      <>
    <div style={{width: '100%', height: useWindowDimensions()/10 , display: 'flex', justifyContent: 'center', alignItems: 'center', margin:10}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>
        <h1>MetaMaterials Genome Project</h1>
    </div>
    </div>  

    <div style={{width: '100%', height: height*0.7 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '480px', width: '50%'}}>
        
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>

              
                <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== xAxisLabel && option.keyword !== yAxisLabel })} optionOnClick={setXAxisLabel} labelText={"X Axis"}/>
                <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== xAxisLabel && option.keyword !== yAxisLabel })} optionOnClick={setYAxisLabel} labelText={"Y Axis"}/>
                  
          
            </div>
            
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%'}}>

            <Plot
                data={[
                {
                    x: listToPlot.map((listElement)=>{return listElement.xAxis.mean_value}),
                    y: listToPlot.map((listElement)=>{return listElement.yAxis.mean_value}),
                    type: 'scatter',
                    mode: 'markers',
                    marker: {color: 'teal'},
                },
                
                // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: 640, height: 480, showlegend:true,
                    // title: 'A Fancy Plot',
                xaxis: {
                    title: {
                      text: xAxisLabel,
                      font: {
                        family: '',
                        size: 16,
                        color: 'black'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: yAxisLabel,
                      font: {
                        family: '',
                        size: 16,
                        color: 'black'
                      }
                    }
                  }} }
                  onClick={onPlotClick}
            />
        </div>

    </div>


    {selectedData.x && selectedData.y && (
        
        <div style={{width: '100%', height: height*0.7 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '480px', width: '50%'}}>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>

        <div>
          <p>some text</p>
          </div>
          
          </div>
          </div>

        <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center',height: '480px', width: '50%'}}>

        <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>

          <div style={{margin:"50px"}}>
          
          <p>mf_id:  {mfid}</p>
          <p>foam detail: {pubDetails.entry}</p>
          <p>{xAxisLabel}: {selectedData.x}</p>
          <p>{xAxisLabel}: {selectedData.y}</p>
          <p>authors: {pubDetails.authors}</p>
          <p>title: {pubDetails.title}</p>
          <p>journal: {pubDetails.journal}</p>
          <p>year: {pubDetails.year}</p>
          
          
          </div>
          
          </div>
          </div>
          </div>
      )}
      


    </>
    );
  }
  
  export default Home;