import styles from './Signup.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
/* import { dbEndpoint } from '../../api/endpoint/dbEndpoint';
 */import { domainEndpoint } from '../../api/endpoint/domainEndpoint';
import { signupEndpoint } from '../../api/endpoint/signupEndpoint';


export const Signup = () => {
    const initialValues = {username: "", mailAddress: "", password: "" } // フォームの初期値を設定
    const [formValues, setFormValues] = useState(initialValues) // フォームの値の状態
    const [formErrors, setFormErrors] = useState({}) // フォームのエラーの状態
    const navigate = useNavigate() // ナビゲーション関数

    // フォームの入力値が変更された時に呼び出される関数
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    // フォームが送信された時に呼び出される関数
    const handleSubmit = async (e) => {
        e.preventDefault(); // デフォルトの送信動作を防止
        setFormErrors({}); //エラーメッセージーの初期化
        const errors = validate(formValues); // 入力値のバリデーション
        setFormErrors(errors);  //エラー状態の更新

        // エラーがない場合、登録成功のアラートを表示し、リダイレクトを実行
        if (Object.keys(errors).length === 0) {
            try {
                // json-serverにPOSTリクエストを送信
                const response = await axios.post(`${domainEndpoint}/${signupEndpoint}`, {
                    username: formValues.username,
                    email: formValues.mailAddress,
                    password: formValues.password // 本来はパスワードをそのまま保存しない
                });

                // POSTリクエストが成功した場合の処理
                console.log('Signup Success:', response.data);
                navigate('/');  // ログインページへのリダイレクト         
            } catch (error) {
                // エラー発生時の処理
                console.error('Signup Error:', error);
                alert("登録に失敗しました")
            }
        }
    };

    // 入力値のバリデーションを行い、エラーがあればそれを返す
    const validate = (values) => {
        const errors = {};
        const regex = 
            /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if(!values.username) {
            errors.username = "ユーザー名を入力してください";
        }
        if(!values.mailAddress) {
            errors.mailAddress = "メールアドレスを入力してください";
        } else if (!regex.test(values.mailAddress)) {
            errors.mailAddress = "正しいメールアドレスを入力してください";
        }
        if(!values.username) {
            errors.password = "パスワードを入力してください";
        } else if (values.password.length < 4) {
            errors.password = "4文字以上15文字以下のパスワードを入力してください"
        } else if (values.password.length > 15) {
        errors.password = "4文字以上15文字以下のパスワードを入力してください"
        }
        return errors;
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <img src="/topicon2.png" alt="cook keep logo" className={styles.logo}/>
                <h1>サインアップ</h1>
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <TextField id="standard-basic" label="名前" variant="standard" name="username" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.username}</p>
                    <div className={styles.formField}>
                        <TextField id="standard-basic" label="メールアドレス" variant="standard" name="mailAddress" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.mailAddress}</p>
                    <div className={styles.formField}>
                        <TextField id="standard-basic" label="パスワード" variant="standard" name="password" onChange={(e) => handleChange(e)}/>
                    </div>
                    <p className={styles.errorMsg}>{formErrors.password}</p>
                    <Button type='submit' variant="contained">登録する</Button>
                </div>
            </form>
        </div>
    )
}