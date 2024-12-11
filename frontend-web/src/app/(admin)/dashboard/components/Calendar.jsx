import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { getCollegeEvent } from "@/api/events"; // Import the API method

const initialValue = dayjs(); // Set current date as the initial value

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(props.day.date());

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🗓️" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = async (date) => {
    const controller = new AbortController();

    try {
      const res = await getCollegeEvent(); // Fetch college events
      console.log(res);

      const events = res.results
        .filter((item) => item.event) // Ensure the item contains an event
        .map((item) => ({
          ...item.event,
          date: dayjs(item.event.date_time), // Convert date_time to a Dayjs object
        }));

      // Highlight days in the current month
      const daysToHighlight = events
        .filter((event) => event.date.isSame(date, "month"))
        .map((event) => event.date.date());

      console.log(daysToHighlight);
      setHighlightedDays(daysToHighlight);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
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
        sx={{
          borderRadius: "8px",
          border: "1px solid #1E1E1E",
          boxShadow: "0px 4px 12px rgba(250, 250, 250, 0.05)",
        }}
      />
    </LocalizationProvider>
  );
}
