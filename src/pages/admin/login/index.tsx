import { login } from "api/Auth";
import { InputCard, SubmitBtn, LogoTitle, Container } from "components/AuthInput";
import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [ account, setAccount ] = useState('')
  const [ password, setPassword ] = useState('')
  const { login, isAuthenticated } = useAuthContext()

  const navigate = useNavigate()
  function onChangeAccountHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
        setAccount(event.currentTarget.value)
    }
  }
  function onChangePasswordHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
      setPassword(event.currentTarget.value)
    }
  } 
  async function handClickLogin() {
    if (account.length === 0) {
        return;
    }
    if (password.length === 0) {
        return;
    }

    const success = await login({
        account,
        password
    })
    if(success) {
        console.log(success)
    }
}
    return (
      <Container>
        <LogoTitle title="後台登入"/>
        <InputCard 
          type='text'
          name='account'
          id="account"
          label="帳號"
          value={account}
          onChange={onChangeAccountHandler}
          placeholder="請輸入帳號"
          wSize="small"
          hSize="small"
        />
        <InputCard
          type='password'
          name='password'
          id="password"
          label="密碼"
          value={password}
          onChange={onChangePasswordHandler}
          placeholder="請輸入密碼"
          wSize="small"
          hSize="small"
        />
        <SubmitBtn btn="登入"/>
        <div className="mt-6">
          <p className="link text-end" onClick={() => navigate("/login")}>前台登入</p>
        </div>
      </Container>
    )
  };
  
  export default AdminLogin;
  