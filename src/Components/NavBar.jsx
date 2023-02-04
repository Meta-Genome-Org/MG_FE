import { Link } from 'react-router-dom';
import Logo from '../Assets/Metamaterial_genome_bird_Logo.png' ;

function NavBar () {
  return (
    <>
    <div style={{backgroundColor: 'white', height: "80px", width: '100%', marginTop: '0px',display: "flex", }}>
      
      <div style={{width: '40%', height: '100%'}}>
        <img alt='logo' src={Logo} height={"80px"} width={"80px"}/>
      </div>

    
      
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '60%'}}>
        <Link to="/Home" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          Home
        </Link>
        <Link to="/About" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          About
        </Link>
        <Link to="/Contact" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          Contact
        </Link>
        <Link to="/Tutorial" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          Tutorial
        </Link>
        <Link to="/Contribute" style={{textAlign: 'center', margin: '0', color: 'black', textDecoration: 'none'}}>
          Contribute
        </Link>
      </div>
    </div>

    </>
  );
}

export default NavBar;
