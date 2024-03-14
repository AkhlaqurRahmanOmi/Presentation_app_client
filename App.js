import React, {createContext, useContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/routes';
export const MyContext = createContext();

const App = () => {
  const [initialValue, setInitialValue] = useState(null);
  return (
    <SafeAreaProvider>
      <MyContext.Provider value={{initialValue, setInitialValue}}>
        <Router />
      </MyContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
