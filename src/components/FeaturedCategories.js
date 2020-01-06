import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 6rem;
  p {
    color: ${props => props.theme.textColorDark} !important;
  }
`;

const ItemContainer = styled.article`
  cursor: pointer;
`;

const FeaturedCategoriesItem = ({ title, subtitle, imgWidth }) => (
  <ItemContainer
    className="tile is-child notification"
    onClick={() => console.log('go to category page')}
  >
    <p className="title">{title}</p>
    <p className="subtitle">{subtitle}</p>
    <img
      src="https://bulma.io/images/placeholders/640x480.png"
      style={{ width: imgWidth, height: 'auto', float: 'right' }}
    />
  </ItemContainer>
);

const FeaturedCategories = () => {
  return (
    <Container className="container">
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-12">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <FeaturedCategoriesItem
                title="iPhone"
                subtitle="Cases"
                imgWidth="400px"
              />
            </div>
            <div className="tile is-parent">
              <FeaturedCategoriesItem
                title="Apple Watch"
                subtitle="Straps"
                imgWidth="400px"
              />
            </div>
          </div>
          <div className="tile is-parent">
            <FeaturedCategoriesItem
              title="Accessories"
              subtitle="Airpods Case"
              imgWidth="500px"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedCategories;
