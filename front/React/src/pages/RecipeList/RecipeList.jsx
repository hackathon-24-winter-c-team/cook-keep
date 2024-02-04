import styles from './RecipeList.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { SearchBar } from './SearchBar';

export const RecipeList = () => {
    return (
        <>
            <div className={styles.header}>
                <ul>
                    <AccountCircleIcon className={styles.userIcon}/>
                    <SearchBar />
                    <LogoutIcon className={styles.logoutIcon}/>
                </ul>
            </div>

        </>
    )
}