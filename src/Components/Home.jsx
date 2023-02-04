import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import getListEntryByID from '../Utils/getListEntryByID';
import removeNullsFromCombinedList from '../Utils/removeNullsFromCombinedList';
import searchListforMFID from '../Utils/searchListForID';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';


function Home () {
    const { height, } = useWindowDimensions();

    const [xAxisLabel, setXAxisLabel] = useState("X-Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y-Axis");

    const [xAxisData, setXAxisData] = useState([]);
    const [yAxisData, setYAxisData] = useState([]);

    const [listToPlot, setListToPlot] = useState([]);

    const [dropDownOptions, setDropDownOptions] = useState([]);


    // function truncateArray(arr1, arr2) {
    //   let shorterArray = arr1.length < arr2.length ? arr1 : arr2;
    //   let longerArray = arr1.length >= arr2.length ? arr2 : arr1;
    
    //   let shorterIds = shorterArray.map(item => item.mf_id);
    //   let longerArraySnipped = longerArray.filter(item => shorterIds.includes(item.mf_id));
    //   return [shorterArray, longerArraySnipped]

    // }

    useEffect(()=>{
      axios.post('http://localhost:4000/QueryDataBase', {"SQL" : "SELECT DISTINCT keyword FROM MetF_StandardTable"})
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
            combinedXYDataArray.push({yAxis: yAxisData[i], xAxis: getListEntryByID(xAxisData, yAxisData[i].mf_id) })
          }
        }
      }
      else  if(xAxisData.length <= yAxisData.length) {
        for(let i = 0; i < xAxisData.length; i++){
          if(searchListforMFID(yAxisData, xAxisData[i].mf_id)){
            combinedXYDataArray.push({xAxis: xAxisData[i], yAxis: getListEntryByID(yAxisData, xAxisData[i].mf_id) })
          }
        }
      }
      setListToPlot(removeNullsFromCombinedList(combinedXYDataArray));
     
    },[xAxisData, yAxisData])


    useEffect(()=>{
      axios.post('http://localhost:4000/QueryDataBase', {"SQL" : `SELECT mf_id ,mean_value FROM MetF_StandardTable WHERE keyword="${xAxisLabel}"`})
      .then((response)=>{
        setXAxisData(response.data.response)
      });
    },[xAxisLabel])

    useEffect(()=>{
      axios.post('http://localhost:4000/QueryDataBase', {"SQL" : `SELECT mf_id ,mean_value FROM MetF_StandardTable WHERE keyword="${yAxisLabel}"`})
      .then((response)=>{
;        setYAxisData(response.data.response);
      });
    },[yAxisLabel])




    return (
    <div style={{width: '100%', height: height , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                layout={ {width: 640, height: 480, 
                    // title: 'A Fancy Plot',
                xaxis: {
                    title: {
                      text: xAxisLabel,
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: yAxisLabel,
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    }
                  }} }            
            />
        </div>
    
    </div>
    );
  }
  
  export default Home;