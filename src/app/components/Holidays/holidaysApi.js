import axios from "axios";
import Cookies from "js-cookie";

export const fetchHolidays = async (setHolidays, setError) => {
  try {
    const apiUrl = "http://localhost:1337/api/holidays";
    const token = Cookies.get("token");
    if (!token) {
      setError("Unauthorized: No token found in cookies");
      return;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const sortedHolidays = response.data.data.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setHolidays(sortedHolidays);
  } catch (err) {
    setError(err.message);
    console.error("Error fetching holidays:", err);
  }
};