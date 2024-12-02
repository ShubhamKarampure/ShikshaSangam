import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [about, setAbout] = useState('');

  return (
    <SettingsContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        userName,
        setUserName,
        dateOfBirth,
        setDateOfBirth,
        phoneNo,
        setPhoneNo,
        emailAddress,
        setEmailAddress,
        about,
        setAbout,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
