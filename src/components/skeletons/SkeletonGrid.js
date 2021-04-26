import SkeletonElement from './SkeletonElement'
import { Grid, Card, Image } from "semantic-ui-react";
import Shimmer from './Shimmer'

const SkeletonGrid = ( { theme }) => {
  const themeClass = theme || 'light'
  return (
    <Grid.Column className={`skeleton-wrapper ${themeClass}`}>
      <Card className="card" fluid>
        <Card.Content>
          <Image as={SkeletonElement} type='photo' centered />
          <Card.Header as={SkeletonElement} type='title' floated='left'></Card.Header>
          <Card.Meta as={SkeletonElement} type='price' className="right floated"></Card.Meta>
        </Card.Content>
      </Card>
      <Shimmer />
    </Grid.Column>
  );
}

export default SkeletonGrid;