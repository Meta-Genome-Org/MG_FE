import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';
import convertData from  '../Utils/convertData';
import Logo from '../Assets/meta_gemone_logo_blue.png'
import "@fontsource/lato";

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

    
    // get meta-genome submission id (met_id) - not the same as PID.
    // data contains info on point clicked in plotly graph.
    // use x and y attribs to identify the met_id from listToPlot.
    const onPlotClick = (data) => {
      
      const chosenPoint = listToPlot.find(listElement => 
        listElement.xAxis === data.points[0].x && listElement.yAxis === data.points[0].y
      );
      if (chosenPoint) {
        setmet_id(chosenPoint.met_id);
      }
  // contains x and y axis values
  setSelectedData(data.points[0]);
};

    //    **** POPULATE DROPDOWN MENUS ****
    // initial population of x and y axis dropdown menus
    // response.data is a static json object from api.
    useEffect(()=>{
      axios.get('http://localhost:5000/avail_data', {}, {
        })
      .then((response)=>{
        setDropDownOptions(response.data)
        
      });
    },[])

    //    **** UNIT-CONVERSION AND ELIMINATION OF MISMATCH DATA ****
    // collating the raw json from API containing x and y data into
    // a single array with necessary data.
    // This will only collate data points where both x and y data are paired
    // changes when x or y axis is changed
    // sets the final combined array into listToPlot
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

    //    **** GET X AXIS DATA AND SANITIZE ****
    // get json containing requested x Axis data from API.
    // standardises units according to requested data type
    // (see '../Utils/convertData.js)
    useEffect(()=>{
      if (xAxisLabel !== "X-Axis"  && yAxisLabel !== "Y-Axis"){

      axios.get(`http://localhost:5000/get_vals/${xAxisLabel}`)
      .then((response)=>{

        const newData = convertData(response.data, xAxisLabel, xAxisUnit)
        
;        setXAxisData(newData.data);
        
        setXUnitsDropDownOptions(newData.units)
        // if the data is unitless - set keyword to display on plot axis
        if (newData.units[0].keyword === null){
          setXAxisUnit("unitless")
        }
        else if(newData.units[0].keyword !== null){
          setXAxisUnit(newData.units[1].keyword)
}
    // Reset publication details and x y object upon selection of new axis
    setpubDetails({authors:"", doi:"",img:"",img_pid:"",journal:"",metaPid:"",title:"",year:""})
    setSelectedData({xAxis:"",yAxis:""})
    setimgURL(null)
      })};
    },[xAxisLabel])

    //    **** GET X AXIS DATA AND SANITIZE ****
    // functionally very similar to x axis request - see above. 
    // site for truncation of code
    useEffect(()=>{
      if (xAxisLabel !== "X-Axis" && yAxisLabel !== "Y-Axis"){
        
      axios.get(`http://localhost:5000/get_vals/${yAxisLabel}`, {}, {
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
       
        setpubDetails({authors:"", doi:"",img:"",img_pid:"",journal:"",metaPid:"",title:"",year:""})
        setSelectedData({xAxis:"",yAxis:""})
        setimgURL(null)
      })};
    },[yAxisLabel])


    //    **** GET PUBLICATION INFORMATION ON CLICKED DATA POINT ****
    useEffect(()=>{
      if (met_id.length !== 0) {
        try{
          axios.get(`http://localhost:5000/get_pub/${met_id}`)
          .then((response)=>{

    ;       setpubDetails(response.data);
            console.log(response.data)
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
    

    <div style={{width: '100%', height: height*0.58 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '0px'}}>
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
                x: listToPlot.filter((listElement) => listElement.sub_type === "base-material").map((listElement) => listElement.xAxis),
                y: listToPlot.filter((listElement) => listElement.sub_type === "base-material").map((listElement) => listElement.yAxis),
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'purple' },
                name: 'Base-material', // add a name for the trace
                text : listToPlot.map(
                  (listElement) =>
                    `material type: ${listElement.mat_type}<br>X data type: ${listElement.xType}<br>Y data type: ${listElement.yType}`
                ),
              },
            
            ]}
            layout={ {width: 640, height: 400, showlegend:true, title: {
              text: 'Click on a point to explore',
              font: {
                size: 24,
                color: 'black',
                font: 'bold',
                fontFamily:"Lato"
              },
            },
            xaxis: {
                title: {
                  text: xAxisLabel + "  " + "(" + xAxisUnit + ")",
                  font: {
                    family: '',
                    size: 16,
                    color: 'black', 
                    fontFamily:"Lato"
                    
                  }
                },
              },
              yaxis: {
                title: {
                  text: yAxisLabel + "  " + "(" + yAxisUnit + ")",
                  font: {
                    family: '',
                    size: 16,
                    color: 'black',
                   fontFamily:"Lato"
                  }
                }
                
              }
            } }
              onClick={onPlotClick}
        />
    </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '0px'}}>

        <div style={{margin:"50px", justifyContent: 'center', alignItems: 'flex-start', width: '90%'}}>
            <img
  src={imgURL+"?auth=$"}
  
  style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '0px'}}
  
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = Logo; 
    e.target.style.width = '50%'; 
    e.target.style.height = '50%'; 
    e.target.style.display = 'block';
    e.target.style.margin = 'auto'; 
  }}
/>    
    </div>
    </div>
    </div>

    
    </div>

    <div style={{width: '100%', height: height*0.45 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>    
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '300px', width: '50%'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '0px'}}>
    
    <h2 style={{textAlign: 'center', margin: '20px 0', fontFamily:"Lato"}}>
      Meta-Genome Graph Customization
      </h2>
    <p style={{textAlign: 'center', margin: '10px 0', marginBottom: '20px', fontFamily:"Lato"}}>
      Try changing the requested data to investigate material space!
      </p>

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>

        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== xAxisLabel && option.keyword !== yAxisLabel })} optionOnClick={setXAxisLabel} labelText={"X Axis"} style={{zIndex: 1}}/>
        <Dropdown open={true} menu={dropDownOptions.filter((option)=>{return option.keyword !== yAxisLabel && option.keyword !== xAxisLabel })} optionOnClick={setYAxisLabel} labelText={"Y Axis"} style={{zIndex: 1}}/>
        
    </div>
    </div>
    </div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '300px', width: '50%'}}>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '95%', backgroundColor: 'white', borderRadius: '0px'}}>

          <div style={{margin:"50px", fontFamily:"Lato"}}>
          
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