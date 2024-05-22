import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/passcodeChange.css';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SignOut from '../components/SignOut';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PasscodeChange = () => {
    const { user, role } = useAuth();
    // navigation
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/');
    };


    return (
        <div>
            {user ? (
                <>
                    {role === 'SUPERADMIN' ? (
                        <div className="passcode-change-container">
                            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={goToLandingPage}>
                                Kembali
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p>You do not have the required role.</p>
                            <SignOut></SignOut>
                        </div>
                    )
                    }
                </>
            ) : (
                <PreloginLanding />
            )
            }
        </div>
    );
};

export default PasscodeChange;