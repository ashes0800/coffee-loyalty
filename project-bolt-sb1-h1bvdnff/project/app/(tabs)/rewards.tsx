import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { RewardCard } from '@/components/rewards/RewardCard';
import { ProgressBar } from '@/components/rewards/ProgressBar';
import { Card } from '@/components/ui/Card';
import { Star, ChevronRight, Gift, Clock } from 'lucide-react-native';

// Mock rewards data
const AVAILABLE_REWARDS = [
  {
    id: '1',
    name: 'Tall Handcrafted Drink',
    points: 150,
    imageUri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    description: 'Redeem any tall-sized handcrafted beverage of your choice.',
    expiry: 'Dec 31, 2025',
  },
  {
    id: '2',
    name: 'Slice of Cake',
    points: 200,
    imageUri: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    description: 'Enjoy a slice of your favorite cake from our bakery selection.',
    expiry: 'Dec 31, 2025',
  },
  {
    id: '3',
    name: 'Breakfast Set',
    points: 250,
    imageUri: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg',
    description: 'Redeem a breakfast set including a drink and a breakfast sandwich.',
    expiry: 'Dec 31, 2025',
  },
];

// Mock redeemed rewards
const REDEEMED_REWARDS = [
  {
    id: 'r1',
    name: 'Free Espresso Shot',
    dateRedeemed: '2023-10-01',
    expiryDate: '2023-12-31',
    status: 'Active',
  },
  {
    id: 'r2',
    name: 'Tall Latte',
    dateRedeemed: '2023-09-15',
    expiryDate: '2023-11-15',
    status: 'Used',
  },
];

// Tier thresholds
const TIERS = [
  { name: 'Green', threshold: 0, benefits: ['Free birthday drink', 'Free refill on brewed coffee'] },
  { name: 'Gold', threshold: 300, benefits: ['All Green benefits', 'Monthly Double Star Day', 'Free drink every 150 stars'] },
  { name: 'Platinum', threshold: 600, benefits: ['All Gold benefits', 'Free drink customizations', 'Priority customer service'] },
];

type FilterType = 'all' | 'drinks' | 'food' | 'merchandise';

export default function RewardsScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'redeemed'>('available');
  const [filter, setFilter] = useState<FilterType>('all');
  
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentPoints = user.points;
  
  // Determine user's tier
  const userTier = TIERS.reduce((prev, current) => {
    if (currentPoints >= current.threshold) {
      return current;
    }
    return prev;
  }, TIERS[0]);
  
  // Calculate progress to next tier
  const nextTier = TIERS.find(tier => tier.threshold > currentPoints);
  const progress = nextTier 
    ? ((currentPoints - userTier.threshold) / (nextTier.threshold - userTier.threshold)) * 100 
    : 100;
  
  const pointsToNextTier = nextTier ? nextTier.threshold - currentPoints : 0;

  const handleRedeemReward = (rewardId: string) => {
    console.log(`Redeeming reward ${rewardId}`);
    // In a real app, this would call an API to redeem the reward
  };

  const renderFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
        onPress={() => setFilter('all')}
      >
        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'drinks' && styles.filterButtonActive]}
        onPress={() => setFilter('drinks')}
      >
        <Text style={[styles.filterText, filter === 'drinks' && styles.filterTextActive]}>Drinks</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'food' && styles.filterButtonActive]}
        onPress={() => setFilter('food')}
      >
        <Text style={[styles.filterText, filter === 'food' && styles.filterTextActive]}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, filter === 'merchandise' && styles.filterButtonActive]}
        onPress={() => setFilter('merchandise')}
      >
        <Text style={[styles.filterText, filter === 'merchandise' && styles.filterTextActive]}>Merchandise</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderRedeemedRewards = () => (
    <View style={styles.redeemedContainer}>
      {REDEEMED_REWARDS.map(reward => (
        <Card key={reward.id} style={styles.redeemedCard}>
          <View style={styles.redeemedHeader}>
            <View style={styles.redeemedStatus}>
              <View 
                style={[
                  styles.statusDot, 
                  { backgroundColor: reward.status === 'Active' ? '#4CAF50' : '#9E9E9E' }
                ]} 
              />
              <Text 
                style={[
                  styles.statusText, 
                  { color: reward.status === 'Active' ? '#4CAF50' : '#9E9E9E' }
                ]}
              >
                {reward.status}
              </Text>
            </View>
            <TouchableOpacity>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.redeemedContent}>
            <View style={styles.redeemedIconContainer}>
              <Gift size={24} color="#00704A" />
            </View>
            <View style={styles.redeemedInfo}>
              <Text style={styles.redeemedTitle}>{reward.name}</Text>
              <View style={styles.redeemedDates}>
                <Clock size={12} color="#999" style={styles.dateIcon} />
                <Text style={styles.dateText}>
                  Redeemed: {new Date(reward.dateRedeemed).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.redeemedDates}>
                <Clock size={12} color="#999" style={styles.dateIcon} />
                <Text style={styles.dateText}>
                  Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.tierCard}>
          <View style={styles.tierHeader}>
            <View style={styles.tierInfo}>
              <Text style={styles.tierName}>{userTier.name} Level</Text>
              <Text style={styles.pointsText}>{currentPoints} Stars</Text>
            </View>
            <TouchableOpacity style={styles.tierBenefitsButton}>
              <Text style={styles.tierBenefitsText}>Benefits</Text>
              <ChevronRight size={16} color="#00704A" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} />
            
            {nextTier && (
              <View style={styles.nextTierInfo}>
                <Text style={styles.nextTierText}>
                  {pointsToNextTier} more Stars to {nextTier.name} Level
                </Text>
              </View>
            )}
          </View>

          <View style={styles.benefitsList}>
            {userTier.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Star size={16} color="#D4AF37" fill="#D4AF37" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'available' && styles.activeTab]}
            onPress={() => setActiveTab('available')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}
            >
              Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'redeemed' && styles.activeTab]}
            onPress={() => setActiveTab('redeemed')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'redeemed' && styles.activeTabText]}
            >
              Redeemed
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'available' && (
          <>
            {renderFilter()}
            
            {AVAILABLE_REWARDS.map(reward => (
              <RewardCard
                key={reward.id}
                name={reward.name}
                points={reward.points}
                imageUri={reward.imageUri}
                description={reward.description}
                expiry={reward.expiry}
                onPress={() => handleRedeemReward(reward.id)}
              />
            ))}
          </>
        )}

        {activeTab === 'redeemed' && renderRedeemedRewards()}

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
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E3932',
  },
  tierCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E3932',
  },
  pointsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#00704A',
  },
  tierBenefitsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tierBenefitsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#00704A',
    marginRight: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  nextTierInfo: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  nextTierText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#00704A',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#E7EEEC',
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#00704A',
  },
  redeemedContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  redeemedCard: {
    marginBottom: 12,
  },
  redeemedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  redeemedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  redeemedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  redeemedIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E7EEEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  redeemedInfo: {
    flex: 1,
  },
  redeemedTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginBottom: 4,
  },
  redeemedDates: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  footer: {
    height: 80,
  },
});