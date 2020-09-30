import React from 'react';
import ImageCapture from './Screens/ImageCapture';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <ImageCapture />
    </PaperProvider>
  );
};

export default App;
