import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, type } = route.params;

  const handleContact = () => {
    const contactInfo = item.contactInfo;
    
    // Check if it's an email or phone number
    if (contactInfo.includes('@')) {
      // Email
      Linking.openURL(`mailto:${contactInfo}`)
        .catch(() => Alert.alert('Error', 'Could not open email app'));
    } else {
      // Phone number
      const phoneNumber = contactInfo.replace(/[^\d+]/g, ''); // Clean phone number
      Linking.openURL(`tel:${phoneNumber}`)
        .catch(() => Alert.alert('Error', 'Could not open phone app'));
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'LOST':
        return '#FF6B6B';
      case 'FOUND':
        return '#4ECDC4';
      case 'RETURNED':
        return '#45B7D1';
      case 'CLAIMED':
        return '#96CEB4';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: type === 'lost' ? '#FF6B6B' : '#4ECDC4' }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="location" size={20} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{item.location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="calendar" size={20} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Date {type === 'lost' ? 'Lost' : 'Found'}
              </Text>
              <Text style={styles.detailValue}>
                {formatDate(type === 'lost' ? item.dateLost : item.dateFound)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time" size={20} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Posted</Text>
              <Text style={styles.detailValue}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="pricetag" size={20} color="#007AFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Ionicons 
                name={item.contactInfo.includes('@') ? 'mail' : 'call'} 
                size={24} 
                color="#007AFF" 
              />
              <Text style={styles.contactText}>{item.contactInfo}</Text>
            </View>
            <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
              <Text style={styles.contactButtonText}>Contact</Text>
              <Ionicons name="chevron-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Images Section (placeholder for future implementation) */}
        {item.imageUrls && item.imageUrls.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Images</Text>
            <View style={styles.imagesPlaceholder}>
              <Ionicons name="images" size={48} color="#ccc" />
              <Text style={styles.imagesPlaceholderText}>
                {item.imageUrls.length} image(s) available
              </Text>
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipRow}>
              <Ionicons name="shield-checkmark" size={16} color="#4ECDC4" />
              <Text style={styles.tipText}>
                Meet in a public place when exchanging items
              </Text>
            </View>
            <View style={styles.tipRow}>
              <Ionicons name="people" size={16} color="#4ECDC4" />
              <Text style={styles.tipText}>
                Bring a friend if possible
              </Text>
            </View>
            <View style={styles.tipRow}>
              <Ionicons name="eye" size={16} color="#4ECDC4" />
              <Text style={styles.tipText}>
                Verify the item matches the description
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  detailIcon: {
    width: 40,
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  contactCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  imagesPlaceholder: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 10,
    alignItems: 'center',
  },
  imagesPlaceholderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  tipsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
});

