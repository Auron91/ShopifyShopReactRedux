import { Grid, Sidebar } from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'
import ProductGrid from "./ProductGrid";

const Shop = () => {
  return (
      <Grid stackable doubling>
        <Grid.Column width={4}>
          <SidebarMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <ProductGrid />
        </Grid.Column>
      </Grid>
  );
}

export default Shop;