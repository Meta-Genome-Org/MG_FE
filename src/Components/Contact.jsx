
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faOrcid, faUser } from '@fortawesome/free-brands-svg-icons';
import "../Styles/Contact.css";
import Logo from '../Assets/Meta-Genome-Logo.svg';
import olly from '../Assets/Olly_img.jpg'
import nick from '../Assets/Syrotiuk_square.png'
import jordan from '../Assets/Jordan.png'
import stefan from '../Assets/Stefan1.jpg'
import fabrizio from '../Assets/Fabrizio.jpg'
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
      picture: stefan,
      
      social: [
        { name: 'LinkedIn', url: 'https://orcid.org/0000-0002-7862-8506', icon: faOrcid },
        { name: 'Twitter', url: 'https://twitter.com/stefanszynisz?lang=en', icon: faTwitter },
        {name: 'orcid', url: 'https://www.linkedin.com/in/stefan-szyniszewski/?originalSubdomain=uk', icon: faLinkedin}
      ],
    },
    {
      name: 'Oliver Duncan',
      role: 'Meta-Materials expert',
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
          { name: 'LinkedIn', url: '', icon: faLinkedin },
          { name: 'Twitter', url: '', icon: faTwitter },
        ],
      },
      {
        name: 'Fabrizio Scarpa',
        role: 'Meta-Materials Expert',
        picture: fabrizio,
        social: [
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/fabrizio-scarpa-36538514/', icon: faLinkedin },
          { name: 'Twitter', url: 'https://twitter.com/flago2009', icon: faTwitter },
          { name : 'Orcid', url: 'https://orcid.org/0000-0002-5470-4834', icon: faOrcid}
        ],
      },
      {
        name: 'Nicholas Syrotiuk',
        role: 'Database expert',
        picture: nick,
        social: [
          { name: 'LinkedIn', url: 'https://orcid.org/0000-0002-7367-4976', icon: faOrcid },
          { name: 'Twitter', url: 'https://twitter.com/DurhamRdm', icon: faTwitter },
        ],
      },
      {
        name: 'Jordan Byers',
        role: 'Finite Element Expert',
        picture: jordan,
        social: [
          { name: 'LinkedIn', url: '', icon: faLinkedin },
          { name: 'Twitter', url: '', icon: faTwitter },
        ],
      },
      {
        name: 'Jacob Earnshaw',
        role: 'Postdoc Researcher',
        picture: Logo,
        social: [
          { name: 'LinkedIn', url: '', icon: faLinkedin },
          { name: 'Twitter', url: '', icon: faTwitter },
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
      and complementary backgrounds.<p/>
      
      We have been planning and working on the meta-genome project since 2021. 
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