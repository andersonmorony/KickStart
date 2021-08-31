import react from 'react';
import Menu from  '../Menu';

const Layout = (props) => {
    return(
        <div>
            <header>
                <Menu />
            </header>
            {props.children}
            <footer>Rodapé</footer>
        </div>
    )
}

export default Layout;