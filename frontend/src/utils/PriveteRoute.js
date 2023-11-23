import { Navigate } from 'react-router-dom'

// admin privet route
const PrivateRoute = ({children, ...rest}) => {

    if(localStorage.getItem("adminKey")){
        return children
    }else{
        return <Navigate to={"/shop/login"} ></Navigate>
    }
}

const LoginRoute = ({children, ...rest}) => {
    if(localStorage.getItem('adminKey')){
        return <Navigate to={'/shop'}></Navigate>
    }else{
        return children
    }
}

// shop privet route
const CustomerPrivetRoute = ({children, ...rest}) => {
    if(localStorage.getItem('userKey')){
        return children
    }else{
        return <Navigate to={'/login'}></Navigate>
    }
}

const CustomerLoginRoute = ({children, ...rest}) => {
    if(localStorage.getItem('userKey')){
        return <Navigate to={'/'}></Navigate>
    }else{
        return children
    }
}

export  {PrivateRoute, LoginRoute, CustomerPrivetRoute, CustomerLoginRoute};