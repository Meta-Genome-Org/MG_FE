function convertData(jsonData, keyword, desiredUnit) {
  

  if (keyword === "tensile-modulus" || keyword === "compressive-modulus" || 
      keyword === "yield-strength" || keyword === "ultimate-yield-strength"){

        if (desiredUnit === ""){

          desiredUnit = "MPa"
        }

        const conversionFactors = [{
          KPa : {KPa: 1, MPa: 0.001, GPa: 0.000001},
          MPa : {KPa: 1000, MPa: 1, GPa: 0.001},
          GPa : {KPa: 1000000, MPa: 1000, GPa: 1}
      }];
      
        for (let i = 0; i < jsonData.length; i++) {
          const givenValue = jsonData[i][keyword][0]['values']
          const givenUnit = jsonData[i][keyword][1]['units']
          
          if (givenValue !== null && givenUnit !== null){
            
            const conversionValue = conversionFactors[0][givenUnit][desiredUnit]
            
            for (let key in jsonData[i][keyword][0]['values']){
              
              jsonData[i][keyword][0]['values'][key] = jsonData[i][keyword][0]['values'][key] * conversionValue
              
            }
            jsonData[i][keyword][1]['units'] = desiredUnit
          }

        }
        
        const avail_datas = [{keyword:'KPa'}, 
        {keyword:'MPa'}, 
        {keyword:'GPa'}]

        return {data: jsonData, units: avail_datas};

      }

      else if( keyword === "bulk-density"){
        const conversionFactors = [{
          'kg/m\u00b3' : {'kg/m\u00b3': 1, 'g/cm\u00b3': 0.001},
          'g/cm\u00b3' : {'kg/m\u00b3': 1000, 'g/cm\u00b3': 1}
      }];

      if (desiredUnit === ""){
        desiredUnit = "kg/m\u00b3"
      }
      
        for (let i = 0; i < jsonData.length; i++) {
          const givenValue = jsonData[i][keyword][0]['values']
          const givenUnit = jsonData[i][keyword][1]['units']
          
          if (givenValue !== null && givenUnit !== null){
            
            const conversionValue = conversionFactors[0][givenUnit][desiredUnit]
            
            for (let key in jsonData[i][keyword][0]['values']){
              
              jsonData[i][keyword][0]['values'][key] = jsonData[i][keyword][0]['values'][key] * conversionValue
              
            }
            jsonData[i][keyword][1]['units'] = desiredUnit
          }

        }
        
        const avail_datas = [{keyword:'g/cm\u00b3'}, 
        {keyword:'kg/m\u00b3'}]

        return {data: jsonData, units: avail_datas};
      }


      else if (keyword === "couple-constant" || keyword === "compressive-poissons-ratio" || keyword === "tensile-poissons-ratio"){

        const avail_datas = [{keyword: null}]
        
        


        return {data: jsonData, units: avail_datas};
      }
    }




  


  export default convertData;