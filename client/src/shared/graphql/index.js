import gql from 'graphql-tag';

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

export const PROPERTY_SHARE_MUTATION = gql`
  mutation PropertyShare($id: ID!, $email: String!) {
    propertyShare(id: $id, email: $email) {
      success
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
            id
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