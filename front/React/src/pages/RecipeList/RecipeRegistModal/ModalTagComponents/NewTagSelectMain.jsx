import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './NewTagSelect.module.css'

export const NewTagSelectMain = (props, Main, handleMainChange) => {

  alert(props);

  return (
    <div className={styles.taglist}>
      {/* 'メイン' カテゴリのセレクトメニュー */}
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="main-select-label">メイン</InputLabel>
        <Select
          labelId="main-select-label"
          id="main-select"
          value={Main}
          label="メイン"
          onChange={handleMainChange}
        >
          <MenuItem value="" sx={{height: 35}}>
            <em></em>
          </MenuItem>
          <MenuItem value={'rice'}>ご飯</MenuItem>
          <MenuItem value={'meat'}>肉</MenuItem>
          <MenuItem value={'fish'}>魚</MenuItem>
          <MenuItem value={'vegetable'}>野菜</MenuItem>
          <MenuItem value={'soup'}>汁物</MenuItem>
          <MenuItem value={'dessert'}>デザート</MenuItem>
        </Select>
      </FormControl>


    </div>
  );
}