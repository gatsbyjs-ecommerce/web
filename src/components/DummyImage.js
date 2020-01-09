import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 318px;
  height: 397.5px;
`;

const DummyImage = () => (
  <Image
    src="https://bulma.io/images/placeholders/1280x960.png"
    alt="dummy image"
  />
);

export default DummyImage;
