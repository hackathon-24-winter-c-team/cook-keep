import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export const Login = () => {
    const initialValues = {mailAddress: "", password: "" } // フォームの初期値を設定
    const [formValues, setFormValues] = useState(initialValues) // フォームの値の状態
    const [formErrors, setFormErrors] = useState({}) // フォームのエラーの状態
    const [isSubmit, setIsSubmit] = useState(false) // 送信状態
    const navigate = useNavigate() // ナビゲーション関数

    // フォームの入力値が変更された時に呼び出される関数
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    // フォームが送信された時に呼び出される関数
    const handleSubmit = (e) => {
        e.preventDefault();  // デフォルトの送信動作を防止
        const errors = validate(formValues);
        setFormErrors(errors); 
        setIsSubmit(true) // 送信状態をtrueに設定
        //エラーがなければレシピ一覧ページへリダイレクト
        if (Object.keys(errors).length === 0) {
            navigate('/recipes')
        }
    };

    // フォームの値を検証し、エラーがあればそれを返す関数
    const validate = (values) => {
        const errors = {};
        const regex = 
            /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if(!values.mailAddress) {
            errors.mailAddress = "メールアドレスを入力してください";
        } else if (!regex.test(values.mailAddress)) {
            errors.mailAddress = "正しいメールアドレスを入力してください";
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
                        <TextField id="standard-basic" label="メールアドレス" variant="standard" name="mailAddress" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.mailAddress}</p>
                    <div className={styles.formField}>
                        <TextField id="standard-basic" label="パスワード" variant="standard" name="password" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.password}</p>
                    <Button variant="contained" color="success" type='submit'>ログイン</Button>
                    {Object.keys(formErrors).length === 0 && isSubmit && (
                        <div className={styles.msgOk}>ログインに成功しました</div>
                    )}
                    <Button variant="contained" onClick={handleSignupRedirect}>新規登録</Button>
                </div>
            </form>
        </div>
    )
}