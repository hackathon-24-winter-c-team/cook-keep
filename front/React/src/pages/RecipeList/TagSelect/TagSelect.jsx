import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './TagSelect.module.css'
import PropTypes from 'prop-types';

export const TagSelect = ({ onTagsChange }) => {
  // 各カテゴリの選択された値を管理するステート
  const [selectedTags, setSelectedTags] = React.useState({
    main: '',
    genre: '',
    jitan: ''
  });

  // 選択されたタグを更新する関数
    const handleChange = (category) => (event) =>{
      const newSelectedTags = { ...selectedTags, [category]: event.target.value };
      console.log('newSelectedTags:', newSelectedTags)
      setSelectedTags(newSelectedTags);

      // オグジェクトから空でない値のみを抽出して配列に変換
      const tagsArray = Object.values(newSelectedTags).filter(tag => tag !== '');

      onTagsChange(tagsArray);
    }


  // const handleMainChange = (event) => {
  //   setMain(event.target.value);
  // };

  // const handliGenreChange = (event) => {
  //   setGenre(event.target.value)
  // }

  // const handleJitanChange = (event) => {
  //   setJitan(event.target.value)
  // }

  return (
    <div className={styles.taglist}>
      {/* 'メイン' カテゴリのセレクトメニュー */}
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="main-select-label">メイン</InputLabel>
      <Select
        labelId="main-select-label"
        id="main-select"
        value={selectedTags.main}
        label="メイン"
        onChange={handleChange('main')}
      >
        <MenuItem value="">
          <em>指定なし</em>
        </MenuItem>
        <MenuItem value={'rice'}>ご飯</MenuItem>
        <MenuItem value={'meat'}>肉</MenuItem>
        <MenuItem value={'fish'}>魚</MenuItem>
        <MenuItem value={'vegetable'}>野菜</MenuItem>
        <MenuItem value={'soup'}>汁物</MenuItem>
        <MenuItem value={'dessert'}>デザート</MenuItem>
      </Select>
    </FormControl>
    
        {/* 'ジャンル' カテゴリのセレクトメニュー */}
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="genre-select-label">ジャンル</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={selectedTags.genre}
          label="ジャンル"
          onChange={handleChange('genre')}
        >
          <MenuItem value="">
            <em>指定なし</em>
          </MenuItem>
          <MenuItem value={'japanese'}>和食</MenuItem>
          <MenuItem value={'western'}>洋食</MenuItem>
          <MenuItem value={'chinese'}>中華</MenuItem>
          <MenuItem value={'other'}>その他</MenuItem>
        </Select>
      </FormControl>

      {/* '時短' カテゴリのセレクトメニュー */}
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="jitan-select-label">時間</InputLabel>
      <Select
        labelId="jitan-select-label"
        id="jitan-select"
        value={selectedTags.jitan}
        label="時短"
        onChange={handleChange('jitan')}
      >
        <MenuItem value="">
          <em>指定なし</em>
        </MenuItem>
        <MenuItem value={'jitan'}>時短</MenuItem>
      </Select>
    </FormControl>
      </div>
  );
}

TagSelect.propTypes = {
  onTagsChange: PropTypes.func,
};