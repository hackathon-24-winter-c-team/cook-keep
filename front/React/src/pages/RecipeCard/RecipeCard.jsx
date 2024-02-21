/*カードリスト*/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
// import { useRecoilValue } from 'recoil';
// import { recipesState } from '../../state/recipesState';
import PropTypes from 'prop-types';

export const RecipeCard = ({ recipe }) => {
    // const recipe = useRecoilValue(recipesState);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Card sx={{ maxWidth: 800, m: '10px' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="250"
                            src={recipe.images || "https://picsum.photos/300"}
                            alt={recipe.recipe_name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }}>
                                {recipe.recipe_name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
                                {recipe.data_url}
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