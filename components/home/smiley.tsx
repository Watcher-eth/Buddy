import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import {
  Canvas,
  Circle,
  LinearGradient,
  RadialGradient,
  vec,
  interpolateColors,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AnimatedSmileyFace = () => {
  // Animation values
  const animationProgress = useSharedValue(0);
  const smileyScale = useSharedValue(1);
  
  // Start animations
  useEffect(() => {
    // Background gradient color animation
    animationProgress.value = withRepeat(
      withTiming(1, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
    
    // Subtle smiley breathing animation
    smileyScale.value = withRepeat(
      withTiming(1.05, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  // Animated gradient colors with transparency for fade effect
  const gradientColors = useDerivedValue(() => {
    const progress = animationProgress.value;
    
    // Color transitions for the background gradient with alpha values for fade
    const color1 = interpolateColors(
      progress,
      [0, 0.33, 0.66, 1],
      ['rgba(255, 182, 193, 0.8)', 'rgba(135, 206, 235, 0.8)', 'rgba(221, 160, 221, 0.8)', 'rgba(255, 228, 181, 0.8)']
    );
    
    const color2 = interpolateColors(
      progress,
      [0, 0.33, 0.66, 1],
      ['rgba(255, 228, 181, 0.6)', 'rgba(255, 182, 193, 0.6)', 'rgba(135, 206, 235, 0.6)', 'rgba(221, 160, 221, 0.6)']
    );
    
    const color3 = interpolateColors(
      progress,
      [0, 0.33, 0.66, 1],
      ['rgba(221, 160, 221, 0.3)', 'rgba(255, 228, 181, 0.3)', 'rgba(255, 182, 193, 0.3)', 'rgba(135, 206, 235, 0.3)']
    );
    
    // Add transparent color at the edge for fade effect
    return [color1, color2, color3, 'rgba(255, 255, 255, 0)'];
  });

  // Convert SharedValue to regular value for Skia transforms
  const scaleTransform = useDerivedValue(() => {
    return [{ scale: smileyScale.value }];
  });

  // Convert SharedValue to regular value for mouth color
  const mouthCoverColor = useDerivedValue(() => {
    return interpolateColors(
      animationProgress.value,
      [0, 0.33, 0.66, 1],
      ['#e0e0e0', '#d0d0d0', '#c0c0c0', '#e0e0e0']
    );
  });

  // Canvas dimensions
  const canvasWidth = screenWidth;
  const canvasHeight = screenHeight * 0.3;
  
  // Smiley face dimensions
  const smileyRadius = Math.min(canvasWidth, canvasHeight +  screenHeight * 0.26) * 0.25;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Eye positions and dimensions
  const eyeRadius = smileyRadius * 0.12;
  const eyeOffsetX = smileyRadius * 0.35;
  const eyeOffsetY = smileyRadius * 0.25;
  
  // Mouth dimensions
  const mouthWidth = smileyRadius * 0.6;
  const mouthHeight = smileyRadius * 0.3;
  const mouthY = centerY + smileyRadius * 0.15;

  return (
    <View style={{   width: canvasWidth,
        height: canvasHeight,
        backgroundColor: 'transparent',
        alignSelf: 'center', }}>
      <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
        {/* Animated Background Gradient - Circular, translucent, and centered beneath smiley */}
        <Circle 
          cx={centerX} 
          cy={centerY} 
          r={smileyRadius * 1.3}
        >
          <RadialGradient
            c={vec(centerX, centerY)}
            r={smileyRadius * 3.3}
            colors={gradientColors}
            positions={[0, 0.4, 0.7, 1]}
          />
        </Circle>
        
        {/* 3D Smiley Face with Radial Gradient */}
        {/* <Circle 
          cx={centerX} 
          cy={centerY} 
          r={smileyRadius}
          transform={[{ scale: smileyScale.value }]}
        >
          <RadialGradient
            c={vec(centerX - smileyRadius * 0.3, centerY - smileyRadius * 0.3)}
            r={smileyRadius * 3}
            colors={['#ffffff', '#e0e0e0', '#808080', '#404040', '#000000']}
            positions={[0, 0.3, 0.6, 0.8, 1]}
          />
        </Circle> */}
        
        {/* Left Eye */}
        {/* <Circle
          cx={centerX - eyeOffsetX}
          cy={centerY - eyeOffsetY}
          r={eyeRadius}
          color="white"
          transform={[{ scale: smileyScale.value }]}
        /> */}
        
        {/* Right Eye */}
        {/* <Circle
          cx={centerX + eyeOffsetX}
          cy={centerY - eyeOffsetY}
          r={eyeRadius}
          color="white"
          transform={[{ scale: smileyScale.value }]}
        /> */}
        
        {/* Mouth - Using arc to create smile */}
        {/* <Circle
          cx={centerX}
          cy={mouthY}
          r={mouthWidth / 2}
          color="rgba(173, 216, 230, 0.8)" // Light blue with transparency
          transform={[{ scale: smileyScale.value }]}
        /> */}
        
        {/* Cover top part of mouth circle to create smile shape */}
        {/* <Circle
          cx={centerX}
          cy={mouthY - mouthHeight / 2}
          r={mouthWidth / 2}
          color={interpolateColors(
            animationProgress.value,
            [0, 0.33, 0.66, 1],
            ['#e0e0e0', '#d0d0d0', '#c0c0c0', '#e0e0e0']
          )}
          transform={[{ scale: smileyScale.value }]}
        /> */}
      </Canvas>
    </View>
  );
};

export default AnimatedSmileyFace;