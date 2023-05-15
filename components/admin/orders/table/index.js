import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './styles.module.scss';
import { useRef } from 'react';
import { useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const input = useRef(null);

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put('/api/admin/order', {
        id,
        status,
      });
      setOrders(data.orders);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="right">
          {row.paymentMethod == 'paypal'
            ? 'Paypal'
            : row.paymentMethod == 'credit_card'
              ? 'Credit Card'
              : 'Cash On Delievery'}
        </TableCell>
        <TableCell align="right">
          {row.isPaid ? (
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
          <span
            className={
              row.status == 'Belum Diproses'
                ? styles.not_processed
                : row.status == 'Diproses'
                  ? styles.processing
                  : row.status == 'Dikirim'
                    ? styles.dispatched
                    : row.status == 'Dibatalkan'
                      ? styles.cancelled
                      : row.status == 'Selesai'
                        ? styles.completed
                        : ''
            }
          >
            <li className={styles.list__item}>
              <select
                className={open ? styles.open : ''}
                value={status ? status : row.status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!open}
                ref={input}
              >
                <option value="Belum Diproses">Belum Diproses</option>
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Dibatalkan">Dibatalkan</option>
                <option value="Selesai">Selesai</option>
              </select>
              {open && (
                <div className={styles.list__item_expand}>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      handleUpdate(row._id);
                      setOpen(false);
                      window.location.reload(); // Reload halaman setelah perubahan berhasil disimpan
                    }}
                  >
                    Save
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setOpen(false);
                      setStatus('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className={styles.list__item_actions}>
                {!open && (
                  <AiTwotoneEdit
                    onClick={() => {
                      setOpen((prev) => !prev);
                      input.current.focus();
                    }}
                  />
                )}
              </div>
            </li>
          </span>
        </TableCell>

        <TableCell align="right">{row.couponApplied || '-'}</TableCell>
        <TableCell align="right">
          <b>Rp. {row.total}</b>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order untuk
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Nama Lengkap</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Informasi Pengiriman</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.user.id}>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.user.image}
                        className={styles.table__img}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{row.user.name}</TableCell>
                    <TableCell align="left">{row.user.email}</TableCell>
                    <TableCell align="right">
                      {row.shippingAddress.firstName}{' '}
                      {row.shippingAddress.lastName} <br />
                      {row.shippingAddress.address1} <br />
                      {row.shippingAddress.address2} <br />
                      {row.shippingAddress.state},{row.shippingAddress.city}{' '}
                      <br />
                      {row.shippingAddress.country} <br />
                      {row.shippingAddress.zipCode} <br />
                      {row.shippingAddress.phoneNumber} <br />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Tipe</TableCell>
                    <TableCell>Kuantitas</TableCell>
                    <TableCell>Harga</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell component="th" scope="row">
                        <img
                          src={p.image}
                          alt=""
                          className={styles.table__productImg}
                        />
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell align="left">{p.size}</TableCell>
                      <TableCell align="left">x{p.qty}</TableCell>
                      <TableCell align="left">Rp. {p.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row" align="left">
                      TOTAL
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: '20px 0 20px 18px' }}
                    >
                      <b style={{ fontSize: '20px' }}>{row.total}$</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    order: PropTypes.number.isRequired,
    payment_method: PropTypes.string.isRequired,
    paid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    coupon: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        shippingAddress: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        paddingX="5px"
        id="tableTitle"
        component="div"
      >
        Orders
      </Typography>
      <Table aria-label="collapsible table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order</TableCell>
            <TableCell align="right">Metode Pembayaran</TableCell>
            <TableCell align="right">Status Pembayaran</TableCell>
            <TableCell align="center">Status Order</TableCell>
            <TableCell align="right">Kupon</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
