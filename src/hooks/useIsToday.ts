import { useMemo } from "react";

// Custom hook to determine if a given date is today
// dateString is stringified date in ISO format
const useIsToday = (dateString: string | null): boolean => {
  return useMemo(() => {
    if (!dateString) {
      return false;
    }

    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, [dateString]);
};

export default useIsToday;
