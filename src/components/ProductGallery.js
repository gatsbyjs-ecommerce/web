import React from 'react';
import { isUndefined } from 'lodash';
import { Spring, animated } from 'react-spring';
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';

import 'react-image-gallery/styles/css/image-gallery.css';

const Container = styled.div`
  min-height: 700px;
  @media only screen and (max-width: 1024px) {
    min-height: 400px;
  }
  .image-gallery-thumbnails-wrapper {
    margin-top: 10px;
  }
  .image-gallery-thumbnail-inner img {
    width: auto;
    height: 70px;
  }
`;

class ProductGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 400);
  }

  componentWillUnmount() {
    this.setState({ isVisible: false });
  }

  render() {
    const { isVisible } = this.state;
    const { variant } = this.props;

    const isMobile = !isUndefined(global.window)
      ? global.window.innerWidth < 768
      : false;

    // console.log('images', product.variant.images);
    const images = variant.images
      ? variant.images.map(image => ({
          original: image.asset.fluid.src,
          thumbnail: image.asset.fluid.src,
        }))
      : [];
    // console.log('images 2', images);

    return (
      <Container>
        <Spring
          native
          from={{ opacity: 0, marginLeft: -100 }}
          to={{
            opacity: isVisible ? 1 : 0,
            marginLeft: isVisible ? 0 : -100,
          }}
        >
          {styles => (
            <animated.div style={styles}>
              <ImageGallery
                items={images}
                thumbnailPosition="bottom"
                showPlayButton={false}
                showNav={false}
                showThumbnails={!isMobile}
                showFullscreenButton={!isMobile}
                showBullets={isMobile}
                lazyLoad
              />
            </animated.div>
          )}
        </Spring>
      </Container>
    );
  }
}

export default ProductGallery;
