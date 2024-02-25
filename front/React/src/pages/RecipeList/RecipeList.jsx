import styles from './RecipeList.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { SearchBar } from './SearchBar';
import { TagSelect } from './TagSelect/TagSelect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RecipeRegistModal } from './RecipeRegistModal/RecipeRegistModal';
import { UserInfoModal } from './UserInfoModal/UserInfoModal';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../state/userState';
import { recipesState } from '../../state/recipesState';
import axios from 'axios';
import { dbEndpoint } from '../../api/endpoint/dbEndpoint';

// レシピ一覧の主要コンポーネント
export const RecipeList = () => {
    const [recipes, setRecipes] = useRecoilState(recipesState) // レシピのデータをRecoilで管理
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState); // ログインユーザーをグローバルに保持する
    const [modalOpen, setModalOpen] = useState(false); // レシピ登録モーダルの表示状態を管理
    const [searchTerm, setSearchTerm] = useState(''); // 検索バーのテキストを管理
    const [filteredRecipes, setFilteredRecipes] = useState([]); // フィルタリングされたレシピリストを管理
    const [searchTag, setSearchTag] = useState([]); // タグを選択した状態を管理

    useEffect(() => {
        async function fetchRecipes() {
            // currentUserがnullでないことを確認する
            if (currentUser) {
                try {
                    const response = await axios.get(`${dbEndpoint}/Recipes`);
                    console.log(response.data);
                    setRecipes(response.data);
                } catch (error) {
                    console.error('Failed to fetch recipes', error);
                }
            }
        }
        fetchRecipes();
    },[currentUser, setRecipes]);

    useEffect(() => {
        let results = searchTerm
            ? recipes.filter(recipe => 
                hiraganaToKatakana(recipe.recipe_name).includes(hiraganaToKatakana(searchTerm))
            )
            : recipes; 

        // タグによる検索を追加
        if (searchTag.length > 0) {
            results = results.filter(recipe => 
                searchTag.every(tag =>
                    tag === recipe.main_tag ||
                    tag === recipe.genre_tag ||
                    (tag === "jitan" && recipe.jitan_tag)
                    )
            )
        }
        setFilteredRecipes(results);
    },[searchTerm, recipes, searchTag]);

    // ひらがなをカタカナに変換する関数
    const hiraganaToKatakana = (str) => {
        return str.replace(/[\u3041-\u3096]/g, match =>
          String.fromCharCode(match.charCodeAt(0) + 0x60)
        );
      };

    // タグが選択されたときに実行される関数
    const handleTagsChange = (selectedTags) => {
        setSearchTag(selectedTags);
    }

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
                    <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <LogoutIcon className={styles.logoutIcon} onClick={handleLogout}/>
                </ul>
            </div>
            
            <div>
                <TagSelect onTagsChange={(handleTagsChange)}/>
            </div>
            <div>
                {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} recipeDetail={handleDetailClick}/>
                ))}
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