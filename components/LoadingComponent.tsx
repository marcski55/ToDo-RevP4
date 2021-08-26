import React from 'react';
import { Image, View } from 'react-native';

// loading component... for when things are... loading (displays a spinner)
const LoadingComponent: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: '50%' }}>
      <Image source={require('../assets/preloader.gif')} resizeMode='contain' />
    </View>
  );
};

export default LoadingComponent;
