import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import getListEntryByID from '../Utils/getListEntryByID';
import removeNullsFromCombinedList from '../Utils/removeNullsFromCombinedList';
//import searchListformet_id from '../Utils/searchListForID';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';
import convert_data from  '../Utils/convert_data';
import getPubIds from '../Utils/getPubData'
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import notFoundImage from '../Assets/not_found.png';



function Home () {
    const { height, } = useWindowDimensions();

    const [xAxisLabel, setXAxisLabel] = useState("bulk-density");
    const [yAxisLabel, setYAxisLabel] = useState("compressive-modulus");

    const pascalList = []

    const [xAxisUnit, setXAxisUnit] = useState(['kg/m\u00b3']);
    const [yAxisUnit, setYAxisUnit] = useState(["MPa"]);

    const [xAxisData, setXAxisData] = useState([]);
    const [yAxisData, setYAxisData] = useState([]);

    const [listToPlot, setListToPlot] = useState([]);

    const [xUnitsToPlot, setXUnitsToPlot] = useState([]);
    const [yUnitsToPlot, setYUnitsToPlot] = useState([]);

    const [dropDownOptions, setDropDownOptions] = useState([]);

    const [xUnitsDropDownOptions, setXUnitsDropDownOptions] = useState([]);
    const [yUnitsDropDownOptions, setYUnitsDropDownOptions] = useState([]);

    const [selectedData, setSelectedData] = useState({});
    const [met_id, setmet_id] = useState([]);
    
    const [pubDetails, setpubDetails] = useState([]);
    const [imgURL, setimgURL] = useState([])

    const onPlotClick = (data) => {
      console.log("on click")
      console.log(data)
      console.log("list to plot on click")
      console.log(listToPlot)
  setmet_id(listToPlot[data.points[0].pointIndex].met_id);
  setSelectedData(data.points[0]);};

  useEffect(()=>{
    // const [shorterArray, longerArraySnipped ] = truncateArray(xAxisData, yAxisData);
    

  },[])

    useEffect(()=>{
      
      axios.get('http://127.0.0.1:5000/avail_data', {}, {
        })
      .then((response)=>{
        setDropDownOptions(response.data)
        console.log("MEASURES_DROP")
        console.log(dropDownOptions)
      });
    },[])


    useEffect(()=>{
      // const [shorterArray, longerArraySnipped ] = truncateArray(xAxisData, yAxisData);
      const combinedXYDataArray = [];
      const xUnitsArray = [];
      const yUnitsArray = [];

      if(xAxisData.length > 0 && yAxisData.length > 0 ){

        for(let i = 0; i < yAxisData.length; i++){
          
          if(yAxisData[i][yAxisLabel][0]['values'] !== null && xAxisData[i][xAxisLabel][0]['values'] !== null){
            
            let yValues = yAxisData[i][yAxisLabel][0]['values'];
            let yUnits = yAxisData[i][yAxisLabel][1]['units'];
            let xValues = xAxisData[i][xAxisLabel][0]['values'];
            let xUnits = xAxisData[i][xAxisLabel][1]['units'];
            let id = yAxisData[i]['id'];
            let sub_type = yAxisData[i]['submission_type'];
            let mat_type = yAxisData[i]['sensitivity'];
            console.log("Y AXIS")
            console.log(yValues)
            console.log("X AXIS")
            console.log(xValues)
            for (let yKey in yValues) {
              for (let xKey in xValues){
                combinedXYDataArray.push({yAxis: yValues[yKey], yUnit: yUnits, xAxis: xValues[xKey], xUnit: xUnits, yType: yKey, xType: xKey, met_id: id, sub_type:sub_type, mat_type:mat_type}) 
                console.log({yAxis: yValues[yKey], yUnit: yUnits, xAxis: xValues[xKey], xUnit: xUnits, yType: yKey, xType: xKey, met_id: id, sub_type:sub_type, mat_type:mat_type})
            }
            
          }}}
      
      //console.log(combinedXYDataArray)
      console.log("combined POS")
      console.log(combinedXYDataArray)
      setListToPlot(combinedXYDataArray)
      console.log("list to plot")
      console.log(listToPlot)

      //setXAxisUnits(new Set(combinedXYDataArray.filter(item => item.xUnit !== null).map(item => item.xUnit)));
      //setYAxisUnits(new Set(combinedXYDataArray.filter(item => item.yUnit !== null).map(item => item.yUnit)));
      
      // for (let xunits of xAxisUnits){
      //   xUnitsArray.push({keyword: xunits})
        
      // }
      // for (let yunits of yAxisUnits){
      //   yUnitsArray.push({keyword: yunits})
      //   //console.log("Y_UNIT")
      //   //console.log(yunits)
      // }

      // setXUnitsToPlot(xUnitsArray)
      // setYUnitsToPlot(yUnitsArray)
      //console.log("Y_UNITS_")
      //console.log(yUnitsToPlot)
      //console.log(yAxisUnits)
      //console.log("Y_DATA")
      //console.log(yAxisData)
      //console.log(yAxisUnits)
      //setYAxisUnits(Set(combinedXYDataArray.map(item => item.yUnit)))
      
    }
    },[xAxisData, yAxisData])

    // useEffect(()=>{
    //   if (xAxisLabel == "X-Axis"){
        
    //   axios.get(`http://127.0.0.1:5000/get_vals/bulk-density`)
    //   .then((response)=>{

    //     setXAxisLabel("bulk-density")
    //     setXAxisData(response.data)
        
    //   })};
    // },[xAxisLabel])

    // useEffect(()=>{
    //   if (yAxisLabel == "Y-Axis"){

    //   axios.get(`http://127.0.0.1:5000/get_vals/compressive-modulus`, {}, {
    //   })
    //   .then((response)=>{

    //     setYAxisData(response.data)
    //     setYAxisLabel("compressive-modulus")

    //   })};
    // },[yAxisLabel])

    useEffect(()=>{
      if (xAxisLabel !== "X-Axis"  && yAxisLabel !== "Y-Axis"){

      axios.get(`http://127.0.0.1:5000/get_vals/${xAxisLabel}`)
      .then((response)=>{

        setXAxisData(response.data)

        const xUnitArray =[]
        const units = new Set(response.data
          .filter(item => item[xAxisLabel][1]['units'] !== null) // Filter out items with null units
          .map(item => item[xAxisLabel][1]['units']));
          for(let item of units){
            xUnitArray.push({keyword: item})
          }
          console.log("x unit array")
          setXUnitsDropDownOptions(xUnitArray)

      })};
    },[xAxisLabel])

    useEffect(()=>{
      if (xAxisLabel !== "X-Axis" && yAxisLabel !== "Y-Axis"){
        
      axios.get(`http://127.0.0.1:5000/get_vals/${yAxisLabel}`, {}, {
      })
      .then((response)=>{

;        setYAxisData(response.data);
        console.log("YAXIS")
        console.log(yAxisData)

        const yUnitArray =[]
        const units = new Set(response.data
          .filter(item => item[yAxisLabel][1]['units'] !== null) // Filter out items with null units
          .map(item => item[yAxisLabel][1]['units']));
          for(let item of units){
            yUnitArray.push({keyword: item})
            //console.log("indiv unit - y")
            //console.log(item)
          }
          console.log("y unit array")
          console.log(yUnitArray)
          setYUnitsDropDownOptions(yUnitArray)
          setYAxisUnit(yUnitArray[0][0])

        
      })};
    },[yAxisLabel])



    useEffect(()=>{
      if (met_id.length !== 0) {

      axios.get(`http://127.0.0.1:5000/get_pub/${met_id}`)
      .then((response)=>{
;        setpubDetails(response.data);


         setimgURL(response.data.img)

  
      })};
    },[met_id])


    useEffect(()=>{
      
      convert_data(yAxisData, yAxisLabel, yAxisUnit)
      
      console.log(yAxisUnit)
      
  
    },[yAxisUnit])

    return (

      <>
    <div style={{width: '100%', height: useWindowDimensions()/10 , display: 'flex', justifyContent: 'center', alignItems: 'center', margin:10}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>
        <h1>MetaMaterials Genome Project</h1>
    </div>
    </div>  

    <div style={{width: '100%', height: height*0.7 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      
        

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '480px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>
    <h1 style={{textAlign: 'center', margin: '20px 0'}}>MetaGenome Graph Customization</h1>
    <p style={{textAlign: 'center', margin: '10px 0', marginBottom: '20px'}}>This graph present data from the Meta-genome database. Try changing the requested data to investigate material space!</p>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>

        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== xAxisLabel && option.keyword !== yAxisLabel })} optionOnClick={setXAxisLabel} labelText={"X Axis"} style={{zIndex: 1}}/>
        <Dropdown open={true} menu={xUnitsDropDownOptions.filter((option)=>{return option.keyword !== 0  })} optionOnClick={setXAxisUnit} labelText={"X Axis - units"} style={{zIndex: 0}}/>

        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== yAxisLabel && option.keyword !== xAxisLabel })} optionOnClick={setYAxisLabel} labelText={"Y Axis"} style={{zIndex: 1}}/>
        <Dropdown open={true} menu={yUnitsDropDownOptions.filter((option)=>{return option.keyword})} optionOnClick={setYAxisUnit} labelText={"Y Axis - units"} style={{zIndex: 0}}/>
    </div>
    
