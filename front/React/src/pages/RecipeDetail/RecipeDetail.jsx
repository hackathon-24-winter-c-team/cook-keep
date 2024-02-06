import styles from './RecipeDetail.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import TextField from '@mui/material/TextField';

export const RecipeDetail = () => {

    const navigate = useNavigate();
    const handleCancelIconClick = () => {
        navigate('/Recipes')
    }


    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <h2>レシピ詳細ページ</h2>
                <CancelIcon className={styles.CancelIcon} onClick={handleCancelIconClick}/>
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
            

        </div>
    )
}