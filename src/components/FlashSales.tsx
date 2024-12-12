import React, {useState, useEffect} from 'react';
import {IProductDetails} from "../InterfacesAndTypes/IProductDetails.ts";
import { Card, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
import { makeStyles } from "@mui/styles"; 

const useStyles = makeStyles({
    flashSalesContainer: {
        padding: '20px',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '20px',
    },
    productCard: {
        position: 'relative',
        padding: '15px',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        },
    },
    productImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    productInfo: {
        padding: '10px',
    },
    addToCartBtn: {
        opacity: 0,
        transition: 'opacity 0.3s ease',
        '&:hover': {
            opacity: 1,
        },
    },
    viewAllBtn: {
        display: 'block',
        margin: '20px auto',
    },
});

/**
 * Component contains logic to send request to backend api route that contains all products in flashsales
 */
export default function FlashSales() {
    const [products, setProducts] = useState<IProductDetails[]>([]); 
    const classes = useStyles(); 

    async function fetchFlashSalesProducts() {
        try {
        const response = await fetch('http://localhost:8080/products/productsApi/flashsalesApi/flashSales');
        const data = await response.json(); 
        setProducts(data);
        console.log(data);
     } catch (error) {
        console.error('Error fetching flash sales products:', error);
     }
    }

    useEffect(() => {
        fetchFlashSalesProducts()
    }, []);

    //Helper function to chunk array into groups of 5 if screen is laptop or desktop, 3 if tablet, and 2 if mobile but 4 by default 
    function chunkArray(array: IProductDetails[], size: number) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    const chunkSize = 4;
    const chunkedProducts = chunkArray(products, chunkSize); 
    console.log(chunkedProducts);

    //return with a grid of products 
    return (
        <div className={classes.flashSalesContainer}>
        <h3>Flash Sale</h3>
        <div className={classes.productsGrid}>
            {products.slice(0, 4).map((product) => (
                <Card key={product.productId} className={classes.productCard}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={classes.productImage}
                    />
                    <div className={classes.productInfo}>
                        <h4>{product.name}</h4>
                        <p>${product.price}</p>
                        <Button
                            className={classes.addToCartBtn}
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
        <Button
            variant="contained"
            color="error"
            className={classes.viewAllBtn}
        >
            View All Products
        </Button>
    </div> 
       )
}