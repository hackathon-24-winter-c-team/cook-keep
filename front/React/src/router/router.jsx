import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '../components/pages/Login/Login';
import { Signup } from '../components/pages/Signup/Signup';
import { RecipeList } from '../components/pages/RecipeList/RecipeList';
import { RecipeDetail } from '../components/pages/RecipeDetail/RecipeDetail';

export const AppRouter= () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    )
}