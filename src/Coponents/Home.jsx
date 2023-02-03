import React from 'react';
import Plot from 'react-plotly.js';
function Home () {
    return (
    <div style={{width: '100%', height: 'screen', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
   
        <Plot
            data={[
            {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {width: 640, height: 480, title: 'A Fancy Plot'} }
        />
    
    </div>
    );
  }
  
  export default Home;