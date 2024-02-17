/*Modal画面*/
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
/* import { NewTagSelectMain } from './ModalTagComponents/NewTagSelectMain';
import { NewTagSelectGenre } from './ModalTagComponents/NewTagSelectGenre';
import { NewTagSelectJitan } from './ModalTagComponents/NewTagSelectJitan';
 */import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '10px'

};

export const RecipeRegistModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  // レシピ名の値を管理するステート
  const [name, setName] = useState("");

  // レシピ名を更新する関数
  const inputName = (event) => {
    setName(event.target.value)
  };

  // レシピURLを管理するステート
  const [recipeUrl, setRecipeUrl] = useState("");

  // レシピURLを更新するステート
  const inputRecipeUrl = (event) => {
    setRecipeUrl(event.target.value)
  }

  // 画像URLを管理するステート
  const [imageUrl, setImageUrl] = useState("");

  // 画像URLを更新するステート
  const inputImageUrl = (event) => {
    setImageUrl(event.target.value)
  }

  // 各カテゴリの選択された値を管理するステート
  const [main, setMain] = useState('');
  const [genre, setGenre] = useState('');
  const [jitan, setJitan] = useState('');


  // 'メイン' カテゴリの選択値を更新する関数
  const handleMainChange = (event) => {
    setMain(event.target.value);
  };

  // 'ジャンル' カテゴリの選択値を更新する関数
  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  // '時短' カテゴリの選択値を更新する関数
  const handleJitanChange = (event) => {
    setJitan(event.target.value)
  }

  // メモを管理するステート
  const [memo, setMemo] = useState("");

  // メモを更新するステート
  const inputMemo = (event) => {
    setMemo(event.target.value)
  }


  /*レシピ追加時の処理*/
  const onClickAdd = () => {
    if (name === "") {
      alert("レシピ名を入力してください")
      return;
    }
    if (main === "") {
      alert("メインタグを選択して下さい")
      return;
    }
    if (genre === "") {
      alert("ジャンルタグを選択して下さい")
      return;
    }
    if (jitan === "") {
      alert("時間タグを選択してください")
      return;
    }

    if (recipeUrl === "" || imageUrl === "") {
      alert("レシピURL、または画像URLを入力して下さい");
      return;
    }

    handleClose();

  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ color: 'red', fontWeight: 'bold', textAlign: 'center', mt: 3 }}>
            新しいレシピ
          </Typography>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', mr: 3 }, textAlign: 'center'
            }}
            noValidateÏ
            autoComplete="off"
          >
            <TextField id="standard-basic" label="レシピ名 " variant="standard" value={name} onChange={inputName} ></TextField>
            <TextField id="standard-basic" label="レシピ URL" variant="standard" value={recipeUrl} onChange={inputRecipeUrl} ></TextField>
            <TextField id="standard-basic" label="画像 URL" variant="standard" value={imageUrl} onChange={inputImageUrl} ></TextField>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/*             <NewTagSelectMain />
            <NewTagSelectGenre />
            <NewTagSelectJitan />
 */}

            <div>
              {/* 'メイン' カテゴリのセレクトメニュー */}
              <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <InputLabel id="main-select-label">メイン</InputLabel>
                <Select
                  labelId="main-select-label"
                  id="main-select"
                  value={main}
                  label="メイン"
                  onChange={handleMainChange}
                >
                  <MenuItem value="" sx={{ height: 35 }}>
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

            <div>
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
                  <MenuItem value="" sx={{ height: 35 }}>
                    <em></em>
                  </MenuItem>
                  <MenuItem value={'japanese'}>和食</MenuItem>
                  <MenuItem value={'western'}>洋食</MenuItem>
                  <MenuItem value={'chinese'}>中華</MenuItem>
                  <MenuItem value={'other'}>その他</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
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
                  <MenuItem value="" sx={{ height: 35 }}>
                    <em></em>
                  </MenuItem>
                  <MenuItem value={'jitan'}>時短</MenuItem>
                  <MenuItem value={'sonota'}>その他</MenuItem>
                </Select>
              </FormControl>
            </div>


          </Box>

          <Box sx={{ display: 'flex', mb: 2, mt: 2 }}>
            <TextareaAutosize
              minRows={10}
              maxRows={10}
              aria-label="maximum height"
              placeholder="memo"
              style={{ width: "100%", }}
              value={memo}
              onChange={inputMemo}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Stack spacing={2} direction="row" sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={onClickAdd}>追加</Button>
            </Stack>
          </Box>
        </Box>
      </Modal >
    </div>
  );
}

RecipeRegistModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};