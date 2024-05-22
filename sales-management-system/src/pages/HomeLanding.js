import React from 'react';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SuperAdminLanding from './SuperAdminLanding';
import SignOut from '../components/SignOut';
const HomeLanding = () => {
    const { user, role, roleLoading, roleError } = useAuth();

    if (roleLoading) return <p>Loading...</p>;
    if (roleError) return (
        <div>
            <p>Your account has yet to be associated with any roles. Please contact the administrator.</p>;
        </div>)


    return (
        <div>
            {user ? (
                <>
                    {role === 'SUPERADMIN' ? (
                        <SuperAdminLanding />
                    ) : (
                        <div>
                            <p>You do not have the required role.</p>
                            <SignOut></SignOut>
                        </div>
                    )}
                </>
            ) : (
                <PreloginLanding />
            )}
        </div>
    );
};

export default HomeLanding;