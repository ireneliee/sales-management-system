import React from 'react';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SuperAdminLanding from './SuperAdminLanding';
import SignOut from '../components/SignOut';
import AdminLanding from './AdminLanding';
import SalesLanding from './SalesLanding';
const HomeLanding = () => {
    const { user, role, roleLoading, roleError } = useAuth();

    if (roleLoading) return <p>Loading...</p>;
    if (roleError) return (
        <div>
            <p>Your account has yet to be associated with any roles. Please contact the administrator.</p>
            <SignOut/>
        </div>)


    return (
        <div>
            {user ? (
                <>
                    {role === 'SUPERADMIN' ? (
                        <SuperAdminLanding />
                    ) : (
                        <></>
                    )}
                    {role === 'ADMIN' ? (
                        <AdminLanding/>
                    ) : (
                        <></>
                    )}
                    {role === 'SALES' ? (
                        <SalesLanding/>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <PreloginLanding />
            )}
        </div>
    );
};

export default HomeLanding;