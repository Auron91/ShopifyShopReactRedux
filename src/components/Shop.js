import { Grid } from 'semantic-ui-react'
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";

const Shop = () => {
    return (
        <Grid>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <ProductGrid />
          </Grid.Column>
        </Grid>
     );
}

export default Shop;