import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { MembershipCard } from '@/components/home/MembershipCard';
import { PromotionCard } from '@/components/home/PromotionCard';
import { Card } from '@/components/ui/Card';
import { Bell, Coffee } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(2);

  const promos = [
    {
      id: '1',
      title: 'Buy One Get One',
      description: 'Enjoy a complimentary drink when you buy one.',
      imageUri: 'https://images.pexels.com/photos/6956452/pexels-photo-6956452.jpeg',
      buttonText: 'Claim Now',
      validUntil: 'Oct 30, 2025',
    },
    {
      id: '2',
      title: 'Birthday Month Special',
      description: 'Double stars on all purchases during your birthday month.',
      imageUri: 'https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg',
      buttonText: 'Learn More',
      validUntil: 'Dec 31, 2025',
    },
    {
      id: '3',
      title: 'New Seasonal Drinks',
      description: 'Try our limited edition autumn collection.',
      imageUri: 'https://images.pexels.com/photos/129207/pexels-photo-129207.jpeg',
      buttonText: 'See Menu',
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handlePromoPress = (id: string) => {
    console.log(`Promo ${id} pressed`);
    // Navigation logic here
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.username}>{user.name}</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1E3932" />
            {notifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <MembershipCard />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationsContainer}
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.recommendationItem}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' }}
                  style={styles.recommendationImage}
                />
                <Text style={styles.recommendationTitle}>Caramel Latte</Text>
                <Text style={styles.recommendationPrice}>$4.95</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          {promos.map((promo) => (
            <PromotionCard
              key={promo.id}
              title={promo.title}
              description={promo.description}
              imageUri={promo.imageUri}
              buttonText={promo.buttonText}
              validUntil={promo.validUntil}
              onPress={() => handlePromoPress(promo.id)}
            />
          ))}
        </View>

        <Card style={styles.quickAccessCard}>
          <Text style={styles.quickAccessTitle}>Quick Access</Text>
          <View style={styles.quickAccessItems}>
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.quickAccessIconContainer}>
                <Coffee size={20} color="#00704A" />
              </View>
              <Text style={styles.quickAccessText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.quickAccessIconContainer}>
                <Image
                  source={{ uri: 'https://www.starbucks.com.hk/resources/img/icon-card.png' }}
                  style={styles.quickAccessIcon}
                />
              </View>
              <Text style={styles.quickAccessText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.quickAccessIconContainer}>
                <Image
                  source={{ uri: 'https://www.starbucks.com.hk/resources/img/icon-order.png' }}
                  style={styles.quickAccessIcon}
                />
              </View>
              <Text style={styles.quickAccessText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.quickAccessIconContainer}>
                <Image
                  source={{ uri: 'https://www.starbucks.com.hk/resources/img/icon-gift.png' }}
                  style={styles.quickAccessIcon}
                />
              </View>
              <Text style={styles.quickAccessText}>Gift</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginLeft: 6,
    flex: 1,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e53935',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E3932',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  recommendationsContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  recommendationItem: {
    width: 140,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendationImage: {
    width: '100%',
    height: 140,
  },
  recommendationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E3932',
    marginTop: 8,
    marginHorizontal: 8,
  },
  recommendationPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#00704A',
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  quickAccessCard: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  quickAccessTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginBottom: 16,
  },
  quickAccessItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    alignItems: 'center',
  },
  quickAccessIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessIcon: {
    width: 24,
    height: 24,
  },
  quickAccessText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666',
  },
  footer: {
    height: 20,
  },
});