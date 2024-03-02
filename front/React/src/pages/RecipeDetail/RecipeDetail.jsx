import styles from './RecipeDetail.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button as BaseButton } from '@mui/base/Button';
import { styled } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../state/userState';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
/* import { dbEndpoint } from '../../api/endpoint/dbEndpoint';
 */import { recipesDetailState } from '../../state/recipeDetailState';
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
import { CardMedia, Typography } from '@mui/material';
import { domainEndpoint } from '../../api/endpoint/domainEndpoint';
import { recipesEndpoint } from '../../api/endpoint/recipesEndpoint';


export const RecipeDetail = () => {

    const currentUser = useRecoilValue(currentUserState); // ログインユーザーをグローバルに保持する

    const recipeDetailInfo = useRecoilValue(recipesDetailState);

    const navigate = useNavigate();

    const handleArrowBack = () => {
        navigate('/Recipes')
    }

    // ログインしていなかったらログインページへ画面遷移
    const isLogin = useRecoilValue(currentUserState);
    if (!isLogin) {
        return <Navigate to='/' replace />;
    }


    // レシピを削除する関数
    const handleRecipeDelete = async () => {
        console.log(recipeDetailInfo.id);
        const isConfirmed = window.confirm('レシピを削除してもよろしいですか？');
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await axios.delete(`${domainEndpoint}${recipesEndpoint}${recipeDetailInfo.id}`, {
                headers: {Authorization: `Token ${currentUser}`},
                data: {}
            }); // ここに表示しているレシピIDを追加
            alert('レシピが削除されました');
            console.log('Delete response:', response.data)   // 削除されたレシピの確認
            navigate('/Recipes');
        } catch (error) {
            console.error('レシピ削除中にエラーが発生しました:', error);
            alert('レシピの削除に失敗しました')
        }
    }

    //メインアイコンの指定
    let mainIcon = null;
    if (recipeDetailInfo.main_tag === 'rice') {
        mainIcon = rice
    } else if (recipeDetailInfo.main_tag === 'meat') {
        mainIcon = meat
    } else if (recipeDetailInfo.main_tag === 'vegetable') {
        mainIcon = vegetables
    } else if (recipeDetailInfo.main_tag === 'dessert') {
        mainIcon = dessert
    } else if (recipeDetailInfo.main_tag === 'fish') {
        mainIcon = fish
    } else if (recipeDetailInfo.main_tag === 'soup') {
        mainIcon = soup
    } else if (recipeDetailInfo.main_tag === 'noodles') {
        mainIcon = noodle
    } else if (recipeDetailInfo.main_tag === 'bread') {
        mainIcon = bread
    } else {
        mainIcon = 'https://picsum.photos/99'
    }

    //ジャンルアイコンの指定
    let genreIcon = null;
    if (recipeDetailInfo.genre_tag === 'japanese') {
        genreIcon = japan
    } else if (recipeDetailInfo.genre_tag === 'chinese') {
        genreIcon = chinese
    } else if (recipeDetailInfo.genre_tag === 'western') {
        genreIcon = western
    } else if (recipeDetailInfo.genre_tag === 'other') {
        genreIcon = world
    } else {
        genreIcon = 'https://picsum.photos/99'
    }

    //時短アイコンの指定
    let jitanIcon = null;
    if (recipeDetailInfo.jitan_tag === true) {
        jitanIcon = fast
    } else if (recipeDetailInfo.jitan_tag === false) {
        jitanIcon = late
    } else {
        jitanIcon = 'https://picsum.photos/99'
    }

    const maxLength = 29;
    let urlLength = "";

    if (recipeDetailInfo.data_url.length <= maxLength) {
        urlLength = recipeDetailInfo.data_url
    } else {
        urlLength = recipeDetailInfo.data_url.slice(0, maxLength - 3) + "...";
    }


    return (
        <div className={styles.html}>
            <div className={styles.body}>
                <div className={styles.head}>
                    <ArrowBackIcon className={styles.arrowBack} fontSize='large' onClick={handleArrowBack} />
                    <h2>レシピ詳細ページ</h2>
                    <DeleteForeverIcon className={styles.CancelIcon} fontSize='large' onClick={handleRecipeDelete} />
                </div>
                <div className={styles.recipeIcon}>
                    <CardMedia
                        component="img"
                        sx={{ width: '30%' }}
                        src={mainIcon}
                        alt={recipeDetailInfo.recipe_name}
                    />
                    <CardMedia
                        component="img"
                        sx={{ width: '30%' }}
                        src={genreIcon}
                        alt={recipeDetailInfo.recipe_name}
                    />
                    <CardMedia
                        component="img"
                        sx={{ width: '30%' }}
                        src={jitanIcon}
                        alt={recipeDetailInfo.recipe_name}
                    />
                </div>
                <div className={styles.url}>
                    {recipeDetailInfo.data_url && <Typography gutterBottom variant="h6" component="div" sx={{ width: "90%", borderBottom: 1, borderColor: 'grey.500', mb: 2, textAlign: "center", display: 'flex', justifyContent: 'center' }} >
                        <Link target="_blank" to={recipeDetailInfo.data_url} sx={{ justifyContent: 'center' }}>{urlLength}</Link>
                    </Typography>}
                </div>
                <div className={styles.TextField}>
                    <TextField id='recipeId' label='名前' defaultValue={recipeDetailInfo.recipe_name} sx={{justifyContent: 'center' }}></TextField>
                </div>
                <div className={styles.tagGroup}>
                    <FormControl >
                        <FormLabel id="mainTagGroup">メイン :</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="mainTagGroupLabel"
                            name="mainTagGroup"
                            value={recipeDetailInfo.main_tag}

                        >
                            <FormControlLabel value="rice" control={<Radio />} label="ご飯" />
                            <FormControlLabel value="meat" control={<Radio />} label="肉" />
                            <FormControlLabel value="fish" control={<Radio />} label="魚" />
                            <FormControlLabel value="vegetable" control={<Radio />} label="野菜" />
                            <FormControlLabel value="soup" control={<Radio />} label="汁物" />
                            <FormControlLabel value="dessert" control={<Radio />} label="デザート" />
                            <FormControlLabel value="noodles" control={<Radio />} label="麺" />
                            <FormControlLabel value="bread" control={<Radio />} label="パン" />
                        </RadioGroup>
                        <FormLabel id="genreTagGroup">ジャンル :</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="genreTagGroupLabel"
                            name="genreTagGroup"
                            value={recipeDetailInfo.genre_tag}
                        >
                            <FormControlLabel value="japanese" control={<Radio />} label="和食" />
                            <FormControlLabel value="western" control={<Radio />} label="洋食" />
                            <FormControlLabel value="chinese" control={<Radio />} label="中華" />
                            <FormControlLabel value="other" control={<Radio />} label="その他" />
                        </RadioGroup>
                        <FormLabel id="jitanTagGroup">時間 :</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="jitanTagGroupLabel"
                            name="jitanTagGroup"
                            value={recipeDetailInfo.jitan_tag}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="時短" />
                            <FormControlLabel value={false} control={<Radio />} label="指定なし" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={styles.imageUrl}>
                    {recipeDetailInfo.image_1 && <img className={styles.image} src={recipeDetailInfo.image_1} alt="error" />}
                    {recipeDetailInfo.image_2 && <img className={styles.image} src={recipeDetailInfo.image_2} alt="error" />}
                    {recipeDetailInfo.image_3 && <img className={styles.image} src={recipeDetailInfo.image_3} alt="error" />}
                </div>
                <div className={styles.memo}>
                    <TextField
                        id="outlined-multiline-static"
                        label="メモ"
                        multiline
                        rows={6}
                        defaultValue={recipeDetailInfo.memo}></TextField>
                </div>
                <div className={styles.saveButton}>
                    <Button >保存</Button>
                </div>
            </div>
        </div>
    )
}

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const Button = styled(BaseButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
        }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &:active {
      background-color: ${blue[700]};
      box-shadow: none;
      transform: scale(0.99);
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    } `,
)