import styles from './RecipeList.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { SearchBar } from './SearchBar';
import { TagSelect } from './TagSelect/TagSelect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RecipeRegistModal } from './RecipeRegistModal/RecipeRegistModal';
import { UserInfoModal } from './UserInfoModal/UserInfoModal';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../state/userState';

// レシピ一覧の主要コンポーネント
export const RecipeList = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const [modalOpen, setModalOpen] = React.useState(false); // レシピ登録モーダルの表示状態を管理
    // モーダルを開く関数
    const handleOpenModal = () => {
        setModalOpen(true); //tureにすることでモーダルを表示する
    }

    const [userModalOpen, setUserModalOpen] = React.useState(false); // レシピ登録モーダルの表示状態を管理
    // モーダルを開く関数
    const handleOpenUserModal = () => {
        setUserModalOpen(true); //tureにすることでモーダルを表示する
    }

    const navigate = useNavigate();

    // レシピ詳細ページへ遷移する関数 1はレシピIDに変更する必要アリ
    const handleDetailClick = () => {
        navigate('/recipes/1');
    };

    // ログインしていなかったらログインページへ画面遷移
    React.useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    },[currentUser, navigate]); // 依存配列を定義、この値が変更された時のみログインページに遷移する
    
    // ログアウトする関数
    const handleLogout = () => {
        setCurrentUser(null); // ユーザーの状態をnullにする
        navigate('/')
    }

    return (
        <>
            <div className={styles.header}>
                <ul>
                    <AccountCircleIcon className={styles.userIcon} fontSize='large' onClick={handleOpenUserModal}/>
                    {userModalOpen && <UserInfoModal open={userModalOpen} setOpen={setUserModalOpen} />}
                    <SearchBar />
                    <LogoutIcon className={styles.logoutIcon} onClick={handleLogout}/>
                </ul>
            </div>
            
            <div>
                <TagSelect />
            </div>
            <EditIcon className={styles.editIcon} onClick={handleDetailClick} />
            <br />
            <div>
                <RecipeCard />
            </div>
            <div>
                <AddCircleIcon
                    className={styles.newRecipeIcon}
                    sx={{ fontSize: 60 }}
                    color='primary'
                    onClick={handleOpenModal} />
                {/* モーダルが開かれている（modalOpenがtrue）場合にのみ、レシピ登録モーダルを表示 */}
                {modalOpen && <RecipeRegistModal open={modalOpen} setOpen={setModalOpen} />}
            </div>
        </>
    )
}