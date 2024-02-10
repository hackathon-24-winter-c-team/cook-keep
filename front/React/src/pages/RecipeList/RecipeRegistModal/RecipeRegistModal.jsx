/*Modal画面*/

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TagSelect } from '../TagSelect/TagSelect';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

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

  const [nums, setNums] = useState([1]);
  const [recipes, setRecipes] = useState([0]);

  const onChangeRecipe = (event) => setRecipes(event.target.value);

  /*レシピ追加時の処理*/
  const onClickAdd = () => {
    const newRecipeCardList = [...recipes, nums];
    setRecipes(newRecipeCardList);
    setNums(nums + 1);
    alert(recipes);
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
          <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
            New Recipe
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, color: 'green', textAlign: 'center' }}>
            ここで新しいレシピを登録する
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', mr: 3 }, textAlign: 'center'
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="Recipe URL" variant="standard"></TextField>
            <TextField id="standard-basic" label="Recipe Name" variant="standard"></TextField>
            <TextField id="standard-basic" label="Image URL" variant="standard"></TextField>
          </Box>
          <TagSelect />
          <Box sx={{ display: 'flex', mb: 2, mt: 2 }}>
            <TextareaAutosize
              minRows={10}
              maxRows={10}
              aria-label="maximum height"
              placeholder="memo"
              style={{ width: "100%", }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Stack spacing={2} direction="row" sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={onClickAdd} onChange={onChangeRecipe}>Add</Button>
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