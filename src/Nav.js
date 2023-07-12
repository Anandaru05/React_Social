import { useContext } from 'react';
import { Link } from "react-router-dom";
import DataContext from './context/DataContext';


const Nav = () => {
  const { search, setSearch } = useContext(DataContext)
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => {e.preventDefault()}}>
          <label htmlFor="">Search posts: </label>
          <input 
            id="search"
            type="text" 
            value={search}
            placeholder='search posts'
            onChange={(e)=>setSearch(e.target.value)}
            />
        </form>
        <ul>
          <li><Link to={"/"}>Home</Link> </li>
          <li><Link to={"/about"}>About</Link> </li>
          <li><Link to={"/newpost"}>NewPost</Link> </li>

        </ul>
      </nav>
  
    )
}

export default Nav