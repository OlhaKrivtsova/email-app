import {createContext, useEffect, useState} from 'react';

const initialPageNumber = 1;
const initialAmountOfRecordsOnPage = 4;

const EmailContext = createContext({
  isFormSEmailVisible: false,
  shouldRefreshEmails: true,
  emailLimitOnPage: initialAmountOfRecordsOnPage,
  totalAmountOfEmails: 0,
  formEmailVisibleHandler() {},
  setShouldRefreshEmails() {},
  setEmailLimitOnPage() {},
  setTotalAmountOfEmails() {},
});

export const EmailContextProvider = props => {
  const [isFormEmailVisible, setIsFormEmailVisible] = useState(false);
  const [shouldRefreshEmails, setShouldRefreshEmails] = useState(true);
  const [emailLimitOnPage, setEmailLimitOnPage] = useState(
    initialAmountOfRecordsOnPage
  );
  const [totalAmountOfEmails, setTotalAmountOfEmails] = useState(0);

  const formEmailVisibleHandler = () => {
    setIsFormEmailVisible(prev => !prev);
  };

  return (
    <EmailContext.Provider
      value={{
        isFormEmailVisible,
        shouldRefreshEmails,
        emailLimitOnPage,
        totalAmountOfEmails,
        formEmailVisibleHandler,
        setShouldRefreshEmails,
        setEmailLimitOnPage,
        setTotalAmountOfEmails,
      }}
    >
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
