function swapData(swapData, keyword, desiredUnit, axis, axisUnit){
  
  console.log(axis)

  if (keyword === "tensile-modulus" || keyword === "compressive-modulus" || 
    keyword === "yield-strength" || keyword === "ultimate-yield-strength"){

      const conversionFactors = [{
        KPa : {KPa: 1, MPa: 0.001, GPa: 0.000001},
        MPa : {KPa: 1000, MPa: 1, GPa: 1000000},
        GPa : {KPa: 1000000, MPa: 1000, GPa: 1}
    }];

    for (let i = 0; i < swapData.length; i++) {

      const givenUnit = swapData[i][axisUnit]
      const conversionValue = conversionFactors[0][givenUnit][desiredUnit]
      swapData[i][axis] = swapData[i][axis] * conversionValue

    }
    console.log(swapData)
    return swapData
  }

  
  else if( keyword === "bulk-density"){
    const conversionFactors = [{
      'kg/m\u00b3' : {'kg/m\u00b3': 1, 'g/cm\u00b3': 0.001},
      'g/cm\u00b3' : {'kg/m\u00b3': 1000, 'g/cm\u00b3': 1}
  }];
  console.log(keyword, desiredUnit)
  console.log("PROCKKKK")
  for (let i = 0; i < swapData.length; i++) {
    console.log(swapData[i])
    const givenUnit = swapData[i][axisUnit]
    console.log("UNTIS")
    console.log(givenUnit)
    console.log(desiredUnit)
    const conversionValue = conversionFactors[0][givenUnit][desiredUnit]
    console.log(conversionValue)
    swapData[i][axis] = swapData[i][axis] * conversionValue
    swapData[i][axisUnit] = desiredUnit
  }
  
    return swapData;
  }

  
}

export default swapData;