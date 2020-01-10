import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trail } from 'react-spring';

import DeviceItem from './DeviceItem';
import Heading from './Heading';

const Container = styled.div`
  position: relative;
`;

class DevicesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 200);
  }

  render() {
    const { title, devices } = this.props;
    const { isOpen } = this.state;
    const keys = devices.map(item => item.node.id);

    return (
      <section className="section">
        <Container className="container">
          <Heading>{title}</Heading>
          <div className="columns is-multiline">
            <Trail
              native
              from={{ opacity: 0 }}
              to={{ opacity: isOpen ? 1 : 0.25 }}
              keys={keys}
            >
              {devices.map(({ node }) => styles => (
                <DeviceItem key={node.id} item={node} styles={styles} />
              ))}
            </Trail>
          </div>
        </Container>
      </section>
    );
  }
}

DevicesList.defaultProps = {
  title: 'New arrivals',
  products: [],
};

DevicesList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
};

export default DevicesList;
