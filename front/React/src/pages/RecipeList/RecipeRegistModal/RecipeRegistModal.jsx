/*Modal画面*/
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
/* import { NewTagSelectMain } from './ModalTagComponents/NewTagSelectMain';
import { NewTagSelectGenre } from './ModalTagComponents/NewTagSelectGenre';
import { NewTagSelectJitan } from './ModalTagComponents/NewTagSelectJitan';
 */import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../../../state/userState';
import { recipesState } from '../../../state/recipesState';



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

  const recipeInfo = { recipename: "", recipeurl: "", imageurl: "", main: "", genre: "", jitan: "", memo: "" } //レシピ追加モーダルの初期値
  const [recipeValues, setRecipeValues] = useState(recipeInfo) // レシピ追加モーダルの値の状態
  const [recipeErrors, setRecipeErrors] = useState({}) // レシピ追加モーダルのエラーの状態
  const navigate = useNavigate() // ナビゲーション関数
  const currentUser = useRecoilValue(currentUserState);
  const setRecipesState = useSetRecoilState(recipesState)

  // レシピ追加モーダルの入力値が変更された時に呼び出される関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeValues({ ...recipeValues, [name]: value })
  }

  // 入力値のバリデーションを行い、エラーがあればそれを返す
  const validate = (values) => {
    const errors = {};

    if (!values.recipename) {
      errors.recipename = "レシピ名を入力してください";
    }
    if (!values.recipeurl && !values.imageurl) {
      errors.recipeurl = "レシピURL、または画像URLを入力してください";
      errors.imageurl = "レシピURL、または画像URLを入力してください"
    }
    if (!values.main) {
      errors.main = "メインタグを入力してください";
    }
    if (!values.genre) {
      errors.genre = "ジャンルタグを入力してください";
    }
    return errors;
  }

  // フォームが送信された時に呼び出される関数
  const onClickAdd = async () => {

    setRecipeErrors({}); //エラーメッセージーの初期化
    const errors = validate(recipeValues); // 入力値のバリデーション
    setRecipeErrors(errors);  //エラー状態の更新

    // エラーがある場合は処理を中断し、ユーザーに通知
    if (Object.keys(errors).length > 0) {
      return;
    }

    // エラーがない場合、登録成功のアラートを表示し、リダイレクトを実行
    if (Object.keys(errors).length === 0) {
        try {
            const recipeData = {
              user_id: currentUser.id,
              recipe_name: recipeValues.recipename,
              data_url: recipeValues.recipeurl,
              memo: recipeValues.memo,
              images: recipeValues.imageurl,
              tags: [recipeValues.main, recipeValues.genre, recipeValues.jitan]
            }
             // json-serverにPOSTリクエストを送信
            const response = await axios.post('http://localhost:3001/Recipes', recipeData
            );
            setRecipesState(oldRecipes => [...oldRecipes, response.data]);
            // POSTリクエストが成功した場合の処理
            alert("レシピが登録されました");
            console.log('Add Success:', response.data);
            handleClose();
            navigate('/recipes');  // レシピ一覧ページへのリダイレクト         
          } catch (error) {
            // エラー発生時の処理
            console.error('Add Error:', error);
            alert("登録に失敗しました")
          }
        }
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
            <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ color: 'orange', fontWeight: 'bold', textAlign: 'center', mt: 3 }}>
              新しいレシピを登録
            </Typography>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch', mr: 3 }, textAlign: 'center'
              }}
              noValidate
              autoComplete="off"
            >
              <TextField 
              id="recipe-name" 
              label="レシピ名 " 
              variant="standard" 
              name="recipename" 
              onChange={(e) => handleChange(e)} 
              error={Boolean(recipeErrors.recipename)}
              helperText={recipeErrors.recipename || ' '}
              />

              <TextField 
              id="recipe-url" 
              label="レシピ URL" 
              variant="standard" 
              name="recipeurl" 
              onChange={(e) => handleChange(e)}
              error={Boolean(recipeErrors.recipeurl)}
              helperText={recipeErrors.recipeurl || ' '}
              />

              <TextField 
              id="recipe-image" 
              label="画像 URL" 
              variant="standard" 
              name="imageurl" 
              onChange={(e) => handleChange(e)} 
              error={Boolean(recipeErrors.imageurl)}
              helperText={recipeErrors.imageurl || ' '}
              />
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
                    label="メイン"
                    value={recipeValues.main}
                    name="main"
                    onChange={(e) => handleChange(e)}
                    error={Boolean(recipeErrors.main)}
                    helperText={recipeErrors.main || ' '}      
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
                    label="ジャンル"
                    value={recipeValues.genre}
                    name="genre"
                    onChange={handleChange}
                    error={Boolean(recipeErrors.genre)}
                    helperText={recipeErrors.genre || ' '}      
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
                    label="時短"
                    value={recipeValues.jitan}
                    name="jitan"
                    onChange={handleChange}
                  >
                    <MenuItem value="" sx={{ height: 35 }}>
                    </MenuItem>
                    <MenuItem value={'jitan'}>時短</MenuItem>
                    <MenuItem value={'sonota'}>その他</MenuItem>
                  </Select>
                </FormControl>
              </div>


            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                    id="outlined-multiline-static"
                    label="メモ"
                    multiline
                    rows={6}
                    name="memo"
                    defaultValue=""
                    onChange={handleChange}
                />
            </Box>
            {/* <Box sx={{ display: 'flex', mb: 2, mt: 2 }}>
              <TextareaAutosize
                minRows={10}
                maxRows={10}
                aria-label="maximum height"
                placeholder="memo"
                style={{ width: "100%", }}
                name="memo"
                onChange={handleChange}
              />
            </Box> */}
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