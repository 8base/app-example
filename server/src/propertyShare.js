const gql = require('graphql-tag');

const { sendMail, GMAIL_USER } = require('./mailer');

const PROPERTY_QUERY = gql`
  query Property($id: ID!) {
    property(id: $id) {
      id
      title
      pictures {
        items {
          shareUrl
        }
      }
    }
  }
`;

module.exports = async (event, context) => {
  const response = await context.api.gqlRequest(PROPERTY_QUERY, { id: event.data.id });
  const { property } = response;

  await sendMail({
    from: GMAIL_USER,
    to: event.data.email,
    subject: `Property info: "${property.title}"`,
    html: `Listing with property title "${property.title}"<br /><img src="${property.pictures.items[0].shareUrl}?download=true" />`,
  });

  return { data: { success: true } };
};