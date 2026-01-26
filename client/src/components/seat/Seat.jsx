import React from "react";

function Seat({ seat, isSelected, onClick }) {
  let bg = "#ccc"; 
  if (seat.available) bg = "#4caf50"; 
  if (isSelected) bg = "#2196f3"; 

  return (
    <div
      onClick={onClick}
      style={{
        width: 45,
        height: 45,
        background: bg,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: seat.available ? "pointer" : "not-allowed",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {seat.seat_number}
    </div>
  );
}

export default Seat