import { User } from '../../interfaces/user.ts'
import { LoaderShow } from '../miniComponents/LoaderShow.tsx'
import { AuthForm } from './authForm/AuthForm.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface AuthScreenInterface {
  loginedUsers: User[];
  setLoginedUsers: any;
  setActivUserId: any;
}

function AuthScreen({loginedUsers, setLoginedUsers, setActivUserId}: AuthScreenInterface) {
  
  // const [email, setEmail] = useState<string>('')
  // const [leng, setLeng] = useState<string>(window.navigator.language.substring(0,2) ? window.navigator.language.substring(0,2) : 'en')
  // const [authCode, setAuthCode] = useState<number>()

    return (
      <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_TOKEN}>
      <AuthForm
        loginedUsers={loginedUsers}
        setLoginedUsers={setLoginedUsers}
        setActivUserId={setActivUserId}
      // setLeng={setLeng} 
      // email={email} 
      // setEmail={setEmail} 
      // authCode={authCode} 
      // setAuthCode={setAuthCode}
      // leng={leng}
      />
      </GoogleOAuthProvider>
      </>
    )
  
  return (
    <LoaderShow/>
  )
  
}

export default  AuthScreen
