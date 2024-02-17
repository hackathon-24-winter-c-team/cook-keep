import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './NewTagSelect.module.css'

export const NewTagSelectJitan = () => {
  // 各カテゴリの選択された値を管理するステート
  const [jitan, setJitan] = React.useState('');

  // '時短' カテゴリの選択値を更新する関数
  const handleJitanChange = (event) => {
    setJitan(event.target.value)
  }

  return (
    <div className={styles.taglist}>
      {/* '時短' カテゴリのセレクトメニュー */}
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="jitan-select-label">時間</InputLabel>
      <Select
        labelId="jitan-select-label"
        id="jitan-select"
        value={jitan}
        label="時短"
        onChange={handleJitanChange}
      >
        <MenuItem value="" sx={{height: 35}}>
          <em></em>
        </MenuItem>
        <MenuItem value={'jitan'}>時短</MenuItem>
        <MenuItem value={'sonota'}>その他</MenuItem>
      </Select>
    </FormControl>
      </div>
  );
}