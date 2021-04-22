import { Container, Menu, Sidebar, Image, Label, Icon, Button, Sticky } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMobileNav } from '../../redux/actions/index'
import Hamburger from './Hamburger'

const MobileNav = (props) => {
    const { leftItems } = props;
    const visible = useSelector(state => state.settings.mobileNav)
    const dispatch = useDispatch();

    return (
        <>
            <Hamburger />
            <Menu fixed className="mobile-nav" secondary>
                <Container className="navbar">
                    <Menu.Item as={Link} to='/' >
                        <Image src='/images/logo.jpg' size='tiny' />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={Button} icon='search' size='huge' />
                        <Menu.Item as={Button} icon='user' size='huge' />
                        <Menu.Item as={Link} to='/cart'>
                            <Label className="shopingCartLabel" color='red'>2</Label>
                            <Icon size='big' name='shopping cart' />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
                <Sidebar
                    scrollLock={true}
                    as={Menu}
                    animation='overlay'
                    direction='right'
                    visible={visible}
                    vertical
                    size='large'
                    className="mobile-nav__sidebar"
                >
                    <Menu>
                        <Menu.Item as={Link} to='/'>
                            <Image src='/images/logo.jpg' size='tiny' />
                        </Menu.Item>
                        <Menu.Item as={Link} to='/cart'>
                            <Label className="shopingCartLabel" color='red'>2</Label>
                            <Icon size='big' name='shopping cart' style={{ margin: '0.5rem' }} />
                        </Menu.Item>
                    </Menu>
                    {leftItems.map((item) => {
                        return (
                            <Menu.Item
                                as={item.as}
                                to={item.to}
                                name={item.key}
                                key={item.key}
                                onClick={() => dispatch(toggleMobileNav())}
                            />)
                    })}
                </Sidebar>
        </>
    );
}

export default MobileNav;