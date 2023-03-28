import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';
import convertData from  '../Utils/convertData';
import Logo from '../Assets/meta_gemone_logo_blue.png'


function Home () {
    const { height, } = useWindowDimensions();

    const [xAxisLabel, setXAxisLabel] = useState("bulk-density");
    const [yAxisLabel, setYAxisLabel] = useState("compressive-modulus");

    const [xAxisUnit, setXAxisUnit] = useState(['kg/m\u00b3']);
    const [yAxisUnit, setYAxisUnit] = useState(["MPa"]);

    const [xAxisData, setXAxisData] = useState([]);
    const [yAxisData, setYAxisData] = useState([]);

    const [listToPlot, setListToPlot] = useState([]);

    const [dropDownOptions, setDropDownOptions] = useState([]);

    const [xUnitsDropDownOptions, setXUnitsDropDownOptions] = useState([]);
    const [yUnitsDropDownOptions, setYUnitsDropDownOptions] = useState([]);

    const [selectedData, setSelectedData] = useState({});
    const [met_id, setmet_id] = useState([]);
    
    const [pubDetails, setpubDetails] = useState([]);
    const [imgURL, setimgURL] = useState([])

    const onPlotClick = (data) => {
  setmet_id(listToPlot[data.points[0].pointIndex].met_id);
  setimgURL(null)
  setSelectedData(data.points[0]);};


    useEffect(()=>{
      
      axios.get('https://api.meta-genome.org/avail_data', {}, {
        })
      .then((response)=>{
        setDropDownOptions(response.data)
        
      });
    },[])


    useEffect(()=>{
      
      const combinedXYDataArray = [];
      

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
            
            for (let yKey in yValues) {
              for (let xKey in xValues){
                combinedXYDataArray.push({yAxis: yValues[yKey], yUnit: yUnits, xAxis: xValues[xKey], xUnit: xUnits, yType: yKey, xType: xKey, met_id: id, sub_type:sub_type, mat_type:mat_type}) 
                
            }
            
          }}}
          
      setListToPlot(combinedXYDataArray)
    
    }
    },[xAxisData, yAxisData])


    useEffect(()=>{
      if (xAxisLabel !== "X-Axis"  && yAxisLabel !== "Y-Axis"){

      axios.get(`https://api.meta-genome.org/get_vals/${xAxisLabel}`)
      .then((response)=>{

        
        const newData = convertData(response.data, xAxisLabel, xAxisUnit)
        
;        setXAxisData(newData.data);
        
        setXUnitsDropDownOptions(newData.units)
        if (newData.units[0].keyword === null){
          setXAxisUnit("")
        }
        else if(newData.units[0].keyword !== null){
          setXAxisUnit(newData.units[1].keyword)
}
    console.log(xAxisData)
      })};
    },[xAxisLabel])

    useEffect(()=>{
      if (xAxisLabel !== "X-Axis" && yAxisLabel !== "Y-Axis"){
        
      axios.get(`https://api.meta-genome.org/get_vals/${yAxisLabel}`, {}, {
      })
      .then((response)=>{

        const newData = convertData(response.data, yAxisLabel, yAxisUnit)
        if (newData.units[0].keyword === null){
          setYAxisUnit("unitless")
        }
        else if(newData.units[0].keyword !== null){
          
          setYAxisUnit(newData.units[1].keyword)
        }
        
;        setYAxisData(newData.data);
        
        setYUnitsDropDownOptions(newData.units)
       
      })};
    },[yAxisLabel])



    useEffect(()=>{
      if (met_id.length !== 0) {
        try{
          axios.get(`https://api.meta-genome.org/get_pub/${met_id}`)
          .then((response)=>{
    
    ;       setpubDetails(response.data);
            
            console.log(response.data.img)
            if (response.data.img === ""){
              setimgURL(null)
            }
           
            else{
            setimgURL(response.data.img)
          }
          }
          )
        }
        catch(err){

          setimgURL(null)
        }


      
    };
    },[met_id])


    



    return (

      <>
    <div style={{width: '100%', height: useWindowDimensions()/10 , display: 'flex', justifyContent: 'center', alignItems: 'center', margin:10}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>
        <h1>Meta-Materials Genome Project</h1>
    </div>
    </div>  

    <div style={{width: '100%', height: height*0.58 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>
        <Plot
          
            data={[
              
              {
                x: listToPlot.map((listElement) => listElement.xAxis),
                y: listToPlot.map((listElement) => listElement.yAxis),
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'orange' },
                name: 'Meta-material', // add a name for the trace
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
            layout={ {width: 640, height: 400, showlegend:true, title: {
              text: 'Click on a point to explore',
              font: {
                size: 24,
                color: 'black',
                font: 'bold',
              },
            },
                // title: 'A Fancy Plot',
            xaxis: {
                title: {
                  text: xAxisLabel + "  " + "(" + xAxisUnit + ")",
                  font: {
                    family: '',
                    size: 16,
                    color: 'black'
                  }
                },
              },
              yaxis: {
                title: {
                  text: yAxisLabel + "  " + "(" + yAxisUnit + ")",
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


    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>

        <div style={{margin:"50px", justifyContent: 'center', alignItems: 'flex-start', width: '90%'}}>
          
          
            <img
  src={imgURL+"?auth=$"}
  alt="image"
  style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'}}
  
  onError={(e) => {
    e.target.onerror = null; // Prevents an infinite loop
    e.target.src = Logo; // Set the URL of the fallback image
    e.target.style.width = '50%'; // Set the width of the fallback image to 50%
    e.target.style.height = '50%'; // Set the height of the fallback image to 50%
    e.target.style.display = 'block'; // Set display to block
    e.target.style.margin = 'auto'; // Center the image horizontally
  }}
/>
            
            
          </div>
          </div>
    </div>

    
    </div>

        <div style={{width: '100%', height: height*0.45 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '300px', width: '50%'}}>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>
    <h1 style={{textAlign: 'center', margin: '20px 0'}}>Meta-Genome Graph Customization</h1>
    <p style={{textAlign: 'center', margin: '10px 0', marginBottom: '20px'}}>This graph present data from the Meta-genome database. Try changing the requested data to investigate material space!</p>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>

        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== xAxisLabel && option.keyword !== yAxisLabel })} optionOnClick={setXAxisLabel} labelText={"X Axis"} style={{zIndex: 1}}/>
        

        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== yAxisLabel && option.keyword !== xAxisLabel })} optionOnClick={setYAxisLabel} labelText={"Y Axis"} style={{zIndex: 1}}/>
        
    </div>
    </div>
    </div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '300px', width: '50%'}}>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '25px'}}>

          <div style={{margin:"50px"}}>
          
          <p><a href={pubDetails.metaPid} target="_blank">Link to submitted data</a></p>

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
      
      


    </>
    
    );
  }
  
  export default Home;