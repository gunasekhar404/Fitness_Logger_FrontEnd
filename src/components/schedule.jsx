import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import CheckIcon from '@mui/icons-material/Check';
import PostContext from '../context/post/postContext';



const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =  !props.outsideCurrentMonth && highlightedDays.includes(new Date(day).toDateString());
// console.log(new Date(day).toDateString());
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckIcon/> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

ServerDay.propTypes = {
  /**
   * The date to show.
   */
  day: PropTypes.object.isRequired,
  highlightedDays: PropTypes.arrayOf(PropTypes.string),
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
};

export default function ScheduleDate() {

  const postcontext = React.useContext(PostContext)
  const{setSelectedDate,posts} = postcontext

  const highlightedDays = posts.map((d) => {
    return new Date(d.date).toDateString()})
    // console.log(highlightedDays);
  const requestAbortController = React.useRef(null);
  //const [isLoading, setIsLoading] = React.useState(false);
 
  const handleViewChange = (e)=>{
    // console.log(e.$d.toDateString());
    setSelectedDate(e.$d.toDateString())
  }

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    // setIsLoading(true);

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DateCalendar
      
        defaultValue={initialValue}
        onChange={(e)=>handleViewChange(e)}
        // loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
         
        }}
        slotProps={{
          day: {
            highlightedDays,
          },

         
        }}
      />
    </LocalizationProvider>
  );
}