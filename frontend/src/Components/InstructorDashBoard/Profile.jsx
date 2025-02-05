import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import './Profile.css';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt,FaChalkboardTeacher } from 'react-icons/fa';

function Profile() {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error("Failed to load user data.");
            }
        };

        fetchUserData();
    }, [id]);

    // Send OTP to user's email
    const sendOtp = async () => {
        try {
            await axios.post(`http://localhost:7000/api/users/send-otp`, { email });
            toast.success("OTP sent to your email.");
            setIsOtpSent(true);
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Failed to send OTP.");
        }
    };

    // Verify OTP and allow password change
    const verifyOtpAndChangePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:7000/api/users/verify-otp`, { email, otp });
            setIsOtpVerified(true); // Set OTP verified state
            toast.success("OTP verified successfully.");
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Invalid OTP.");
        }
    };

    // Update password after verifying OTP
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            await axios.put(`http://localhost:7000/api/users/${id}`, { password: newPassword });
            toast.success("Password updated successfully.");
            setNewPassword('');
            setConfirmPassword('');
            setOtp('');
            setIsOtpSent(false); // Reset state after successful update
            setIsOtpVerified(false); // Reset OTP verified state
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password.");
        }
    };

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <>
            <div>
                <SideBar current={"profile"} />
                <section id="content">
                    <Navbar />
                    <main className="t">
                        <div className="profile-info">
                            <h2>User Information</h2>
                            <p><FaUser /> <strong>Username:</strong> {user.username}</p>
                            <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
                            <p><FaPhone /> <strong>Phone Number:</strong> {user.phno}</p>
                            <p><FaCalendarAlt /> <strong>Date of Birth:</strong> {user.dob}</p>
                            <p><FaMapMarkerAlt /> <strong>Location:</strong> {user.location}</p>
                            <p><FaChalkboardTeacher /><strong>Profession:</strong> {user.profession}</p>
                        </div>

                        {/* Change Password Section */}
                        <div className="change-password">
                            <h2>Change Password</h2>
                            {!isOtpSent ? (
                                <div className="otp-card">
                                    <button className="send-otp-button" onClick={sendOtp}>Send OTP</button>
                                </div>
                            ) : !isOtpVerified ? (
                                <form onSubmit={verifyOtpAndChangePassword} className="otp-verification-form">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                    <button type="submit">Verify OTP</button>
                                </form>
                            ) : (
                                <div className="update-password-card">
                                    <h3>Update Password</h3>
                                    <form onSubmit={handleUpdatePassword}>
                                        <br />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <button type="submit">Update Password</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </main>
                </section>
            </div>
        </>
    );
}

export default Profile;