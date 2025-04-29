import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Settings, LogOut, CreditCard, Gift, Bell, Shield, CircleHelp as HelpCircle, ChevronRight, MapPin, MessageSquare } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: logout,
          style: 'destructive',
        },
      ]
    );
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#1E3932" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#1E3932" />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
          </View>
        </View>

        <Card style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Personal Information</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <CreditCard size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Payment Methods</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Gift size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Gift Cards</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MapPin size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Saved Addresses</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
        </Card>

        <Card style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#d1d1d1', true: '#A3C9B8' }}
              thumbColor={notificationsEnabled ? '#00704A' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Privacy Settings</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MessageSquare size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Language</Text>
            <View style={styles.menuItemValue}>
              <Text style={styles.menuItemValueText}>English</Text>
              <ChevronRight size={18} color="#999" />
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Help Center</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MessageSquare size={20} color="#00704A" />
            </View>
            <Text style={styles.menuItemText}>Contact Us</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
        </Card>

        <View style={styles.logoutContainer}>
          <Button
            title="Log Out"
            onPress={handleLogout}
            variant="secondary"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Coffee Rewards</Text>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E3932',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E7EEEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#00704A',
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E3932',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  accountSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  preferencesSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  supportSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E3932',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  menuItemValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValueText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999',
    marginRight: 4,
  },
  logoutContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  logoutButton: {
    backgroundColor: '#f8e7e7',
  },
  logoutButtonText: {
    color: '#e53935',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingBottom: 16,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  copyrightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
});