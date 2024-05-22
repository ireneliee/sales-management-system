import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/createNewTrip.css';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SignOut from '../components/SignOut';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UserService from '../service/UserService';
import Snackbar from '@mui/material/Snackbar';
import TripService from '../service/TripService';
const CreateNewTrip = () => {

    const { user, role, roleLoading, roleError } = useAuth();
    // navigation
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/');
    };

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

    // sales gmail
    const [salesGmail, setSalesGmail] = useState([]);
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const userList = await UserService.getAllSales();
                setSalesGmail(userList)
            } catch (err) {
                showMessage(err.message);
            }
        };

        fetchSales();
    }, []);


    // create new trip form
    const [tripDescription, setTripDescription] = useState('');
    const handleDescriptionChange = (event) => {
        setTripDescription(event.target.value);
    };
    const [startDate, setStartDate] = useState(null);
    const handleStartDateChange = (event) => {
        setStartDate(new Date(event.target.value));

    };
    const [endDate, setEndDate] = useState(null);
    const handleEndDateChange = (event) => {
        setEndDate(new Date(event.target.value));

    };
    const [cost, setCost] = useState(0);
    const handleCostChange = (event) => {
        setCost(Number(event.target.value));

    };
    const [revenueTarget, setRevenueTarget] = useState(0);
    const handleRevenueTargetChange = (event) => {
        setRevenueTarget(Number(event.target.value));

    };
    const [revenue, setRevenue] = useState(0);
    const handleRevenueChange = (event) => {
        setRevenue(Number(event.target.value));

    };
    const [newCustomer, setNewCustomer] = useState(0);
    const handleCustomerChange = (event) => {
        setNewCustomer(Number(event.target.value));

    };
    const [destination, setDestination] = useState('');
    const handleDestinationChange = (event) => {
        setDestination(event.target.value);

    };
    const [gmail, setGmail] = useState('');
    const handleGmailChange = (event) => {
        setGmail(event.target.value);
    };

    useEffect(() => {
        setGmail(user.email);
    }, [user]);

    const clearForm = () => {
        setTripDescription('');
        setStartDate(null);
        setEndDate(null);
        setCost(0);
        setRevenueTarget(0);
        setRevenue(0);
        setNewCustomer(0);
        setDestination('');
        setGmail(user.email);
    }

    const submitNewTrip = async () => {
        if (destination === "" || startDate === null || endDate === null || cost === 0 ||
            revenueTarget === 0 || revenue === 0 || gmail === "") {
            showMessage("Periksa kembali form!");
            return;
        }
        const newTrip = {
            "destination": destination,
            "startDate": startDate,
            "endDate": endDate,
            "cost": cost,
            "revenueTarget": revenueTarget,
            "revenue": revenue,
            "newCustomer": newCustomer,
            "gmail": gmail,
            "description": tripDescription
        };

        try {
            await TripService.addTrip(newTrip);
            showMessage('Berhasil membuat catatan perjalanan bisnis!');
            clearForm();
        } catch (error) {
            showMessage('Terjadi error dalam pembuatan catatan bisnis:', error);
        }
    }

    return (
        <div>
            {user ? (
                <>
                    <div className="create-new-trip-container">
                        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={goToLandingPage}>
                            Kembali
                        </Button>
                        <div className="create-new-trip-header">
                            <h1>Buat Catatan Perjalanan Bisnis Baru</h1>
                        </div>
                        <div className="create-new-trip-form">
                            <div className="new-trip-field">
                                {role === "SALES" ? (
                                    <TextField fullWidth disabled id="sales-gmail-readonly" label="Sales gmail" variant="outlined" value={gmail}  />
                                ) : (
                                    <>
                                        <InputLabel fullWidth id="new-trip-sales-gmail">Sales' Gmail</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="new-trip-sales-gmail-label"
                                            id="new-trip-sales-gmail"
                                            value={gmail}
                                            label="Sales Gmail"
                                            onChange={handleGmailChange}
                                        >
                                            {salesGmail.map((item) => (
                                                <MenuItem key={item.gmail} value={item.gmail}>
                                                    {item.gmail}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </>

                                )}

                            </div>
                            <div className="new-trip-field">
                                <TextField fullWidth id="new-trip-destination" label="Tujuan" variant="outlined" value={destination} onChange={handleDestinationChange} />
                            </div>
                            <div className="new-trip-field">
                                <TextField fullWidth id="new-trip-description" label="Deskripsi" variant="outlined" value={tripDescription} onChange={handleDescriptionChange} />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="new-trip-start-date"
                                    label="Tanggal mulai"
                                    type="date"
                                    onChange={handleStartDateChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={startDate ? startDate.toISOString().substring(0, 10) : null}
                                />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="new-trip-end-date"
                                    label="Tanggal akhir"
                                    type="date"
                                    onChange={handleEndDateChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={endDate ? endDate.toISOString().substring(0, 10) : null}
                                />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="revenue-target"
                                    label="Target omset"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleRevenueTargetChange}
                                    value={revenueTarget}
                                />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="cost"
                                    label="Biaya"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleCostChange}
                                    value={cost}
                                />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="revenue"
                                    label="Omset"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleRevenueChange}
                                    value={revenue}
                                />
                            </div>
                            <div className="new-trip-field">
                                <TextField
                                    fullWidth
                                    id="newCustomer"
                                    label="Toko baru"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleCustomerChange}
                                    value={newCustomer}
                                />
                            </div>
                            <div className="new-trip-field">
                                <Button className="new-trip-submit" variant="contained" onClick={() => submitNewTrip()}>Buat</Button>
                            </div>

                        </div>

                    </div>
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

export default CreateNewTrip;