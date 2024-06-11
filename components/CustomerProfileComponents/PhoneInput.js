import React from 'react';
import {TextInput} from 'react-native';

const PhoneInput = ({prefix, value, onChangeText, ...rest}) => {
  return (
    <TextInput
      style={{borderWidth: 1, borderColor: 'black', padding: 8}}
      value={value}
      onChangeText={onChangeText}
      {...rest}
      render={({value}) => (
        <>
          {prefix}
          <TextInput
            style={{flex: 1}}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
        </>
      )}
    />
  );
};

export default PhoneInput;
