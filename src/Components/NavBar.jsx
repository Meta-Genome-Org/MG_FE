import { Link } from 'react-router-dom';
import Logo from '../Assets/meta_gemone_logo_blue.png' ;

const styles = {
  hover: {
    backgroundColor: '#eee'
  }
};


function NavBar () {
  return (
    <>
    <div style={{backgroundColor: 'white', height: "80px", width: '100%', marginTop: '0px',display: "flex", }}>
      
      <div style={{width: '40%', height: '100%'}}>
        <img alt='logo' src={Logo} height={"80px"} width={"160px"}/>
      </div>

    
      
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '60%'}}>
        <Link to="/Home" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none', fontSize: '20px', fontFamily:"Lato"}}>
          Home
        </Link>
        <Link to="http://portal.meta-genome.org/" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none', fontSize: '20px', fontFamily:"Lato"}}>
          Contribute
        </Link>
        <Link to="/Virtual Lab" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none', fontSize: '20px', fontFamily:"Lato"}}>
          Virtual Lab
        </Link>
        <Link to="/Contact us" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none', fontSize: '20px', fontFamily:"Lato" }}>
          Contact us
        </Link>
        {/* <Link to="/Contribute" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          Contribute
        </Link> */}
      </div>
    </div>

    </>
  );
}

export default NavBar;
