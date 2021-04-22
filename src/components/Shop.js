import { Grid } from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'
import ProductGrid from "./ProductGrid";

const Shop = (props) => {
  return (
      <Grid stackable doubling>
        <Grid.Column width={4}>
          <SidebarMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <ProductGrid sex={props.sex}/>
        </Grid.Column>
      </Grid>
  );
}

export default Shop;