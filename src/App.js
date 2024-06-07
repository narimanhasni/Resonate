import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faBuilding, faXmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts(sortedContacts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={`App ${theme}`}>
      <nav className={`navbar ${theme}`}>
        <h1>Contacts</h1>
        <button className="theme-switcher" onClick={toggleTheme}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearch}
          className={`search-input ${theme}`}
        />
      </div>
      <div className={`container ${theme}`}>
        {filteredContacts.map((contact) => (
          <div className={`individual-contact ${theme}`} key={contact.id}>
            <div className="contact-container">
              <figure className="contact-img-wrapper">
                <img src={`https://i.pravatar.cc/150?u=${contact.id}`} alt={contact.name} className="contact-img"/>
              </figure>
              <h2 className={`contact-name ${theme}`}>{contact.name}</h2>
            </div>
            <div id="contact-info" className={theme}>
              <div id="contact-email__container">
                <FontAwesomeIcon icon={faEnvelope} /> <h4 className={`contact-email ${theme}`}>{contact.email}</h4>
              </div>
              <div className="contact-address__container">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> <h4 className={`contact-address ${theme}`}>{contact.address.street}, {contact.address.city}, {contact.address.zipcode}</h4>
              </div>
              <div className="contact-phone__container">
                <FontAwesomeIcon icon={faPhone} /> <h4 className={`contact-phone ${theme}`}>{contact.phone}</h4>
              </div>
              <div className="contact-company__container">
                <FontAwesomeIcon icon={faBuilding} /> <h4 className={`contact-company ${theme}`}>{contact.company.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
