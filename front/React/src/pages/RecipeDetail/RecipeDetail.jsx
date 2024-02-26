import styles from './RecipeDetail.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import Brightness1Icon from '@mui/icons-material/Brightness1';
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
import { dbEndpoint } from '../../api/endpoint/dbEndpoint';


export const RecipeDetail = () => {

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
        const isConfirmed = window.confirm('レシピを削除してもよろしいですか？');
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await axios.delete(`${dbEndpoint}/Recipes/{ここにレシピIDを追加する}`); // ここに表示しているレシピIDを追加
            alert('レシピが削除されました');
            console.log('Delete response:', response.data)   // 削除されたレシピの確認
            NavigationPreloadManager('/Recipes');
        } catch (error) {
            console.error('レシピ削除中にエラーが発生しました:', error);
            alert('レシピの削除に失敗しました')
        }
    }


    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <ArrowBackIcon className={styles.arrowBack} fontSize='large' onClick={handleArrowBack}/>
                <h2>レシピ詳細ページ</h2>
                <DeleteForeverIcon className={styles.CancelIcon} fontSize='large' onClick={handleRecipeDelete}/>
            </div>
            <div className={styles.recipeIcon}>
                <Brightness1Icon sx={{ fontSize: 60 }} className={styles.icon1}/>
                <Brightness1Icon sx={{ fontSize: 60 }} className={styles.icon2}/>
                <Brightness1Icon sx={{ fontSize: 60 }} className={styles.icon3}/>
            </div>
            <div className={styles.url}>
                <p>urlを表示</p>
            </div>
            <div className={styles.TextField}>
                <TextField id='recipeId' placeholder='レシピ名'/>
            </div>
            <div className={styles.tagGroup}>
            <FormControl >
                <FormLabel id="mainTagGroup">メイン :</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="mainTagGroupLabel"
                    name="mainTagGroup"
                    
                >
                    <FormControlLabel value="rice" control={<Radio />} label="ご飯" />
                    <FormControlLabel value="meet" control={<Radio />} label="肉" />
                    <FormControlLabel value="fish" control={<Radio />} label="魚" />
                    <FormControlLabel value="vegetable" control={<Radio />} label="野菜" />
                    <FormControlLabel value="soup" control={<Radio />} label="汁物" />
                    <FormControlLabel value="dessert" control={<Radio />} label="デザート" />
                </RadioGroup>
                <FormLabel id="genreTagGroup">ジャンル :</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="genreTagGroupLabel"
                    name="genreTagGroup"
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
                    
                >
                    <FormControlLabel value="jitan" control={<Radio />} label="時短" />
                    <FormControlLabel value="" control={<Radio />} label="指定なし" />
                </RadioGroup>
            </FormControl>
            </div>
            <div className={styles.imageUrl}>
                <p>画像のurlを表示</p>
            </div>
            <div className={styles.memo}>
                <TextField
                    id="outlined-multiline-static"
                    label="メモ"
                    multiline
                    rows={6}
                    defaultValue=""
                />
            </div>
            <div className={styles.saveButton}>
                <Button >保存</Button>
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
    box-shadow: 0 2px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
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