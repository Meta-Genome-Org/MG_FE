import { useState } from 'react';
import './Dropdown.css'

const Dropdown = ({ open, menu, optionOnClick, labelText }) => {

    const [dropDownOpen, setDropDownOpen] = useState(false);


    return (
      <div className="dropdown">
        <p onClick={()=>{setDropDownOpen(!dropDownOpen)}} style={{width: '152px', height: '25px' ,textAlign: 'center', color: 'white', marginTop: '3px', marginBottom: '3px'}}>{labelText}</p>
        {dropDownOpen ? (
          <ul className="menu">
            {menu.map((menuItem, index) => (
              <li onClick={()=>{
                optionOnClick(menuItem.keyword);
                setDropDownOpen(false);
            }}  key={index} className="menu-item">{menuItem.keyword}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };

  export default Dropdown;