import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { theme } from '../utils/theme';

const Text = styled.h4`
  line-height: 1.7rem;
`;

const Line = styled.div`
  height: 3px;
  width: 50px;
  background-color: ${theme.primaryColor};
  margin: 0.6rem auto 3rem auto;
`;

const Heading = ({ children, centered }) => (
  <>
    <Text
      className={`is-size-4 is-uppercase has-text-weight-semibold ${
        centered ? 'has-text-centered' : 'has-text-centered'
      }`}
    >
      {children}
    </Text>
    <Line />
  </>
);

Heading.defaultProps = {
  centered: false,
};

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  centered: PropTypes.bool,
};

export default Heading;
