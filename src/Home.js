import { useContext } from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';

const Home = () => {
    const { posts } = useContext(DataContext)
    return (
        <main className="Home">
            {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}

export default Home