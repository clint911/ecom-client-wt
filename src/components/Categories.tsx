import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion'; 
import { 
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    useTheme,
    useMediaQuery,
    styled,
    Button,
    Alert,
    Skeleton,
  } from '@mui/material';
  import { CategoryData } from '../InterfacesAndTypes/IProductDetails';
import { Style } from '@mui/icons-material';

 /**Loading State and Error Components */
 export const LoadingState: React.FC = () => (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={6} sm={4} md={3} key={item}>
            <Card>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton variant="text" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
  
  export const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Alert 
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      >
            {error}
        </Alert>
    </Container>
  );

  
  // Extended interface for category display properties
  interface CategoryWithDisplay extends CategoryData {
    name: string;
    imageUrl: string;
    slug: string;
  }
 
/**Visual Building Blocks of the application */
  const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
  }));
/** Image part of our Card */
  export const StyledCardMedia = styled(CardMedia)({
    paddingTop: '75%', // 4:3 aspect ratio
    backgroundSize: 'contain',
    backgroundColor: '#f5f5f5',
  });

  // Create a type that combines the Card props with motion props
  type MotionCardProps = HTMLMotionProps<"div"> & React.ComponentProps<typeof StyledCard>;
  /**Wrap Card with motion */
  const MotionCard = motion<MotionCardProps>(StyledCard as any);

 /**API Function that fetches our data from the backend */
  const fetchCategories = async (): Promise<CategoryWithDisplay[]> => {
    try {
      const response = await fetch('your-backend-url/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  /**Category Card Component  */ 
  interface CategoryCardProps {
    category: CategoryWithDisplay;
    index: number; 
    onCategoryClick: (slug: string) => void;
  }  
  


  /**Category Card Component  */ 
  interface CategoryCardProps {
    category: CategoryWithDisplay;
    index: number; 
    onCategoryClick: (slug: string) => void;
  }
  export const CategoryCard: React.FC<CategoryCardProps> = ({ 
    category,
     index,
      onCategoryClick 
    }) => {
        const cardVariants = {
            hidden: { opacity: 0, y: 20 }, 
            visible: (index: number) => ({
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
            })
        }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <MotionCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <CardActionArea 
          onClick={() => onCategoryClick(category.slug)}
          sx={{ height: '100%' }}
        >
          <StyledCardMedia
            image={category.imageUrl}
            title={category.name}
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h3" 
              align="center"
              noWrap
            >
              {category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MotionCard>
    </Grid>
  );
};
    

interface CategoryWithDisplay extends CategoryData {
    name: string;
    imageUrl: string;
    slug: string; // URL-friendly version of the category name
  }

export default function Categories() {
  const [categories, setCategories] = useState<CategoryWithDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // MUI responsive breakpoints
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

//Navigation handler 
  const handleCategoryClick = (slug: string) => {
    // Navigate to category page with a smooth transition
    navigate(`/category/${slug}`, { 
      state: { transition: 'slide' } 
    });
      // Conditional rendering
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;


  // Main render
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Browse Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </Grid>
    </Container>
  );
};
  };

