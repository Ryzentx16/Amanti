import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { CREATE_LOST_ITEM, CREATE_FOUND_ITEM, GET_ALL_LOST_ITEMS, GET_ALL_FOUND_ITEMS } from '../apollo/queries';

const categories = [
  'Electronics',
  'Clothing',
  'Documents',
  'Jewelry',
  'Pets',
  'Keys',
  'Bags',
  'Books',
  'Other'
];

export default function AddItemScreen({ navigation }) {
  const [itemType, setItemType] = useState('lost'); // 'lost' or 'found'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    location: '',
    date: '',
    contactInfo: '',
  });

  const [createLostItem, { loading: loadingLost }] = useMutation(CREATE_LOST_ITEM, {
    refetchQueries: [{ query: GET_ALL_LOST_ITEMS }],
  });

  const [createFoundItem, { loading: loadingFound }] = useMutation(CREATE_FOUND_ITEM, {
    refetchQueries: [{ query: GET_ALL_FOUND_ITEMS }],
  });

  const loading = loadingLost || loadingFound;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }
    if (!formData.location.trim()) {
      Alert.alert('Validation Error', 'Please enter a location');
      return false;
    }
    if (!formData.date.trim()) {
      Alert.alert('Validation Error', 'Please enter a date');
      return false;
    }
    if (!formData.contactInfo.trim()) {
      Alert.alert('Validation Error', 'Please enter contact information');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const input = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
        contactInfo: formData.contactInfo.trim(),
        imageUrls: [], // For MVP, we'll skip image upload
      };

      if (itemType === 'lost') {
        input.dateLost = formData.date.trim();
        await createLostItem({ variables: { input } });
        Alert.alert('Success', 'Lost item reported successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        input.dateFound = formData.date.trim();
        await createFoundItem({ variables: { input } });
        Alert.alert('Success', 'Found item reported successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Other',
        location: '',
        date: '',
        contactInfo: '',
      });
    } catch (error) {
      Alert.alert('Error', `Failed to submit: ${error.message}`);
    }
  };

  const renderCategorySelector = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              formData.category === category && styles.categoryButtonSelected
            ]}
            onPress={() => handleInputChange('category', category)}
          >
            <Text style={[
              styles.categoryButtonText,
              formData.category === category && styles.categoryButtonTextSelected
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Item Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              itemType === 'lost' && styles.typeButtonSelected,
              { backgroundColor: itemType === 'lost' ? '#FF6B6B' : '#f0f0f0' }
            ]}
            onPress={() => setItemType('lost')}
          >
            <Ionicons 
              name="search" 
              size={20} 
              color={itemType === 'lost' ? 'white' : '#666'} 
            />
            <Text style={[
              styles.typeButtonText,
              { color: itemType === 'lost' ? 'white' : '#666' }
            ]}>
              Lost Item
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.typeButton,
              itemType === 'found' && styles.typeButtonSelected,
              { backgroundColor: itemType === 'found' ? '#4ECDC4' : '#f0f0f0' }
            ]}
            onPress={() => setItemType('found')}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={20} 
              color={itemType === 'found' ? 'white' : '#666'} 
            />
            <Text style={[
              styles.typeButtonText,
              { color: itemType === 'found' ? 'white' : '#666' }
            ]}>
              Found Item
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder={`What did you ${itemType}?`}
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide detailed description..."
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {renderCategorySelector()}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              placeholder={`Where was it ${itemType}?`}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date {itemType === 'lost' ? 'Lost' : 'Found'} *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Information *</Text>
            <TextInput
              style={styles.input}
              placeholder="Email or phone number"
              value={formData.contactInfo}
              onChangeText={(value) => handleInputChange('contactInfo', value)}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: itemType === 'lost' ? '#FF6B6B' : '#4ECDC4' },
            loading && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.submitButtonText}>Submitting...</Text>
          ) : (
            <>
              <Ionicons name="send" size={20} color="white" />
              <Text style={styles.submitButtonText}>
                Report {itemType === 'lost' ? 'Lost' : 'Found'} Item
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 18,
    borderRadius: 10,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

