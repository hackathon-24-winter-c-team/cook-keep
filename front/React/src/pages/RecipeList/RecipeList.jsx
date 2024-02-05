import styles from './RecipeList.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { SearchBar } from './SearchBar';
import { TagSelect } from './TagSelect/TagSelect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
export const RecipeList = () => {
    return (
        <>
            <div className={styles.header}>
                <ul>
                    <AccountCircleIcon className={styles.userIcon} fontSize='large'/>
                    <SearchBar />
                    <LogoutIcon className={styles.logoutIcon} />
                </ul>
            </div>
            <div>
                <TagSelect />
            </div>
            <div>
                <AddCircleIcon className={styles.newRecipeIcon} sx={{ fontSize: 60}} color='primary'/>
            </div>
        </>
    )
}