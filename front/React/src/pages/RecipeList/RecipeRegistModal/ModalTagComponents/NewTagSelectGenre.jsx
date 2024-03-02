import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './NewTagSelect.module.css'

export const NewTagSelectGenre = () => {
  // 各カテゴリの選択された値を管理するステート
  const [genre, setGenre] = React.useState('');


  // 'ジャンル' カテゴリの選択値を更新する関数
  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  return (
    <div className={styles.taglist}>
      {/* 'ジャンル' カテゴリのセレクトメニュー */}
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="genre-select-label">ジャンル</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={genre}
          label="ジャンル"
          onChange={handleGenreChange}
        >
          <MenuItem value="" sx={{height: 35}}>
            <em></em>
          </MenuItem>
          <MenuItem value={'japanese'}>和食</MenuItem>
          <MenuItem value={'western'}>洋食</MenuItem>
          <MenuItem value={'chinese'}>中華</MenuItem>
          <MenuItem value={'other'}>その他</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}