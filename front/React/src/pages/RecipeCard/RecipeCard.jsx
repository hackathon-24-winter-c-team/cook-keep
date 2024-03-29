/*カードリスト*/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import rice from '../../../public/rice.png';
import bread from '../../../public/bread.png';
import dessert from '../../../public/dessert.png';
import fish from '../../../public/fish.png';
import meat from '../../../public/meat.png';
import noodle from '../../../public/noodle.png';
import vegetables from '../../../public/vegetables.png';
import japan from '../../../public/japan.png';
import chinese from '../../../public/chinese.png';
import world from '../../../public/world.png';
import fast from '../../../public/fast.png';
import late from '../../../public/late.png';
import soup from '../../../public/soup.png';
import western from '../../../public/western.png'
import { useSetRecoilState } from 'recoil';
import { recipesDetailState } from '../../state/recipeDetailState';

export const RecipeCard = ({ recipe }) => {

    const setrecipeDetailInfo = useSetRecoilState(recipesDetailState);

    //メインアイコンの指定
    let mainIcon = null;
    if (recipe.main_tag === 'rice') {
        mainIcon = rice
    } else if (recipe.main_tag === 'meat') {
        mainIcon = meat
    } else if (recipe.main_tag === 'vegetable') {
        mainIcon = vegetables
    } else if (recipe.main_tag === 'dessert') {
        mainIcon = dessert
    } else if (recipe.main_tag === 'fish') {
        mainIcon = fish
    } else if (recipe.main_tag === 'soup') {
        mainIcon = soup
    } else if (recipe.main_tag === 'noodles') {
        mainIcon = noodle
    } else if (recipe.main_tag === 'bread') {
        mainIcon = bread
    } else {
        mainIcon = 'https://picsum.photos/99'
    }

    //ジャンルアイコンの指定
    let genreIcon = null;
    if (recipe.genre_tag === 'japanese') {
        genreIcon = japan
    } else if (recipe.genre_tag === 'chinese') {
        genreIcon = chinese
    } else if (recipe.genre_tag === 'western') {
        genreIcon = western
    } else if (recipe.genre_tag === 'other') {
        genreIcon = world
    } else {
        genreIcon = 'https://picsum.photos/99'
    }

    //時短アイコンの指定
    let jitanIcon = null;
    if (recipe.jitan_tag === true) {
        jitanIcon = fast
    } else if (recipe.jitan_tag === false) {
        jitanIcon = late
    } else {
        jitanIcon = 'https://picsum.photos/99'
    }


    const maxLength = 29;
    let urlLength = "";

    if (recipe.data_url.length <= maxLength) {
        urlLength = recipe.data_url
    } else {
        urlLength = recipe.data_url.slice(0, maxLength - 3) + "...";
    }


    const navigate = useNavigate();

    // レシピ詳細ページへ遷移する関数 1はレシピIDに変更する必要アリ
    const handleDetailClick = () => {
        navigate('/recipes/' + recipe.id);
        setrecipeDetailInfo(recipe);
    };

    //画像イメージ一覧

    return (
        <Box sx={{
            display: 'inline-flex',
            "@media screen and (max-width:500px)": {
                display: 'flex',
                justifyContent: 'center',
            },
        }}>
            <Card sx={{ maxWidth: 300, maxHeight: 300, m: '10px' }}>
                <CardActionArea sx={{ justifyContent: 'center' }}>
                    <Box sx={{ height: '50%', display: 'inline-flex', borderBottom: 1, borderColor: 'grey.300' }} onClick={handleDetailClick}>
                        <CardMedia
                            component="img"
                            sx={{ width: '33%', borderRight: 1, borderColor: 'grey.300' }}
                            src={mainIcon}
                            alt={recipe.recipe_name}
                        />
                        <CardMedia
                            component="img"
                            sx={{ width: '33%', borderRight: 1, borderColor: 'grey.300' }}
                            src={genreIcon}
                            alt={recipe.recipe_name}
                        />
                        <CardMedia
                            component="img"
                            sx={{ width: '33%' }}
                            height="100%"
                            width="33%"
                            src={jitanIcon}
                            alt={recipe.recipe_name}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} onClick={handleDetailClick}>
                            {recipe.recipe_name}
                        </Typography>
                        {recipe.data_url && <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} >
                            <Link target="_blank" to={recipe.data_url} sx={{ borderBottom: 1, borderColor: 'grey.500' }}>{urlLength}</Link>
                        </Typography>}
                        {recipe.data_url === "" && <Typography gutterBottom variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2, fontSize: 20 }} onClick={handleDetailClick}>
                            レシピURLはありません
                        </Typography>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user_id: PropTypes.string,
        recipe_name: PropTypes.string,
        data_url: PropTypes.string,
        memo: PropTypes.string,
        image_1: PropTypes.string,  // 画像URLが文字列であることを想定しています。nullも許容します。
        image_2: PropTypes.string,
        image_3: PropTypes.string,
        main_tag: PropTypes.string,
        genre_tag: PropTypes.string,
        jitan_tag: PropTypes.bool,  // trueまたはfalseが期待されるため、bool型を指定します。
    }),
    recipeDetail: PropTypes.func
};
