import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import styles from './UserInfoModal.module.css'
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../state/userState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column', // 子要素を縦方向に並べる
  justifyContent: 'space-evenly',
  alignItems: 'center', // 水平方向の中央に揃える
  
};

export const UserInfoModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const currentUser = useRecoilValue(currentUserState); // ユーザー情報の取得

  // 登録解除ボタンのクリックイベントハンドラ
  const handleUnregister = (e) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防ぐ

      // 登録解除を確認する
    const isConfirmed = window.confirm('本当に登録を解除してよろしいですか？');

    if (isConfirmed) {
        // ユーザーがOKをクリックしたら登録解除する
        console.log('登録が解除されました')
    }
  }



  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-name"
        aria-describedby="user-email"
      >
        <Box sx={style} >
          <Typography id="user-name" variant="h6" component="h2" sx={{ color: 'black' }} >
            ユーザー名： {currentUser.username}
          </Typography>
          <Typography id="user-email" sx={{ mt: 2, color: 'black' }}>
            メールアドレス： {currentUser.email}
          </Typography>
          <button className={styles.deleteButton} onClick={handleUnregister}>登録解除</button>
        </Box>
      </Modal>
    </div>
  );
}

UserInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};