import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/passcodeChange.css';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SignOut from '../components/SignOut';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../service/UserService';
import Snackbar from '@mui/material/Snackbar';

const PasscodeChange = () => {

    const { user, role, roleLoading, roleError } = useAuth();
    // navigation
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/');
    };

    // passcode 
    const [currentPasscode, setCurrentPasscode] = useState('');
    const [chosenPasscode, setChosenPasscode] = useState('');
    const [currentId, setCurrentId] = useState('');

    const handlePasscodeChange = (event) => {
        setChosenPasscode(event.target.value);

    };
    const handleSubmitNewPasscode = async () => {
        const editedUser = {
            gmail: user.email,
            role: role,
            passcode: chosenPasscode
        };

        try {
            await UserService.updateUser(currentId, editedUser);

            showMessage('Berhasil mengganti passcode');
            setCurrentPasscode(chosenPasscode);
            setChosenPasscode('');
        } catch (error) {
            showMessage('Terjadi error dalam penggantian passcode:', error);
        }

    }
    useEffect(() => {
        const fetchPasscode = async () => {
            if (user) {
                const curr_use = await UserService.getUserByGmail(user.email);
                if (curr_use && curr_use.passcode) {
                    setCurrentPasscode(curr_use.passcode);
                }
                if (curr_use && curr_use.id) {
                    setCurrentId(curr_use.id);
                }
            }

        };

        fetchPasscode();
    }, [user]);


    // snackbar message
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const showMessage = (message) => {
        setOpenSnackBar(true);
        setMessage(message);
    }
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    return (
        <div>
            {user ? (
                <>
                    {role === 'SUPERADMIN' ? (
                        <div className="passcode-change-container">
                            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={goToLandingPage}>
                                Kembali
                            </Button>
                            <div className="passcode-change-header">
                                <h1>Ubah Passcode</h1>
                            </div>
                            <div className="current-passcode-panel">
                                {
                                    currentPasscode !== "" ? (
                                        <>
                                            <p>Passcode Anda sekarang: {currentPasscode}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p>Anda tidak memiliki passcode.</p>
                                        </>
                                    )
                                }
                            </div>
                            <div className="passcode-change-panel">
                                <TextField fullWidth id="new-passcode-field" label="Passcode baru" variant="outlined" value={chosenPasscode} onChange={handlePasscodeChange} />
                                <br/>
                                <br/>
                                <Button className="new-passcode-submit" variant="contained" onClick={() => handleSubmitNewPasscode()}>Ubah passcode</Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>You do not have the required role.</p>
                            <SignOut></SignOut>
                        </div>
                    )
                    }
                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackBar}
                        message={message}
                    />
                </>
            ) : (
                <PreloginLanding />
            )
            }
        </div>
    );
};

export default PasscodeChange;