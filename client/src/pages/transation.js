import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Button, Switch, FormControlLabel, Paper, TextField, Typography,
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Avatar, IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import QrScanner from "react-webcam-qr-scanner";
import UploadIcon from "@mui/icons-material/Upload";

const UploadInput = styled("input")({
  display: "none"
});

export default function Transaction() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [receiverUpi, setReceiverUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchTransactions(storedUser.upi_id);
      fetchBalance(storedUser.upi_id);
    }
  }, []);

  const fetchTransactions = async (upi_id) => {
    try {
      const res = await axios.get(`/api/transactions/${upi_id}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Transaction fetch failed:", err);
    }
  };

  const fetchBalance = async (upi_id) => {
    try {
      const res = await axios.get(`/api/user/${upi_id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Balance fetch failed:", err);
    }
  };

  const handleTransaction = async () => {
    if (!receiverUpi || !amount) {
      setMessage("Please fill in UPI ID and amount.");
      return;
    }
    setSending(true);
    try {
      const res = await axios.post("/api/transaction", {
        sender_upi_id: user.upi_id,
        receiver_upi_id: receiverUpi,
        amount: parseFloat(amount)
      });
      setMessage(res.data.message);
      fetchTransactions(user.upi_id);
      fetchBalance(user.upi_id);
      setAmount("");
      setReceiverUpi("");
    } catch (err) {
      setMessage("Transaction failed.");
    } finally {
      setSending(false);
    }
  };

  const chartData = transactions
    .map((t) => ({
      timestamp: new Date(t.timestamp).toLocaleDateString(),
      amount: t.amount
    }))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const handleScan = (result) => {
    if (result) {
      setReceiverUpi(result.text);
      setScanning(false);
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  const handleError = (err) => {
    console.error("QR Error:", err);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    padding: "20px",
    minHeight: "100vh",
    transition: "all 0.5s ease"
  };

  return (
    <Box style={themeStyles}>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
        label="Dark Mode"
      />

      {user && (
        <Paper elevation={4} style={{ padding: 20, marginBottom: 20, transition: "0.5s" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={profileImg}
              alt={user.name}
              sx={{ width: 64, height: 64 }}
            />
            <label htmlFor="upload-profile">
              <UploadInput
                accept="image/*"
                id="upload-profile"
                type="file"
                onChange={handleProfileUpload}
              />
              <IconButton component="span" color="primary">
                <UploadIcon />
              </IconButton>
            </label>
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>UPI: {user.upi_id}</Typography>
              <Typography><strong>Balance:</strong> ₹{user.balance}</Typography>
            </Box>
          </Box>
        </Paper>
      )}

      <Typography variant="h6" gutterBottom>Send Money</Typography>
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mt={1}>
        <TextField
          label="Receiver UPI ID"
          value={receiverUpi}
          onChange={(e) => setReceiverUpi(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          onClick={handleTransaction}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setScanning((prev) => !prev)}
        >
          {scanning ? "Stop Scanner" : "Scan QR"}
        </Button>
      </Box>
      {message && (
        <Typography mt={1} color="info.main">{message}</Typography>
      )}

      {scanning && (
        <Box mt={2} style={{ maxWidth: 400 }}>
          <QrScanner
            delay={300}
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
          />
        </Box>
      )}

      <Typography variant="h6" mt={4}>Transaction History</Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>
                  {tx.sender_upi_id === user.upi_id ? "🔺 Sent" : "⬇️ Received"}
                </TableCell>
                <TableCell>{tx.sender_upi_id}</TableCell>
                <TableCell>{tx.receiver_upi_id}</TableCell>
                <TableCell>₹{tx.amount}</TableCell>
                <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" mt={4}>Transaction Overview</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#1976d2" strokeWidth={2} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
