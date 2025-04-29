import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  animated?: boolean;
  duration?: number;
}

export function ProgressBar({
  progress,
  height = 10,
  backgroundColor = '#f1f1f1',
  fillColor = '#00704A',
  animated = true,
  duration = 1000,
}: ProgressBarProps) {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    // Clamp the progress value between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    
    if (animated) {
      progressValue.value = withTiming(clampedProgress, { duration });
    } else {
      progressValue.value = clampedProgress;
    }
  }, [progress, animated, duration]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View 
        style={[
          styles.progressFill, 
          { backgroundColor: fillColor },
          progressStyle
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '0%',
    borderRadius: 5,
  },
});