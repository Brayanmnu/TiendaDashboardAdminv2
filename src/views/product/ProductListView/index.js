import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));
const baseUrl="http://localhost:8080/producto/";
const ProductList = () => {
  const classes = useStyles();
  const [products,setProductos] = useState([]);
  const obtenerTodosProductosNoEliminados=async()=>{
    await axios.get(baseUrl + "obtener_todos_productos_no_eliminados")
    .then(res=>{setProductos(res.data)});
  }
  
  useEffect(()=>{
    async function fetchData(){
      await obtenerTodosProductosNoEliminados();
    }
    
    fetchData();
  },[])

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination count={products.length%10===0 ? products.length/10 : products.length/10 +1} />
          
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
