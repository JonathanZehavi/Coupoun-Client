import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'



export type AllowdRoles = {
    allowdRoles: string
}


function RequireAuth({ allowdRoles }: AllowdRoles) {

    const { tokenDecoded } = useAuth()

    return (
        !localStorage.getItem('isLoggedIn') ?
            <Navigate to={'login'} replace />
            :
            allowdRoles === tokenDecoded()
                ?
                <Outlet />
                :
                <Navigate to={'unauthorized'} replace />
    )
}

export default RequireAuth