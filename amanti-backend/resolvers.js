const { v4: uuidv4 } = require('uuid');

// In-memory data store for MVP
let lostItems = [];
let foundItems = [];

const resolvers = {
  Query: {
    getAllLostItems: () => lostItems,
    getLostItem: (_, { id }) => lostItems.find(item => item.id === id),
    getAllFoundItems: () => foundItems,
    getFoundItem: (_, { id }) => foundItems.find(item => item.id === id),
    searchItems: (_, { query }) => {
      const searchTerm = query.toLowerCase();
      const matchingLostItems = lostItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
      );
      const matchingFoundItems = foundItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
      );
      return {
        lostItems: matchingLostItems,
        foundItems: matchingFoundItems
      };
    }
  },

  Mutation: {
    createLostItem: (_, { input }) => {
      const newItem = {
        id: uuidv4(),
        ...input,
        status: 'LOST',
        createdAt: new Date().toISOString(),
        imageUrls: input.imageUrls || []
      };
      lostItems.push(newItem);
      return newItem;
    },

    createFoundItem: (_, { input }) => {
      const newItem = {
        id: uuidv4(),
        ...input,
        status: 'FOUND',
        createdAt: new Date().toISOString(),
        imageUrls: input.imageUrls || []
      };
      foundItems.push(newItem);
      return newItem;
    },

    updateLostItem: (_, { id, input }) => {
      const itemIndex = lostItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return null;
      
      lostItems[itemIndex] = { ...lostItems[itemIndex], ...input };
      return lostItems[itemIndex];
    },

    updateFoundItem: (_, { id, input }) => {
      const itemIndex = foundItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return null;
      
      foundItems[itemIndex] = { ...foundItems[itemIndex], ...input };
      return foundItems[itemIndex];
    },

    deleteLostItem: (_, { id }) => {
      const itemIndex = lostItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return false;
      
      lostItems.splice(itemIndex, 1);
      return true;
    },

    deleteFoundItem: (_, { id }) => {
      const itemIndex = foundItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return false;
      
      foundItems.splice(itemIndex, 1);
      return true;
    }
  }
};

module.exports = resolvers;

