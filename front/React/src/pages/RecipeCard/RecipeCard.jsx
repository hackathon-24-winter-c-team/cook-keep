/*カードリスト*/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
// import { useRecoilValue } from 'recoil';
// import { recipesState } from '../../state/recipesState';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const RecipeCard = ({ recipe, recipeDetail }) => {

    RecipeCard.propTypes = {
        recipeDetail: PropTypes.func.isRequired, // onClickプロパティの型をfuncとして指定
        // 他のプロパティも必要に応じて指定
    };

    const maxLength = 25;
    let urlLength = [""];

    if (recipe.data_url.length <= maxLength) {
        urlLength = recipe.data_url
    } else {
        urlLength = recipe.data_url.slice(0, maxLength - 3) + "...";
    }

    return (
        <Box sx={{ display: 'inline-flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Card sx={{ maxWidth: 800, m: '10px' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        src={recipe.images || "https://picsum.photos/300"}
                        alt={recipe.recipe_name}
                        onClick={recipeDetail}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} onClick={recipeDetail}>
                            {recipe.recipe_name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} >
                            <Link target="_blank" to={recipe.data_url} sx={{ borderBottom: 1, borderColor: 'grey.500' }}>{urlLength}</Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        recipe_name: PropTypes.string,
        data_url: PropTypes.string,
        images: PropTypes.string,
    }),
};