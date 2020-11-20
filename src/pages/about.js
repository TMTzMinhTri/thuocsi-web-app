import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Layout from '../components/Layout';

export default function About() {
  const title = 'about page';
  return (
    <Layout title={title}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-alpha example
          </Typography>
          <Button variant="contained" component={Link} naked href="/">
            Go to the main page
          </Button>
          <ProTip />
        </Box>
      </Container>
    </Layout>
  );
}
