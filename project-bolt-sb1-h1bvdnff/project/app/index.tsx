import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { AppState } from 'react-native';

export default function IndexPage() {
  useEffect(() => {
    // Simulate app startup tracking
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Redirect to the main tab layout
  return <Redirect href="/(auth)/login" />;
}