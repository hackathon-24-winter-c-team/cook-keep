/*カードリスト*/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';


export default function RecipeCard() {

    const recipeCardIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {recipeCardIds.map((recipeCardId) => (
                <Card sx={{ maxWidth: 800, m: '10px' }} key={recipeCardId}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="250"
                            src="https://picsum.photos/300"
                            alt=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }}>
                                レシピ名
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
                                レシピURL
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}