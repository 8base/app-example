import gql from 'graphql-tag';

export const BROKER_CREATE_MUTATION = gql`
  mutation BrokerCreate($data: BrokerCreateInput!) {
    brokerCreate(data: $data) {
      id
    }
  }
`;

export const USERS_LIST_QUERY = gql`
  query UsersList {
    usersList {
      items {
        id
        firstName
        lastName
      }
    }
  }
`;

export const BROKER_DELETE_MUTATION = gql`
  mutation BrokerDelete($id: ID!) {
    brokerDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CUSTOMER_CREATE_MUTATION = gql`
  mutation CustomerCreate($data: CustomerCreateInput!) {
    customerCreate(data: $data) {
      id
    }
  }
`;

export const CUSTOMER_DELETE_MUTATION = gql`
  mutation CustomerDelete($id: ID!) {
    customerDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CUSTOMERS_LIST_QUERY = gql`
  query CustomersList {
    customersList {
      items {
        id
        user {
          email
          firstName
          lastName
        }
        purchases {
          count
        }
        sales {
          count
        }
      }
    }
  }
`;

export const LISTING_CREATE_MUTATION = gql`
  mutation ListingCreate($data: ListingCreateInput!) {
    listingCreate(data: $data) {
      id
    }
  }
`;

export const LISTING_UPDATE_MUTATION = gql`
  mutation ListingUpdate($data: ListingUpdateInput!) {
    listingUpdate(data: $data) {
      id
    }
  }
`;

export const LISTING_SHARE_MUTATION = gql`
  mutation ListingShare($id: ID!, $email: String!) {
    listingShare(id: $id, email: $email) {
      success
    }
  }
`;

export const LISTING_DELETE_MUTATION = gql`
  mutation ListingDelete($id: ID!) {
    listingDelete(data: { id: $id }) {
      success
    }
  }
`;

export const BROKERS_LIST_QUERY = gql`
  query BrokersList {
    brokersList {
      items {
        id
        user {
          email
          firstName
          lastName
        }
        listings {
          count
        }
      }
    }
  }
`;

export const LISTINGS_LIST_QUERY = gql`
  query ListingsList {
    listingsList {
      items {
        id
        createdAt
        updatedAt
        property {
          id
          title
        }
        broker {
          id
          user {
            firstName
            lastName 
          }
        }
        buyer {
          id
          user {
            firstName
            lastName 
          }
        }
        seller {
          id
          user {
            firstName
            lastName 
          }
        }
        documents {
          items {
            filename
            downloadUrl
          }
        }
        status
        closingDate
        price
      }
    }
  }
`;

export const PROPERTY_DELETE_MUTATION = gql`
  mutation PropertyDelete($id: ID!) {
    propertyDelete(data: { id: $id }) {
      success
    }
  }
`;

export const PROPERTY_CREATE_MUTATION = gql`
  mutation PropertyCreate($data: PropertyCreateInput!) {
    propertyCreate(data: $data) {
      id
    }
  }
`;

export const PROPERTY_UPDATE_MUTATION = gql`
  mutation PropertyUpdate($data: PropertyUpdateInput!) {
    propertyUpdate(data: $data) {
      id
    }
  }
`;

export const PROPERTIES_LIST_QUERY = gql`
  query PropertiesList {
    propertiesList {
      items {
        id
        createdAt
        updatedAt
        pictures {
          items {
            downloadUrl
            shareUrl
          }
        }
        bedrooms
        title
        description
        sqFootage
        bathrooms
        garage
        pool
      }
    }
  }
`;