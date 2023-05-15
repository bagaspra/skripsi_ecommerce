import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './styles.module.scss';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function BasicTable({ rows }) {
    const handleRemove = async (id) => {
        try {
            const { data } = await axios.delete('/api/admin/user', {
                data: { id },
            });
            setUsers(data.users);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Foto</TableCell>
                        <TableCell align="left">Nama</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Verified</TableCell>
                        <TableCell align="right">Admin</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <img
                                src={row.image}
                                alt=""
                                className={styles.table__img}
                            />
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">
                                {row.verified ? (
                                    <img
                                        src="../../../images/verified.png"
                                        alt=""
                                        className={styles.ver}
                                    />
                                ) : (
                                    <img
                                        src="../../../images/unverified.png"
                                        alt=""
                                        className={styles.ver}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {row.role == 'admin' ? (
                                    <img
                                        src="../../../images/verified.png"
                                        alt=""
                                        className={styles.ver}
                                    />
                                ) : (
                                    <img
                                        src="../../../images/unverified.png"
                                        alt=""
                                        className={styles.ver}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <RiDeleteBin7Fill onClick={() => {
                                    handleRemove(row._id);
                                    window.location.reload();
                                }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}