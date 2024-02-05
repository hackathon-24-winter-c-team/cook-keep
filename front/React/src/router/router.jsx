import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Signup } from '../pages/Signup/Signup';
import { RecipeList } from '../pages/RecipeList/RecipeList';
import { RecipeDetail } from '../pages/RecipeDetail/RecipeDetail';

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