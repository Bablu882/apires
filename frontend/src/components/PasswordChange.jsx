import React, { useState } from "react";
import axios from 'axios';

const PasswordChangeModal = ({ userId, userName, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(`/admin/changepassword/${userId}`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.data.message.success) {
        alert("Password updated successfully.");
        onClose();
      } else {
        setError("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Password for {userName}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handlePasswordChange}>Update Password</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
