import Home from '../../../pages/index'

const withAuth = (Component) => {
    const Auth = (props) =>{
        const {isLoggedIn} = props
        if(isLoggedIn){
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