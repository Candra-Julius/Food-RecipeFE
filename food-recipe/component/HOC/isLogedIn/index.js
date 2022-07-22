import Login from '../../../pages/login'

const withOutAuth = (Component) => {
    const Auth = (props) =>{
        const {isLoggedIn} = props
        if(!isLoggedIn){
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