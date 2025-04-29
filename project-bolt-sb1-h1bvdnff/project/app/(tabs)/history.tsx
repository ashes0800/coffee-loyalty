import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, MapPin, CreditCard, Coffee, ChevronRight } from 'lucide-react-native';

// Mock transaction data
const MOCK_TRANSACTIONS = [
  {
    id: '1',
    date: '2023-10-15',
    store: 'Central Mall',
    items: [
      { name: 'Caramel Macchiato', size: 'Grande', options: 'Extra shot', price: 42 },
      { name: 'Chocolate Croissant', price: 28 },
    ],
    total: 70,
    points: 70,
    paymentMethod: 'Credit Card',
    imageUri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  },
  {
    id: '2',
    date: '2023-10-10',
    store: 'Times Square',
    items: [
      { name: 'Cold Brew', size: 'Venti', price: 38 },
    ],
    total: 38,
    points: 38,
    paymentMethod: 'Mobile Payment',
    imageUri: 'https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg',
  },
  {
    id: '3',
    date: '2023-10-05',
    store: 'Harbour City',
    items: [
      { name: 'Cappuccino', size: 'Tall', price: 32 },
      { name: 'Blueberry Muffin', price: 24 },
    ],
    total: 56,
    points: 56,
    paymentMethod: 'Credit Card',
    imageUri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  },
  {
    id: '4',
    date: '2023-10-01',
    store: 'Festival Walk',
    items: [
      { name: 'Iced Green Tea Latte', size: 'Grande', price: 36 },
    ],
    total: 36,
    points: 36,
    paymentMethod: 'Mobile Payment',
    imageUri: 'https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg',
  },
  {
    id: '5',
    date: '2023-09-28',
    store: 'Central Mall',
    items: [
      { name: 'Mocha Frappuccino', size: 'Venti', options: 'No whip', price: 48 },
      { name: 'Almond Croissant', price: 30 },
    ],
    total: 78,
    points: 78,
    paymentMethod: 'Credit Card',
    imageUri: 'https://images.pexels.com/photos/7281931/pexels-photo-7281931.jpeg',
  },
];

// Group transactions by month
const groupTransactionsByMonth = (transactions) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(transaction);
  });
  
  return Object.entries(grouped).map(([month, transactions]) => ({
    month,
    data: transactions,
  }));
};

export default function HistoryScreen() {
  const { user } = useAuth();
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const groupedTransactions = groupTransactionsByMonth(MOCK_TRANSACTIONS);

  const toggleExpand = (transactionId: string) => {
    if (expandedTransaction === transactionId) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(transactionId);
    }
  };

  const renderTransaction = ({ item }) => {
    const isExpanded = expandedTransaction === item.id;
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    return (
      <Card style={styles.transactionCard}>
        <TouchableOpacity 
          style={styles.transactionHeader}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.transactionInfo}>
            <View style={styles.dateContainer}>
              <Calendar size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View style={styles.storeContainer}>
              <MapPin size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.store}>{item.store}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.total}</Text>
            <ChevronRight 
              size={18} 
              color="#666" 
              style={[
                styles.expandIcon,
                isExpanded && styles.expandIconRotated
              ]} 
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />
            
            <View style={styles.itemList}>
              {item.items.map((orderItem, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.orderItemDetails}>
                    <Text style={styles.itemName}>
                      {orderItem.name}
                      {orderItem.size && ` (${orderItem.size})`}
                    </Text>
                    {orderItem.options && (
                      <Text style={styles.itemOptions}>{orderItem.options}</Text>
                    )}
                  </View>
                  <Text style={styles.itemPrice}>${orderItem.price}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.transactionFooter}>
              <View style={styles.footerItem}>
                <CreditCard size={16} color="#666" style={styles.footerIcon} />
                <Text style={styles.footerText}>{item.paymentMethod}</Text>
              </View>
              <View style={styles.footerItem}>
                <Star size={16} color="#D4AF37" style={styles.footerIcon} fill="#D4AF37" />
                <Text style={styles.footerText}>{item.points} Stars earned</Text>
              </View>
              <View style={styles.footerItem}>
                <Clock size={16} color="#666" style={styles.footerIcon} />
                <Text style={styles.footerText}>
                  {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.reorderButton}>
              <Coffee size={16} color="#FFF" style={styles.reorderIcon} />
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  };

  const renderMonthHeader = ({ section }) => (
    <View style={styles.monthHeader}>
      <Text style={styles.monthText}>{section.month}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Purchase History</Text>
      </View>

      <FlatList
        data={groupedTransactions}
        keyExtractor={(item) => item.month}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View>
            <View style={styles.monthHeader}>
              <Text style={styles.monthText}>{item.month}</Text>
            </View>
            {item.data.map(transaction => renderTransaction({ item: transaction }))}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No purchases yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  monthHeader: {
    marginBottom: 12,
    marginTop: 8,
  },
  monthText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E3932',
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 6,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E3932',
  },
  store: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginRight: 8,
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f1f1',
    marginVertical: 12,
  },
  itemList: {
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
  },
  itemOptions: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E3932',
  },
  transactionFooter: {
    marginBottom: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerIcon: {
    marginRight: 8,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  reorderButton: {
    backgroundColor: '#00704A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  reorderIcon: {
    marginRight: 8,
  },
  reorderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
});