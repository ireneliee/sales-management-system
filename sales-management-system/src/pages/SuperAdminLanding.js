import React from 'react';
import SignOut from '../components/SignOut';
import '../styling/superAdminLanding.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuperAdminLanding = () => {
    const navigate = useNavigate();

    const goToAccessControlPage = () => {
        navigate('/accessControl');
    };

    const goToBusinessTripPage = () => {
        navigate('/businessTrip');
    };

    const goToPasscodeChangePage = () => {
        navigate('/passcodeChange');
    };
    const goToNewBusinessTripPage = () => {
        navigate('/newBusinessTrip');
    };

    return (
        <div className="super-admin-landing">
            <div className="super-admin-landing-header">
                <SignOut />
            </div>
            <div className="super-admin-heading">
                <h1>Apa yang ingin kamu kerjakan hari ini?</h1>
            </div>
            <div className="super-admin-action-panel">
                <div className="super-admin-action-item">
                    <Button onClick={goToAccessControlPage} >
                        <img className="super-admin-action-pic" id="access-control-pic" src="/images/easy-access.png" alt="kontrol akses" />Kontrol akses</Button>
                </div>
                <div className="super-admin-action-item">
                    <Button onClick={goToBusinessTripPage}>
                        <img className="super-admin-action-pic" id="business-trip-pic" src="/images/business-trip.png" alt="perjalanan bisnis" />Lihat perjalanan bisnis</Button>
                </div>
                <div className="super-admin-action-item">
                    <Button onClick={goToNewBusinessTripPage}><img className="super-admin-action-pic" id="new-business-trip-pic" src="/images/business-trip-2.png" alt="perjalanan bisnis baru" />Buat perjalanan bisnis baru</Button>
                </div>
                <div className="super-admin-action-item">
                    <Button onClick={goToPasscodeChangePage}>
                        <img className="super-admin-action-pic" id="passcode-pic" src="/images/password.png" alt="passcode" />Ganti passcode</Button>
                </div>

            </div>
        </div>

    );
};

export default SuperAdminLanding;