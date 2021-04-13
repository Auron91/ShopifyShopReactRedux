import {Breadcrumb} from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const BreadcrumbBar = (props) => {
    return (
        <Breadcrumb className='breadcrumb'>
        <Link to='/home'>Home</Link>
        <Breadcrumb.Divider>/</Breadcrumb.Divider>
        </Breadcrumb>
     );
}

export default BreadcrumbBar;