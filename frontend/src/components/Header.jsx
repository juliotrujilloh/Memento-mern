import {Link} from 'react-router-dom';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const Header = () => {

    return (
        <header>
            <div className="container"> 
                 <Link to="/" style={{ textDecoration: 'none' }}> 
                    <h1>Memento <BookmarksIcon/></h1>
                    
                </Link>
            </div>
        </header>
    );
};

export default Header;
{/*<Link> will essentially return a standard <a> tag, which is why we apply textDecoration rule there. */}