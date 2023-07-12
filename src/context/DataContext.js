import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../api/posts";
import useWindowSize from '../hooks/useWindowSize'


const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                console.log("error:", `${err.message}`);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };

        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (err) {
            console.log("Error:", `${err.message}`);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            setEditTitle('');
            setEditBody('');
            console.log("setEditBody:", setEditBody)
            navigate('/');
            console.log("navigate:", navigate)
        } catch (err) {
            console.log("Error:", `${err.message}`);
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter((post) => post.id !== id);
            setPosts(postsList);
            navigate('/');
        } catch (err) {
            console.log("Error:", `${err.message}`);
        }
    };
    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResults,setSearchResults, handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
            posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody, handleDelete
        }}>
          { children }

        </DataContext.Provider>

    )
}

export default DataContext;