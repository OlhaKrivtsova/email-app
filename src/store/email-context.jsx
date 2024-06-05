import {createContext, useState} from 'react';

const initialPageNumber = 1;
const initialAmountOfRecordsOnPage = 10;

const EmailContext = createContext({
  isFormSEmailVisible: false,
  shouldRefreshEmails: 1,
  emailLimitOnPage: initialAmountOfRecordsOnPage,
  pageNumber: initialPageNumber,
  formEmailVisibleHandler() {},
  refreshEmails() {},
  setEmailLimitOnPage() {},
  setPageNumber() {},
});

export const EmailContextProvider = props => {
  const [isFormEmailVisible, setIsFormEmailVisible] = useState(false);
  const [shouldRefreshEmails, setShouldRefreshEmails] = useState(1);
  const [emailLimitOnPage, setEmailLimitOnPage] = useState(
    initialAmountOfRecordsOnPage
  );

  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const formEmailVisibleHandler = () => {
    setIsFormEmailVisible(prev => !prev);
  };

  const refreshEmails = () => {
    setShouldRefreshEmails(prev => -prev);
  };

  return (
    <EmailContext.Provider
      value={{
        isFormEmailVisible,
        shouldRefreshEmails,
        emailLimitOnPage,
        pageNumber,
        formEmailVisibleHandler,
        refreshEmails,
        setEmailLimitOnPage,
        setPageNumber,
      }}
    >
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
