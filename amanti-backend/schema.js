const { gql } = require('graphql-tag');

const typeDefs = gql`
  type LostItem {
    id: ID!
    title: String!
    description: String!
    category: String!
    location: String!
    dateLost: String!
    contactInfo: String!
    imageUrls: [String!]!
    status: ItemStatus!
    createdAt: String!
  }

  type FoundItem {
    id: ID!
    title: String!
    description: String!
    category: String!
    location: String!
    dateFound: String!
    contactInfo: String!
    imageUrls: [String!]!
    status: ItemStatus!
    createdAt: String!
  }

  enum ItemStatus {
    LOST
    FOUND
    RETURNED
    CLAIMED
  }

  input LostItemInput {
    title: String!
    description: String!
    category: String!
    location: String!
    dateLost: String!
    contactInfo: String!
    imageUrls: [String!]
  }

  input FoundItemInput {
    title: String!
    description: String!
    category: String!
    location: String!
    dateFound: String!
    contactInfo: String!
    imageUrls: [String!]
  }

  input LostItemUpdateInput {
    title: String
    description: String
    category: String
    location: String
    dateLost: String
    contactInfo: String
    imageUrls: [String!]
    status: ItemStatus
  }

  input FoundItemUpdateInput {
    title: String
    description: String
    category: String
    location: String
    dateFound: String
    contactInfo: String
    imageUrls: [String!]
    status: ItemStatus
  }

  type Query {
    getAllLostItems: [LostItem!]!
    getLostItem(id: ID!): LostItem
    getAllFoundItems: [FoundItem!]!
    getFoundItem(id: ID!): FoundItem
    searchItems(query: String!): SearchResult!
  }

  type Mutation {
    createLostItem(input: LostItemInput!): LostItem!
    createFoundItem(input: FoundItemInput!): FoundItem!
    updateLostItem(id: ID!, input: LostItemUpdateInput!): LostItem
    updateFoundItem(id: ID!, input: FoundItemUpdateInput!): FoundItem
    deleteLostItem(id: ID!): Boolean!
    deleteFoundItem(id: ID!): Boolean!
  }

  type SearchResult {
    lostItems: [LostItem!]!
    foundItems: [FoundItem!]!
  }
`;

module.exports = typeDefs;

