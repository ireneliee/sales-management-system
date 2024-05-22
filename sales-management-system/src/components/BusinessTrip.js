import React, { useState, useEffect } from 'react';
import TripService from '../service/TripService';
import { DataGrid } from '@mui/x-data-grid';


// this will be protected resources, can only be opened when its super admin, or admin that has keyed in supervisor key

const BusinessTrip = ({ salesGmail, onMessageChange }) => {

    // loading of users list
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        if (salesGmail) {
            const fetchTrips = async () => {
                try {
                    const tripList = await TripService.getTripsByGmail(salesGmail);
                    setTrips(tripList);
                } catch (err) {
                    onMessageChange(err.message);
                }
            };
            fetchTrips();
        }

    }, []); // Add fetchTrigger as a dependency



    // data table
    const columns = [
        { field: 'destination', headerName: 'Destinasi Perjalanan Bisnis', width: 200 },
        {
            field: 'startDate',
            headerName: 'Tanggal Mulai',
            width: 200,
            type: 'date',
            valueGetter: (value) => {
                if (value && value.seconds != null && value.nanoseconds != null) {
                    return new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
                }
                return null;
            }
        },
        {
            field: 'endDate',
            headerName: 'Tanggal Akhir',
            width: 200,
            type: 'date',
            valueGetter: (value) => {
                if (value && value.seconds != null && value.nanoseconds != null) {
                    return new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
                }
                return null;
            }
        },
        {
            field: 'revenueTarget',
            headerName: 'Target Omset',
            type: 'number',
            width: 150,
        },
        {
            field: 'cost',
            headerName: 'Biaya',
            type: 'number',
            width: 130,
        },
        {
            field: 'revenue',
            headerName: 'Omset',
            type: 'number',
            width: 170,
        },
        {
            field: 'newCustomer',
            headerName: 'Pelanggan Baru',
            type: 'number',
            width: 150,
        }

    ];
    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={trips}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>
    );
};

export default BusinessTrip;