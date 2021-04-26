import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { toggleMobileNav } from '../../redux/actions'
import {  Menu, Sidebar, Image, Label, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom'

const Hamburger = (props) => {
    const visible = useSelector(state => state.settings.mobileNav)
    const leftItems = props.leftItems;
    const dispatch = useDispatch();

    return (
        ReactDOM.createPortal(
            <div className="">
                <a href='#root' className="hamburger-container" style={{ bottom: '5%' }} >
                    <i className="big arrow up icon"></i>
                </a>
                <div className="hamburger-container">
                    <div className="hamburger-arrow">

                    </div>
                    <button className={visible ? "hamburger--active" : "hamburger"} color='grey' onClick={() => dispatch(toggleMobileNav())}>
                        <span className="hamburger__box">
                            <span className="hamburger__inner"></span>
                        </span>
                    </button>
                </div>
                <Sidebar

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
            </div>,
            document.querySelector('#hamburger-root')
        )
    )
}

export default Hamburger;