</div>

</div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '480px', width: '50%'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>
            <Plot
              
                data={[
                  
                  {
                    x: listToPlot.map((listElement) => listElement.xAxis),
                    y: listToPlot.map((listElement) => listElement.yAxis),
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'orange' },
                    name: 'Metamaterial', // add a name for the trace
                    text : listToPlot.map(
                      (listElement) =>
                        `material type: ${listElement.mat_type}<br>X data type: ${listElement.xType}<br>Y data type: ${listElement.yType}`
                    ),
                  },
                  {
                    x: listToPlot.filter((listElement) => listElement.sub_type === 'base-material').map((listElement) => listElement.xAxis),
                    y: listToPlot.filter((listElement) => listElement.sub_type === 'base-material').map((listElement) => listElement.yAxis),
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'purple' },
                    name: 'Base-material', // add a name for the trace
                    text : listToPlot.map(
                      (listElement) =>
                        `material type: ${listElement.mat_type}<br>X data type: ${listElement.xType}<br>Y data type: ${listElement.yType}`
                    ),
                  },
                
              
                
                // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: 640, height: 480, showlegend:false,
                    // title: 'A Fancy Plot',
                xaxis: {
                    title: {
                      text: xAxisLabel + "  " + xAxisUnit,
                      font: {
                        family: '',
                        size: 16,
                        color: 'black'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: yAxisLabel + "  " + yAxisUnit,
                      font: {
                        family: '',
                        size: 16,
                        color: 'black'
                      }
                    }
                    
                  }
                } }
                  onClick={onPlotClick}
            />
        </div>
        </div>
    </div>


    {selectedData.x && selectedData.y && (
        
        <div style={{width: '100%', height: height*0.7 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '480px', width: '50%'}}>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>

        <div style={{margin:"50px", justifyContent: 'center', alignItems: 'center', width: '90%'}}>
          
          <h2 style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'}}>
            image of metamaterial
            </h2>
            {imgURL && <img 
              src={imgURL} 
              alt="image" 
              
              style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'}}
            />}
            
            
          </div>
          </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '480px', width: '50%'}}>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>

          <div style={{margin:"50px"}}>
          
          <p>Meta-Genome ID:  {pubDetails.metaPid}</p>
          <p>{xAxisLabel}: {selectedData.x}</p>
          <p>{yAxisLabel}: {selectedData.y}</p>
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