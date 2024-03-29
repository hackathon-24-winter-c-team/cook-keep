import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../../state/userState';
/* import { authEndpoint } from '../../api/endpoint/signupEndpoint';
 */import { domainEndpoint } from '../../api/endpoint/domainEndpoint';
import { loginEndpoint } from '../../api/endpoint/loginEndpoint';



export const Login = () => {
    const initialValues = {username: "", password: "" } // フォームの初期値を設定
    const [formValues, setFormValues] = useState(initialValues) // フォームの値の状態
    const [formErrors, setFormErrors] = useState({}) // フォームのエラーの状態
    const navigate = useNavigate() // ナビゲーション関数
    const setCurrentUser = useSetRecoilState(currentUserState);

    // フォームの入力値が変更された時に呼び出される関数
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    // フォームが送信された時に呼び出される関数
    const handleSubmit = async (e) => {
        e.preventDefault();  // デフォルトの送信動作を防止
        setFormErrors({}); //エラーメッセージーの初期化
        const errors = validate(formValues);
        setFormErrors(errors); 
        //エラーがなければレシピ一覧ページへリダイレクト
        if (Object.keys(errors).length === 0) {
            try {
                // json-serverにログインリクエストを送信
                const response = await axios.post( `${domainEndpoint}${loginEndpoint}`, {
                    username: formValues.username,
                    password: formValues.password
                });
                // 認証成功の処理（ユーザーが見つかった場合）
                if (response.data.token) {
                    // ログインユーザー情報をグローバルに保持する
                    setCurrentUser(response.data.token);
                    // レシピ一覧ページへリダイレクト
                    navigate('/recipes');
                } else {
                    // ログイン失敗のエラーをセット
                    setFormErrors({ ...formErrors, submit: 'ログイン情報が正しくありません' });
                }
            } catch (error) {
                console.error('Login error:', error);
                // サーバーエラーの場合の処理
                setFormErrors({ ...formErrors, submit: 'ログイン時にエラーが発生しました。' });
            }
        }
    };

    // フォームの値を検証し、エラーがあればそれを返す関数
    const validate = (values) => {
        const errors = {};
        // const regex = 
        //     /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if(!values.username) {
            errors.username = "メールアドレスを入力してください";
        // } else if (!regex.test(values.username)) {
        //     errors.username = "正しいメールアドレスを入力してください";
        }
        if(!values.password) {
            errors.password = "パスワードを入力してください";
        } else if (values.password.length < 4) {
            errors.password = "4文字以上15文字以下のパスワードを入力してください"
        } else if (values.password.length > 15) {
        errors.password = "4文字以上15文字以下のパスワードを入力してください"
        }
        return errors;
    }

    // 新規登録ページへの画面遷移を処理する関数
    const handleSignupRedirect = () => {
        navigate('/signup') // '/signup'への遷移を実行
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <img src="/topicon2.png" alt="cook keep logo" className={styles.logo}/>
                <h1>ログインフォーム</h1>
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <TextField id="username" label="ユーザー名" variant="standard" name="username" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.username}</p>
                    <div className={styles.formField}>
                        <TextField id="password" label="パスワード" variant="standard" name="password" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.password}</p>
                    <Button variant="contained" color="success" type='submit'>ログイン</Button>
                    <p className={styles.errorMsg}>{formErrors.submit}</p>  
                    <Button variant="contained" onClick={handleSignupRedirect}>新規登録</Button>
                </div>
            </form>
        </div>
    )
}