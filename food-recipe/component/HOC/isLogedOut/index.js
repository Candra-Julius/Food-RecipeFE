// import Router, {useRouter} from 'next/router'
import Home from '../../../pages/index'

const withAuth = (Component) => {
    const Auth = (props) =>{
        const {isLoggedIn} = props
        // const router = useRouter()
        if(isLoggedIn){
            // router.push('/login')
            return (
                <Home/>
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

export default withAuth