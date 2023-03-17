
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "../Styles/Contact.css";
import Logo from '../Assets/Metamaterial_genome_bird_Logo.png';
import olly from '../Assets/Olly_img.jpg'

const TeamMember = (props) => {
    return (
        <div className="team-member">
          <img src={props.picture} alt="BROKEN PROP" />
          <h3>{props.name}</h3>
          <p>{props.role}</p>
          <div className="social-media">
            {props.social.map((social, index) => (
              <a href={social.url} key={index}>
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      );
    };

const Contact = () => {
  const team = [
    {
        
        name: 'Stefan Szyniszewski',
      role: 'Project Lead',
      picture: Logo,
      
      social: [
        { name: 'LinkedIn', url: 'https://', icon: faLinkedin },
        { name: 'Twitter', url: 'https://', icon: faTwitter },
      ],
    },
    {
      name: 'Oliver Duncan',
      role: 'MetaMaterials expert',
      picture: olly,
      social: [
        { name: 'LinkedIn', url: 'https:', icon: faLinkedin },
        { name: 'Twitter', url: 'https:', icon: faTwitter },
      ],
    },
    {
        name: 'Lukasz Kaczmarczyk',
        role: 'Finite Element Expert',
        picture: Logo,
        social: [
          { name: 'LinkedIn', url: 'https://linkedin.com/janedoe', icon: faLinkedin },
          { name: 'Twitter', url: 'https://twitter.com/janedoe', icon: faTwitter },
        ],
      },
      
  ];

  return (
    <div className="team-page">
      
      <div className="about-us-container">
      <h2 className="about-us-title">About Us</h2>
      <p className="about-us-text">
      The current leadership team includes Dr Stefan Szyniszewski, Dr Oliver Duncan, Dr Lukasz Kaczmarczyk 
      and Prof Fabrizio Scarpa. We met through the UK MetaMaterials Network, and based on shared interests 
      and complementary backgrounds, we have been planning and working on the meta-genome project since 2021. 
      The project has been implemented and brilliantly executed by Dr Jacob Earnshaw, Jordan Byers and Nicholas 
      Syrotiouk.
      </p>
    </div>
      <div className="team-list">
        {team.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};




export default Contact;


// function Contact () {
//     return (
//         <p>Contact</p>
//     );
//   }
  
//   export default Contact;