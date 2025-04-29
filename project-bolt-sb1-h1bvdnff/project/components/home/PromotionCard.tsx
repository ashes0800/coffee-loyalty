import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type PromotionCardProps = {
  title: string;
  description: string;
  imageUri: string;
  buttonText: string;
  onPress: () => void;
  validUntil?: string;
};

export function PromotionCard({
  title,
  description,
  imageUri,
  buttonText,
  onPress,
  validUntil,
}: PromotionCardProps) {
  const { width } = Dimensions.get('window');
  const imageHeight = Math.min(width * 0.4, 180);
  
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {validUntil && (
            <Text style={styles.validity}>Valid until {validUntil}</Text>
          )}
          <Button
            title={buttonText}
            onPress={onPress}
            size="sm"
            style={styles.button}
          />
        </View>
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 0,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  validity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
  },
  image: {
    width: '35%',
    backgroundColor: '#f3f3f3',
  },
});