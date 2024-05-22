import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import '../styling/searchBusinessTrip.css';
import UserService from '../service/UserService';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessTrip from '../components/BusinessTrip';
const SearchBusinessTrip = () => {

    const { user, role } = useAuth();

    // passcode details, remember to reset
    const [supervisorGmail, setSupervisorGmail] = useState('');

    const handleSupervisorGmailChange = (event) => {
        setSupervisorGmail(event.target.value);
    };
    const [supervisorPasscode, setSupervisorPasscode] = useState('');
    const handleSupervisorPasscodeChange = (event) => {
        setSupervisorPasscode(event.target.value);
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


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

    // handle sales gmail change
    const [gmailChosen, setGmailChosen] = useState('');
    const handleGmailChange = (event) => {
        setGmailChosen(event.target.value);
        setAuthenticated(false);
    };

    // dynamically rendering of table, remember to set this to true
    const [authenticated, setAuthenticated] = useState(false);
    const authenticate = async () => {
        if (role === "SUPERADMIN") {
            setAuthenticated(true);
        } else {
            if (supervisorGmail === '' || supervisorPasscode === '') {
                showMessage("Tolong masukkan kredensial supervisor!");
                return
            }
            const result = await UserService.authenticateNonAdmin(supervisorGmail, supervisorPasscode);
            setAuthenticated(result);
        }
    }

    // navigation
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/');
    };

    return (
        <div>
            {user ? (
                <div className='business-trip-container'>
                    <Button variant="contained" startIcon={<ArrowBackIcon />} onClick = {goToLandingPage}>
                        Kembali 
                    </Button>
                    <div className="business-trip-search-header">
                        <h1>Perjalanan Bisnis</h1>
                    </div>
                    {role !== 'SUPERADMIN' ? (
                        <div className='non-superadmin-container'>
                            <Card className="supervisor-access-panel panel">
                                <p>Untuk mengakses fitur ini, silakan masukkan kredensial supervisor.</p>
                                <TextField fullWidth id="supervisor-gmail" label="Super Admin Gmail" variant="outlined" value={supervisorGmail} onChange={handleSupervisorGmailChange} />
                                <br />
                                <br />
                                <OutlinedInput
                                    fullWidth
                                    label="Passcode"
                                    id="supervisor-passcode"
                                    value={supervisorPasscode}
                                    onChange={handleSupervisorPasscodeChange}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Card>

                        </div>
                    ) : (
                        <></>
                    )
                    }
                    <Card className="seach-business-trip-panel panel">
                        <div className="search-trip-form">
                            <FormControl fullWidth>
                                <InputLabel id="search-business-trip-by-gmail-label">Sales' Gmail</InputLabel>
                                <Select
                                    labelId="search-business-trip-by-gmail-label"
                                    id="search-business-trip-by-gmail"
                                    value={gmailChosen}
                                    label="Sales Gmail"
                                    onChange={handleGmailChange}
                                >
                                    {salesGmail.map((item) => (
                                        <MenuItem key={item.gmail} value={item.gmail}>
                                            {item.gmail}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button className="search-gmail-submit" variant="contained" onClick={() => authenticate()}>Search</Button>
                            </FormControl>

                        </div>
                    </Card>
                    {
                        (authenticated && (gmailChosen !== '')) ? (
                            <div className="sales-trip-table">
                                <BusinessTrip salesGmail={gmailChosen} onMessageChange={showMessage} />
                            </div>
                        ) : (
                            <></>
                        )
                    }


                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackBar}
                        message={message}
                    />
                </div>
            ) : (
                <PreloginLanding />
            )
            }
        </div>
    );
};

export default SearchBusinessTrip;