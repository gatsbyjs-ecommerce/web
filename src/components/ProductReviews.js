import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Container = styled.section`
  h4 {
    margin-bottom: 1rem;
  }
`;

const ProductReviews = ({ reviews }) => (
  <Container className="section">
    <div className="container">
      <h4 className="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">
        Reviews
      </h4>
      {reviews.map(({ node: review }) => (
        <article className="media" key={review.id}>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{review.personName}</strong>
              </p>
              <ReactMarkdown source={review.comment} />
            </div>
          </div>
        </article>
      ))}
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add a comment..." />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="button" className="button">
                Post Review
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </Container>
);

export default ProductReviews;
