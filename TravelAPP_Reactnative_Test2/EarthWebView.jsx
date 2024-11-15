import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, SafeAreaView, Text, ActivityIndicator } from 'react-native';

const GlobeView = () => {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="35%" color="#145a32" />
          <Text style={styles.loadingText}>Working THE MAGIC...</Text>
        </View>
      )}
      <WebView 
        source={{ uri: 'https://sandbox.openglobus.org/examples/baseLayers/baseLayers.html' }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}  
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  
  },
  loadingText: {
    fontSize: 20,
    color: 'green',
    textShadowColor: '#145a32',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1, 
  },
});

export default GlobeView;
