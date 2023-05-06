import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';


const AnimatedText = ({ text }) => {
  const position = useRef(new Animated.Value(-900)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(position, {
        toValue: 100,
        duration: 3500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    
      <Animated.View style={{ transform: [{ translateX: position }] }}>
        <Text style={{color:"black"}}>{text}</Text>
      </Animated.View>
    
  );
};

export default AnimatedText;