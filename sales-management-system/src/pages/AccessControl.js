import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';

import Select from '@mui/material/Select';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UserService from '../service/UserService';
import '../styling/accessControl.css';
import { useAuth } from '../AuthContext';
import PreloginLanding from './PreloginLanding';
import SignOut from '../components/SignOut';

const AccessControl = () => {
    const { user, role, roleLoading, roleError } = useAuth();

    // loading of users list
    const [users, setUsers] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [userError, setUserError] = useState(null);

    // creating new user
    const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
    const handleOpenCreate = () => {
        setOpenCreateUserDialog(true);
    }
    const handleCloseCreate = () => {
        setOpenCreateUserDialog(false);
    }
    const [chosenRole, setChosenRole] = useState('SALES'); // State untuk menyimpan nilai peran

    const handleRoleChange = (event) => {
        setChosenRole(event.target.value); // Mengupdate state ketika nilai berubah
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await UserService.getUsers();
                setUsers(userList);
            } catch (err) {
                setUserError(err.message);
            }
        };

        fetchUsers();
    }, [fetchTrigger]); // Add fetchTrigger as a dependency

    const handleFetchAgain = () => {
        // Toggle fetchTrigger to trigger useEffect
        setFetchTrigger(prevTrigger => !prevTrigger);
    };

    // delete user
    const handleDeleteUser = async (userId) => {
        try {
            await UserService.deleteUser(userId);
            // Remove the deleted user from the users state
            setUsers(users.filter(user => user.id !== userId));
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // navigation
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/');
    };



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
                        <div className="access-control-container">
                            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={goToLandingPage}>
                                Kembali
                            </Button>
                            <div className="control-access-title-header">
                                <h1>Daftar Akses</h1>
                            </div>
                            <Stack className="status-stack" direction="row" spacing={1}>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>Buat akun baru</Button>
                                <Chip label="SUPERADMIN" color="error" />
                                <Chip label="ADMIN" color="warning" />
                                <Chip label="SALES" color="success" />
                            </Stack>
                            <div className="access-control-views">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Gmail</TableCell>
                                                <TableCell align="left">Akses</TableCell>
                                                <TableCell align="left">Aksi</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow
                                                    key={user.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {user.gmail}
                                                    </TableCell>
                                                    <TableCell align="left">{user.role}</TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction="row" spacing={2} align="right">
                                                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)}>
                                                                Hapus
                                                            </Button>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Dialog
                                    open={openCreateUserDialog}
                                    onClose={handleCloseCreate}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: async (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries((formData).entries());
                                            const email = formJson.gmail;
                                            //email , chosenRole
                                            const newUser = {
                                                gmail: email,
                                                role: role
                                            };

                                            try {
                                                await UserService.addUser(newUser);
                                                showMessage('User added successfully');
                                                handleFetchAgain();
                                                setChosenRole('SALES');
                                            } catch (error) {
                                                showMessage('Error adding user:', error);
                                            }
                                            handleCloseCreate();
                                        },
                                    }}
                                >
                                    <DialogTitle>Tambah Akun</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Untuk menambahkan akun baru, mintalah pengguna untuk membuat akun Gmail. Setelah itu, Anda dapat menetapkan peran pada Gmail tersebut.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="gmail"
                                            name="gmail"
                                            label="Gmail Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                        <br />
                                        <br />
                                        <InputLabel id="inputRole">Peran</InputLabel>
                                        <Select
                                            labelId="inputRole"
                                            id="inputRole"
                                            label="Peran"
                                            value={chosenRole}
                                            onChange={handleRoleChange}
                                            fullWidth
                                        >
                                            <MenuItem value={"SALES"}>Sales</MenuItem>
                                            <MenuItem value={"SUPERADMIN"}>Super admin</MenuItem>
                                            <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                        </Select>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseCreate}>Batalkan</Button>
                                        <Button type="submit">Tambah akun</Button>
                                    </DialogActions>
                                </Dialog>
                                <Snackbar
                                    open={openSnackBar}
                                    autoHideDuration={5000}
                                    onClose={handleCloseSnackBar}
                                    message={message}
                                />

                            </div>
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

export default AccessControl;