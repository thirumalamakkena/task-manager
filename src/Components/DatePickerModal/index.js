import React from 'react';
import './index.css';

const DatePickerModal = ({ showDatePicker, closeDatePicker, selectDate }) => {
  if (!showDatePicker) return null;

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    null
  );
};

export default DatePickerModal;
