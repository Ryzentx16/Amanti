import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { SEARCH_ITEMS } from '../apollo/queries';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const { data, loading, error, refetch } = useQuery(SEARCH_ITEMS, {
    variables: { query: searchQuery },
    skip: !searchQuery.trim(),
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetch();
    } else {
      Alert.alert('Search', 'Please enter a search term');
    }
  };

  const renderItemCard = (item, type) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemCard}
      onPress={() => navigation.navigate('ItemDetail', { item, type })}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: type === 'lost' ? '#FF6B6B' : '#4ECDC4' }]}>
          <Text style={styles.statusText}>{type.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemLocation}>📍 {item.location}</Text>
        <Text style={styles.itemDate}>
          {type === 'lost' ? item.dateLost : item.dateFound}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Amanti</Text>
        <Text style={styles.subtitle}>Lost & Found Community</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for lost or found items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Searching...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}

      {data && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          
          {data.searchItems.lostItems.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lost Items</Text>
              {data.searchItems.lostItems.map(item => renderItemCard(item, 'lost'))}
            </View>
          )}

          {data.searchItems.foundItems.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Found Items</Text>
              {data.searchItems.foundItems.map(item => renderItemCard(item, 'found'))}
            </View>
          )}

          {data.searchItems.lostItems.length === 0 && data.searchItems.foundItems.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No items found matching your search.</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FF6B6B' }]}
            onPress={() => navigation.navigate('Lost Items')}
          >
            <Ionicons name="search" size={24} color="white" />
            <Text style={styles.actionButtonText}>View Lost Items</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4ECDC4' }]}
            onPress={() => navigation.navigate('Found Items')}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.actionButtonText}>View Found Items</Text>
          </TouchableOpacity>
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
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffebee',
    margin: 20,
    borderRadius: 10,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLocation: {
    fontSize: 12,
    color: '#888',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  quickActions: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

