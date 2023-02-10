import axios from 'axios';

// const pubInfo = [];

// function getPubIds (mf_id) {

//     axios.post('http://localhost:4000/QueryDataBase', {"SQL" : "SELECT title FROM MetF_References WHERE mf_id = 4;"})
//     .then(res => {
//         pubInfo.push(res.data[0].title)
//     })

// }
// function getPubIds (mf_id) {
//     axios.post('http://localhost:4000/QueryDataBase', { "SQL": "SELECT authors, title, journal, year FROM MetF_References WHERE mf_id = 4;" })
//     .then(response => {
//     const resultList = response.data.map(row => ({
//         authors: row.authors,
//         title: row.title,
//         journal: row.journal,
//         year: row.year
//     }));
//     console.log(resultList);
//     });
//     return resultList
// }

// export default getPubIds;


async function getPubIds(mfid) {
    if (mfid.length !== 0) { // add parentheses here
      try {
        console.log("MF ID");
        console.log(mfid);
        const result = await axios.post("http://localhost:4000/QueryDataBase", {
          SQL: `SELECT authors, title, journal, year FROM MetF_References WHERE mf_id = ${mfid};`
        });
        
        const data = result.data;
        const list = [];
        console.log("DATA");
        console.log(data.response[0]);
  
        return data.reponse[0];
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  
  
  

export default getPubIds;