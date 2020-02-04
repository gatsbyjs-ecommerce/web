import React from 'react';
import styled from 'styled-components';

const Address = styled.address`
  font-size: 0.9rem;
`;

const ContactAddress = () => {
  return (
    <>
      <Address>
        My Site
        <br />
        1, New Road,
        <br />
        Wednesfield, AB12 12SD
        <br />
        United Kingdom
        <br />
        Tel: <a>0044-121-123-1234</a>
      </Address>
    </>
  );
};

export default ContactAddress;
