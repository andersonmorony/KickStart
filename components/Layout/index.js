import react from 'react';
import Menu from  '../Menu';

const Layout = (props) => {
    return(
        <div>
            <header>
                <Menu />
            </header>
            {props.children}
        </div>
    )
}

export default Layout;