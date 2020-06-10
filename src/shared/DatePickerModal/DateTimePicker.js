import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Alert } from 'react-native';
import moment from 'moment'

export const TimePicker = ({
    isVisible,
    onTimeSelected,
    onCancel
}) => {
    return <DateTimePickerModal
    isVisible={isVisible}
    mode="time"
    onConfirm={time => {
        onTimeSelected(time)
    }}
    onCancel={()=>onCancel()}
  />
}

export const DatePicker = ({
    isVisible,
    onDateSelected,
    onCancel
}) => {
    return <DateTimePickerModal
    isVisible={isVisible}
    mode="date"
    onConfirm={date => {
      let d = moment(date)
      console.log(d, moment(),"jhvjhvjhvjhvj")
      if(d < moment())
        Alert.alert("Oops...", "Select a valid arrival time.")
      else
        onDateSelected(d)
    }}
    onCancel={onCancel()}
  />
}
