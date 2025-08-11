
## Amanti App MVP Plan

### Core Features:
- **Post Lost Item**: Users can submit details about an item they have lost.
- **Post Found Item**: Users can submit details about an item they have found.
- **View Items**: Users can browse a list of all lost and found items.
- **Item Details**: Users can view detailed information about a specific lost or found item.
- **Contact Poster**: Users can initiate contact with the person who posted an item.

### Data Models:

#### Lost Item:
- `id`: String (Unique identifier)
- `title`: String (e.g., 'Lost Wallet', 'Missing Keys')
- `description`: String (Detailed description of the item, e.g., 'Black leather wallet with driver's license and credit cards.')
- `category`: String (e.g., 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Pets', 'Other')
- `location`: String (Where the item was lost, e.g., 'Central Park', 'Bus No. 123')
- `dateLost`: Date (When the item was lost)
- `contactInfo`: String (Email or phone number of the person who lost the item)
- `imageUrls`: [String] (Array of URLs to images of the item)
- `status`: Enum (e.g., 'Lost', 'Found', 'Returned')

#### Found Item:
- `id`: String (Unique identifier)
- `title`: String (e.g., 'Found Phone', 'Found Dog')
- `description`: String (Detailed description of the item, e.g., 'iPhone 13 Pro, black, found near the library entrance.')
- `category`: String (e.g., 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Pets', 'Other')
- `location`: String (Where the item was found, e.g., 'University Library', 'Main Street')
- `dateFound`: Date (When the item was found)
- `contactInfo`: String (Email or phone number of the person who found the item)
- `imageUrls`: [String] (Array of URLs to images of the item)
- `status`: Enum (e.g., 'Found', 'Claimed')

### GraphQL API Endpoints (Conceptual):

#### Queries:
- `getAllLostItems`: Returns a list of all lost items.
- `getLostItem(id: String!)`: Returns details for a specific lost item.
- `getAllFoundItems`: Returns a list of all found items.
- `getFoundItem(id: String!)`: Returns details for a specific found item.

#### Mutations:
- `createLostItem(input: LostItemInput!)`: Creates a new lost item entry.
- `createFoundItem(input: FoundItemInput!)`: Creates a new found item entry.
- `updateLostItem(id: String!, input: LostItemUpdateInput!)`: Updates an existing lost item.
- `updateFoundItem(id: String!, input: FoundItemUpdateInput!)`: Updates an existing found item.
- `deleteLostItem(id: String!)`: Deletes a lost item entry.
- `deleteFoundItem(id: String!)`: Deletes a found item entry.


