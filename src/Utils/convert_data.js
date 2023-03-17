function convertBulkDensity(json, keyword, unit) {
    if( keyword === "bulk-density"){
    const conversionFactor = {
      "kg/m^3": 1,
      "g/m^3": 0.001,
      "kg/cm^3": 1000000,
      "g/cm^3": 1000,
    };
  
    const convertedJson = json.map((entry) => {
      const bulkDensity = entry["bulk-density"][0]["values"]["bulk-density"];
      const originalUnit = entry["bulk-density"][1]["units"];
  
      let convertedValue;
      let convertedUnit;
  
      if (originalUnit === "g/cm^3") {
        convertedValue = bulkDensity / 1000;
        convertedUnit = "kg/m^3";
      } else {
        convertedValue = bulkDensity;
        convertedUnit = originalUnit;
      }
  
      const conversionFactorRatio =
        conversionFactor[unit] / conversionFactor[convertedUnit];
  
      return {
        ...entry,
        "bulk-density": [
          {
            values: {
              "bulk-density": convertedValue * conversionFactorRatio,
            },
          },
          { units: unit },
        ],
      };
    });
  
    return convertedJson;
  }}
  
  


  export default convertBulkDensity;