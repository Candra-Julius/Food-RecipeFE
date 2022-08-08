// import { useRouter } from 'next/router'
import Login from '../../../pages/login'

const withOutAuth = (Component) => {
    const Auth = (props) =>{
        const {isLoggedIn} = props
        // const router = useRouter()
        if(!isLoggedIn){
            // router.push('/login')
            return (
                <Login/>
            )
        }
        return(
            <Component {...props}/>
        )
    }
    if(Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }
    return Auth
}

export default withOutAuth