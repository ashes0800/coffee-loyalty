import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Search, MapPin, Phone, Clock, ChevronDown } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';

// Mock store data
const STORE_DATA = [
  {
    id: '1',
    name: 'Central Mall',
    address: '88 Queens Road, Central',
    phone: '+852 1234 5678',
    hours: '7:00 AM - 10:00 PM',
    distance: '0.3',
    imageUrl: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
    features: ['Drive-Thru', 'Mobile Order', 'Wifi'],
  },
  {
    id: '2',
    name: 'Times Square',
    address: '1 Matheson Street, Causeway Bay',
    phone: '+852 2345 6789',
    hours: '7:30 AM - 11:00 PM',
    distance: '1.2',
    imageUrl: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    features: ['Reserve Bar', 'Mobile Order', 'Wifi'],
  },
  {
    id: '3',
    name: 'Harbour City',
    address: '3-27 Canton Road, Tsim Sha Tsui',
    phone: '+852 3456 7890',
    hours: '8:00 AM - 10:30 PM',
    distance: '2.5',
    imageUrl: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    features: ['Mobile Order', 'Wifi'],
  },
  {
    id: '4',
    name: 'Festival Walk',
    address: '80 Tat Chee Avenue, Kowloon Tong',
    phone: '+852 4567 8901',
    hours: '7:00 AM - 10:00 PM',
    distance: '4.8',
    imageUrl: 'https://images.pexels.com/photos/1413653/pexels-photo-1413653.jpeg',
    features: ['Drive-Thru', 'Mobile Order', 'Wifi'],
  },
];

export default function StoresScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(STORE_DATA);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('nearest');
  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStores(STORE_DATA);
      return;
    }

    setLoading(true);
    // Simulate search delay
    const timer = setTimeout(() => {
      const results = STORE_DATA.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStores(results);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const renderStoreItem = ({ item }) => (
    <Card style={styles.storeCard}>
      <View style={styles.storeImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.storeImage} />
        <View style={styles.distanceTag}>
          <Text style={styles.distanceText}>{item.distance} km</Text>
        </View>
      </View>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{item.name}</Text>
        <View style={styles.storeDetail}>
          <MapPin size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
        <View style={styles.storeDetail}>
          <Phone size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
        <View style={styles.storeDetail}>
          <Clock size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.hours}</Text>
        </View>
        <View style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Store</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location or store"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && loading && (
            <ActivityIndicator size="small" color="#00704A" />
          )}
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Nearest</Text>
            <ChevronDown size={16} color="#00704A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>All Features</Text>
            <ChevronDown size={16} color="#00704A" />
          </TouchableOpacity>
        </View>
      </View>

      {filteredStores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No stores found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStores}
          keyExtractor={(item) => item.id}
          renderItem={renderStoreItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E3932',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#00704A',
    marginRight: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
  },
  storeCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  storeImageContainer: {
    position: 'relative',
  },
  storeImage: {
    width: '100%',
    height: 150,
  },
  distanceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'white',
  },
  storeInfo: {
    padding: 16,
  },
  storeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E3932',
    marginBottom: 8,
  },
  storeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  featureTag: {
    backgroundColor: '#E7EEEC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#00704A',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#999',
  },
});