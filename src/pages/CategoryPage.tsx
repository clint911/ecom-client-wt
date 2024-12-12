import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {/* Convert slug to readable format */}
          {slug?.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Typography>
        {/* Add your category page content here */}
      </Container>
    </motion.div>
  );
};

export default CategoryPage;