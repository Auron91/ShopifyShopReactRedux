import { Breadcrumb } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


const BreadcrumbBar = (props) => {
    const location = useLocation();
    // let productTitle = useSelector((state) => state.shopifyState.product.title)


    // const paths = location.pathname.split('/').map((p, i, arr) => {
    //     if (i === 0) return {
    //         key: i,
    //         content: (<Link to={'/'}>Home</Link>),
    //         active: (i === arr.length - 1),
    //         link: (i < arr.length - 1)
    //     };
    //     // if (i === arr.length - 1) return {
    //     //     key: i,
    //     //     content: p,
    //     //     active: (i === arr.length - 1)
    //     // };
    //     // // if (i === 2) return {
    //     // //     key: i,
    //     // //     content: productTitle,
    //     // //     active: 2,
    //     // //     link: 2
    //     // // }

    //     // return {
    //     //     key: i,
    //     //     content: (<Link to={`${arr.slice(0, i ).join('/')}`}>{p}</Link>),
    //     //     active: (i === arr.length - 1),
    //     //     link: (i < arr.length - 1)
    //     // }

    // })
    return (
        // <Breadcrumb icon='chevron right' sections={paths} size='huge' />
        <div className=""></div>
    );
}


export default BreadcrumbBar;