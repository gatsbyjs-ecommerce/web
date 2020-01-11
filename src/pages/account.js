import React from 'react';
import styled from 'styled-components';

import Seo from '../components/Seo';
import Layout from '../components/Layout';

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const AccountPage = () => {
  return (
    <Layout>
      <Seo title="My Account" description="My Orders" />
      <section className="section">
        <Container className="container">
          <h1 className="title">My Order History</h1>
        </Container>
      </section>
    </Layout>
  );
};

export default AccountPage;
