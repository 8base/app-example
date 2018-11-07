const gql = require('graphql-tag');

const { sendMail, GMAIL_USER } = require('../../mailer');

const LISTING_QUERY = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      id
      property {
        title
        pictures {
          items {
            shareUrl
          }
        }
      }
    }
  }
`;

module.exports = async (event, ctx) => {
  let response = null;

  try {
    response = await ctx.api.gqlRequest(LISTING_QUERY, { id: event.data.id });
  } catch (e) {
    return { data: { success: false }};
  }

  try {
    const { listing: { property } } = response;

    await sendMail({
      from: GMAIL_USER,
      to: event.data.email,
      subject: `Share listing with property "${property.title}"`,
      html: `Listing with property title "${property.title}"<br /><img src="${property.pictures.items[0].shareUrl}?download=true" />`,
    });
  } catch (e) {
    return { data: { success: false }};
  }

  return { data: { success: true } };
};
