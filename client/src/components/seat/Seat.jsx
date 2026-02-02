import React from "react";

function Seat({lockedSeatMap, seat, isSelected, onClick }) {
  const lockStatus = lockedSeatMap[seat.seat_id];

  const isLocked = lockStatus === "locked";
  const isOwned = lockStatus === "owned";

  let bg = "#ccc"; 
  if (seat.available) bg = "#4caf50"; 
  if (isLocked) bg = "#ccc";
  if (isLocked  || isOwned) bg = "#ff9800";
  if (isSelected) bg = "#2196f3"; 

  const handleClick = () => {
    if (!seat.available || isLocked) return
    onClick()
  }

  return (
    <div
      onClick={handleClick}
      disabled={isLocked}
      style={{
        width: 45,
        height: 45,
        background: bg,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: (seat.available && (!isLocked)) ? "pointer" : "not-allowed",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {seat.seat_number}
    </div>
  );
}

export default Seat