import React from 'react';
import SignOut from '../components/SignOut';
import '../styling/superAdminLanding.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLanding = () => {
    const navigate = useNavigate();

    const goToBusinessTripPage = () => {
        navigate('/businessTrip');
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
                    <img className="super-admin-action-pic" id="business-trip-pic" src="/images/business-trip.png" alt="perjalanan bisnis" />
                    <br />
                    <Button onClick= {goToBusinessTripPage}> <img className="super-admin-action-pic" id="passcode-pic" src="/images/password.png" alt="passcode" />Lihat perjalanan bisnis</Button>
                </div>
                <div className="super-admin-action-item">
                    
                    <br />
                    <Button onClick= {goToNewBusinessTripPage}><img className="super-admin-action-pic" id="new-business-trip-pic" src="/images/business-trip-2.png" alt="perjalanan bisnis baru" />Buat perjalanan bisnis baru</Button>
                </div>
                
            </div>
        </div>

    );
};

export default AdminLanding;