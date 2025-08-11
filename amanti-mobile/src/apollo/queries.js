import { gql } from '@apollo/client';

// Queries
export const GET_ALL_LOST_ITEMS = gql`
  query GetAllLostItems {
    getAllLostItems {
      id
      title
      description
      category
      location
      dateLost
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const GET_ALL_FOUND_ITEMS = gql`
  query GetAllFoundItems {
    getAllFoundItems {
      id
      title
      description
      category
      location
      dateFound
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const GET_LOST_ITEM = gql`
  query GetLostItem($id: ID!) {
    getLostItem(id: $id) {
      id
      title
      description
      category
      location
      dateLost
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const GET_FOUND_ITEM = gql`
  query GetFoundItem($id: ID!) {
    getFoundItem(id: $id) {
      id
      title
      description
      category
      location
      dateFound
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query SearchItems($query: String!) {
    searchItems(query: $query) {
      lostItems {
        id
        title
        description
        category
        location
        dateLost
        contactInfo
        imageUrls
        status
        createdAt
      }
      foundItems {
        id
        title
        description
        category
        location
        dateFound
        contactInfo
        imageUrls
        status
        createdAt
      }
    }
  }
`;

// Mutations
export const CREATE_LOST_ITEM = gql`
  mutation CreateLostItem($input: LostItemInput!) {
    createLostItem(input: $input) {
      id
      title
      description
      category
      location
      dateLost
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const CREATE_FOUND_ITEM = gql`
  mutation CreateFoundItem($input: FoundItemInput!) {
    createFoundItem(input: $input) {
      id
      title
      description
      category
      location
      dateFound
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const UPDATE_LOST_ITEM = gql`
  mutation UpdateLostItem($id: ID!, $input: LostItemUpdateInput!) {
    updateLostItem(id: $id, input: $input) {
      id
      title
      description
      category
      location
      dateLost
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const UPDATE_FOUND_ITEM = gql`
  mutation UpdateFoundItem($id: ID!, $input: FoundItemUpdateInput!) {
    updateFoundItem(id: $id, input: $input) {
      id
      title
      description
      category
      location
      dateFound
      contactInfo
      imageUrls
      status
      createdAt
    }
  }
`;

export const DELETE_LOST_ITEM = gql`
  mutation DeleteLostItem($id: ID!) {
    deleteLostItem(id: $id)
  }
`;

export const DELETE_FOUND_ITEM = gql`
  mutation DeleteFoundItem($id: ID!) {
    deleteFoundItem(id: $id)
  }
`;

