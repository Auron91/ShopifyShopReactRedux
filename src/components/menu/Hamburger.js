import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { toggleMobileNav } from '../../redux/actions'

const Hamburger = () => {
    const visible = useSelector(state => state.settings.mobileNav)
    const dispatch = useDispatch();

    return (
        ReactDOM.createPortal(
            <div className="hamburger-container">
                <button className={visible ? "hamburger--active" : "hamburger"} color='grey' onClick={() => dispatch(toggleMobileNav())}>
                    <span className="hamburger__box">
                        <span className="hamburger__inner"></span>
                    </span>
                </button>
            </div>,
            document.querySelector('#hamburger-root')
        )
    )
}

export default Hamburger;