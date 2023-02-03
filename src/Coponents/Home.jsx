import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import useWindowDimensions from '../Utils/useWindowDimensions';
import Dropdown from './Dropdown';

function Home () {
    const { height, width } = useWindowDimensions();

    const [xAxisLabel, setXAxisLabel] = useState("X-Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y-Axis");

    return (
    <div style={{width: '100%', height: height , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '480px', width: '50%'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', width: '90%', backgroundColor: 'white', borderRadius: '25px'}}>
                <Dropdown open={true} menu={["A", "B", "C"]} optionOnClick={setXAxisLabel} labelText={"X Axis"}/>
                <Dropdown open={true} menu={["one", "two", "three"]} optionOnClick={setYAxisLabel} labelText={"Y Axis"}/>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
            <Plot
                data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
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