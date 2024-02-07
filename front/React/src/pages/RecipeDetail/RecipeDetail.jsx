import styles from './RecipeDetail.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
            <div className={styles.tagGroup}>
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
        </div>
    )
}