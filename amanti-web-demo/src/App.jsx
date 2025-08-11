import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'

// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://4000-if0t862u6jw5o8als5cam-365af61e.manusvm.computer/graphql',
  cache: new InMemoryCache(),
});

// GraphQL queries and mutations
const GET_ALL_LOST_ITEMS = gql`
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
`;

const GET_ALL_FOUND_ITEMS = gql`
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
`;

const CREATE_LOST_ITEM = gql`
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
`;

const CREATE_FOUND_ITEM = gql`
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
`;

function ItemsList({ type }) {
  const { data, loading, error, refetch } = useQuery(
    type === 'lost' ? GET_ALL_LOST_ITEMS : GET_ALL_FOUND_ITEMS
  );

  if (loading) return <div className="text-center p-4">Loading {type} items...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  const items = type === 'lost' ? data?.getAllLostItems : data?.getAllFoundItems;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold capitalize">{type} Items</h2>
        <Button onClick={() => refetch()} variant="outline">Refresh</Button>
      </div>
      {items?.length === 0 ? (
        <p className="text-gray-500 text-center p-8">No {type} items found.</p>
      ) : (
        <div className="grid gap-4">
          {items?.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant={type === 'lost' ? 'destructive' : 'default'}>
                    {item.status}
                  </Badge>
                </div>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>📍 {item.location}</p>
                  <p>📅 {type === 'lost' ? item.dateLost : item.dateFound}</p>
                  <p>📞 {item.contactInfo}</p>
                  <p>Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AddItemForm() {
  const [itemType, setItemType] = useState('lost');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const input = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      contactInfo: formData.contactInfo,
      imageUrls: [],
    };

    try {
      if (itemType === 'lost') {
        input.dateLost = formData.date;
        await createLostItem({ variables: { input } });
      } else {
        input.dateFound = formData.date;
        await createFoundItem({ variables: { input } });
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
      
      alert(`${itemType === 'lost' ? 'Lost' : 'Found'} item added successfully!`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
        <CardDescription>Report a lost or found item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={itemType === 'lost' ? 'default' : 'outline'}
              onClick={() => setItemType('lost')}
            >
              Lost Item
            </Button>
            <Button
              type="button"
              variant={itemType === 'found' ? 'default' : 'outline'}
              onClick={() => setItemType('found')}
            >
              Found Item
            </Button>
          </div>
          
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          
          <Input
            placeholder="Contact Info (email or phone)"
            value={formData.contactInfo}
            onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
            required
          />
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : `Add ${itemType === 'lost' ? 'Lost' : 'Found'} Item`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function AmantiDemo() {
  const [activeTab, setActiveTab] = useState('lost');

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Amanti</h1>
        <p className="text-gray-600">Lost & Found Community - Web Demo</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <AddItemForm />
        </div>
        
        <div>
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'lost' ? 'default' : 'outline'}
              onClick={() => setActiveTab('lost')}
            >
              Lost Items
            </Button>
            <Button
              variant={activeTab === 'found' ? 'default' : 'outline'}
              onClick={() => setActiveTab('found')}
            >
              Found Items
            </Button>
          </div>
          
          <ItemsList type={activeTab} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AmantiDemo />
    </ApolloProvider>
  );
}

export default App
