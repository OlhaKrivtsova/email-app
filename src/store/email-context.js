import {createContext, useState} from 'react';

const initialPageNumber = 1;
const initialAmountOfRecordsOnPage = 4;

const EmailContext = createContext({
  isFormSEmailVisible: false,
  shouldRefreshEmails: 1,
  emailLimitOnPage: initialAmountOfRecordsOnPage,
  totalAmountOfEmails: 0,
  pageNumber: initialPageNumber,
  formEmailVisibleHandler() {},
  refreshEmails() {},
  setEmailLimitOnPage() {},
  setTotalAmountOfEmails() {},
  setPageNumber() {},
});

export const EmailContextProvider = props => {
  const [isFormEmailVisible, setIsFormEmailVisible] = useState(false);
  const [shouldRefreshEmails, setShouldRefreshEmails] = useState(1);
  const [emailLimitOnPage, setEmailLimitOnPage] = useState(
    initialAmountOfRecordsOnPage
  );
  const [totalAmountOfEmails, setTotalAmountOfEmails] = useState(0);

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
        totalAmountOfEmails,
        pageNumber,
        formEmailVisibleHandler,
        refreshEmails,
        setEmailLimitOnPage,
        setTotalAmountOfEmails,
        setPageNumber,
      }}
    >
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
