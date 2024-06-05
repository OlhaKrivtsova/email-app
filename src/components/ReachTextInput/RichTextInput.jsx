import styles from './RichTextInput.module.css';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {Editor} from 'primereact/editor';
import {useState} from 'react';

const RichTextInput = props => {
  const [value, setValue] = useState('');

  const textChangValue = e => {
    setValue(e.htmlValue);
    props.setMessageValue(e.htmlValue ?? '');
  };

  const outFocus = () => {
    props.setIsMessageInputTouched(true);
  };

  return (
    <div className={styles['div-input']}>
      <Editor
        value={value}
        onTextChange={textChangValue}
        onBlur={outFocus}
        className={styles.input}
      />
    </div>
  );
};

export default RichTextInput;
