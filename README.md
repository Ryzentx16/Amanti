# Amanti - Lost & Found MVP

A complete mobile application for lost and found items built with React Native/Expo frontend and Node.js/GraphQL backend.

## 🚀 Features

- **Report Lost Items**: Users can report items they have lost
- **Report Found Items**: Users can report items they have found
- **Browse Items**: View all lost and found items in organized lists
- **Contact Information**: Each item includes contact details for coordination
- **Real-time Updates**: Items are updated in real-time across all users
- **Responsive Design**: Works on both mobile and web platforms

## 🏗️ Architecture

### Backend (Node.js + GraphQL)
- **Technology**: Node.js with Apollo Server
- **Database**: In-memory storage (easily replaceable with MongoDB/PostgreSQL)
- **API**: GraphQL with queries and mutations for CRUD operations
- **Port**: 4000

### Frontend (React Native + Expo)
- **Technology**: React Native with Expo
- **State Management**: Apollo Client for GraphQL integration
- **UI Components**: Custom components with responsive design
- **Navigation**: Tab-based navigation between Lost/Found items

## 📁 Project Structure

```
amanti-mvp/
├── amanti-backend/          # Node.js GraphQL Backend
│   ├── server.js           # Main server file
│   ├── schema.js           # GraphQL schema definitions
│   ├── resolvers.js        # GraphQL resolvers
│   └── package.json        # Backend dependencies
├── amanti-mobile/          # React Native Expo Frontend
│   ├── App.js             # Main app component
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── navigation/    # Navigation setup
│   │   └── apollo/        # GraphQL client setup
│   └── package.json       # Frontend dependencies
├── amanti-web-demo/        # React Web Demo (for testing)
│   ├── src/
│   │   └── App.jsx        # Web demo component
│   └── package.json       # Web demo dependencies
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm
- Expo CLI (for mobile development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd amanti-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the GraphQL server:
```bash
npm start
```

The backend will be running at `http://localhost:4000/graphql`

### Frontend Setup (React Native/Expo)

1. Navigate to the mobile directory:
```bash
cd amanti-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npx expo start
```

4. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator.

### Web Demo Setup (for testing)

1. Navigate to the web demo directory:
```bash
cd amanti-web-demo
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

The web demo will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration
- **Port**: Change in `server.js` (default: 4000)
- **CORS**: Configured to allow all origins for development
- **Database**: Currently uses in-memory storage, can be replaced with persistent database

### Frontend Configuration
- **Backend URL**: Update in `src/apollo/client.js` to point to your backend
- **Styling**: Customize colors and themes in component files

## 📱 Usage

### Adding a Lost Item
1. Open the app
2. Select "Lost Item" tab
3. Fill in the form with item details:
   - Title (e.g., "Lost iPhone 13")
   - Description
   - Category
   - Location where lost
   - Date lost
   - Contact information
4. Submit the form

### Adding a Found Item
1. Select "Found Item" tab
2. Fill in the form with item details:
   - Title (e.g., "Found Wallet")
   - Description
   - Category
   - Location where found
   - Date found
   - Contact information
3. Submit the form

### Browsing Items
- Switch between "Lost Items" and "Found Items" tabs
- View all items with their details
- Contact information is displayed for each item

## 🔍 GraphQL API

### Queries
```graphql
# Get all lost items
query GetAllLostItems {
  getAllLostItems {
    id
    title
    description
    category
    location
    dateLost
    contactInfo
    status
    createdAt
  }
}

# Get all found items
query GetAllFoundItems {
  getAllFoundItems {
    id
    title
    description
    category
    location
    dateFound
    contactInfo
    status
    createdAt
  }
}
```

### Mutations
```graphql
# Create a lost item
mutation CreateLostItem($input: LostItemInput!) {
  createLostItem(input: $input) {
    id
    title
    description
    category
    location
    dateLost
    contactInfo
    status
    createdAt
  }
}

# Create a found item
mutation CreateFoundItem($input: FoundItemInput!) {
  createFoundItem(input: $input) {
    id
    title
    description
    category
    location
    dateFound
    contactInfo
    status
    createdAt
  }
}
```

## 🚀 Deployment

### Backend Deployment
1. Choose a hosting platform (Heroku, Railway, DigitalOcean, etc.)
2. Set environment variables if needed
3. Deploy the `amanti-backend` directory
4. Update the frontend to use the deployed backend URL

### Frontend Deployment
1. For web: Build and deploy the React app to Netlify, Vercel, etc.
2. For mobile: Use Expo's build service or eject to build native apps

## 🔮 Future Enhancements

### Immediate Improvements
- **Image Upload**: Allow users to upload photos of items
- **Search & Filter**: Add search functionality and category filters
- **User Authentication**: Add user accounts and authentication
- **Push Notifications**: Notify users of potential matches

### Advanced Features
- **Geolocation**: Show items on a map
- **AI Matching**: Automatically suggest potential matches between lost and found items
- **Chat System**: In-app messaging between users
- **Admin Panel**: Moderation tools for managing items

### Technical Improvements
- **Persistent Database**: Replace in-memory storage with MongoDB or PostgreSQL
- **Caching**: Add Redis for improved performance
- **Testing**: Add unit and integration tests
- **CI/CD**: Set up automated deployment pipelines

## 🐛 Known Issues

1. **Date Format**: Date picker may show different formats on different platforms
2. **Image Support**: Currently no image upload functionality
3. **Offline Support**: App requires internet connection to function

## 📄 License

This project is created as an MVP demonstration. Feel free to use and modify as needed.

## 🤝 Contributing

This is an MVP project. For production use, consider:
1. Adding proper error handling
2. Implementing user authentication
3. Adding data validation
4. Setting up proper database
5. Adding comprehensive testing

## 📞 Support

For questions or issues with this MVP, please refer to the code comments and documentation within each component file.

---

**Built with ❤️ using React Native, Expo, Node.js, and GraphQL**

