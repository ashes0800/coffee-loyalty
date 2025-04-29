import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import QRCode from 'react-native-qrcode-svg';
import { Card } from '@/components/ui/Card';
import { User, ChevronRight } from 'lucide-react-native';

export function MembershipCard() {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = new Animated.Value(0);
  const { width } = Dimensions.get('window');
  
  const cardWidth = Math.min(width - 48, 380);

  const frontOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0]
  });

  const backOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  });

  const frontTransform = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const backTransform = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  if (!user) return null;

  return (
    <Pressable onPress={flipCard} style={[styles.container, { width: cardWidth }]}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        {/* Front of card */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: frontOpacity,
              transform: [{ rotateY: frontTransform }],
              width: cardWidth,
            }
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.levelCircle}>
              <User size={24} color="#1E3932" />
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{user.name}</Text>
              <Text style={styles.memberLevel}>{user.level} Member</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Stars</Text>
              <Text style={styles.pointsValue}>{user.points}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.barcode}>
              <QRCode
                value={`MEMBER-${user.id}`}
                size={120}
                color="#1E3932"
                backgroundColor="white"
              />
            </View>
            <Text style={styles.barcodeText}>Tap to flip</Text>
          </View>
        </Animated.View>

        {/* Back of card */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              opacity: backOpacity,
              transform: [{ rotateY: backTransform }],
              position: 'absolute',
              width: cardWidth,
            }
          ]}
        >
          <View style={styles.cardBackHeader}>
            <Text style={styles.cardBackTitle}>Membership Details</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Member Since</Text>
              <Text style={styles.detailValue}>{user.memberSince}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Points to Next Level</Text>
              <Text style={styles.detailValue}>270</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Current Benefits</Text>
              <ChevronRight size={18} color="#1E3932" />
            </View>
          </View>
          <Text style={styles.barcodeText}>Tap to return</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 16,
    height: 220,
  },
  cardContainer: {
    height: 220,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E7EEEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },
  memberName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
  },
  memberLevel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#00704A',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  pointsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#00704A',
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcode: {
    marginBottom: 10,
  },
  barcodeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  cardBackHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 12,
    marginBottom: 12,
  },
  cardBackTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
  },
  detailsContainer: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  detailLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E3932',
  },
  detailValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
});