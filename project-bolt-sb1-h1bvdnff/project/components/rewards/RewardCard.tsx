import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star, CalendarClock } from 'lucide-react-native';

type RewardCardProps = {
  name: string;
  points: number;
  imageUri: string;
  description: string;
  expiry?: string;
  onPress: () => void;
};

export function RewardCard({
  name,
  points,
  imageUri,
  description,
  expiry,
  onPress,
}: RewardCardProps) {
  return (
    <Card style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        
        {expiry && (
          <View style={styles.expiryContainer}>
            <CalendarClock size={14} color="#999" />
            <Text style={styles.expiryText}>Expires {expiry}</Text>
          </View>
        )}
        
        <View style={styles.footer}>
          <View style={styles.pointsContainer}>
            <Star size={16} color="#D4AF37" fill="#D4AF37" />
            <Text style={styles.pointsText}>{points} Stars</Text>
          </View>
          <Button
            title="Redeem"
            onPress={onPress}
            size="sm"
            variant="primary"
          />
        </View>
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
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#f3f3f3',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E3932',
    marginLeft: 4,
  },
});