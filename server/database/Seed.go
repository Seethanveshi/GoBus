package database

import (
	"GoBus/server/model"
	"strconv"
	"time"
)

func Seed() {

	var count int64

	DB.Model(&model.Bus{}).Count(&count)
	if count > 0 {
		return
	}

	bus := model.Bus{
		BusName:    "Seethanveshi Travels",
		BusNumber:  "AP05AB2222",
		BusType:    "NON AC",
		TotalSeats: 40,
	}

	DB.Create(&bus)

	var seats []model.Seat
	for i := 1; i <= 40; i++ {
		seat := model.Seat{
			BusID:      bus.ID,
			SeatNumber: "S" + strconv.Itoa(i),
		}
		DB.Create(&seat)
		seats = append(seats, seat)
	}

	bus.Seats = seats

	DB.Save(&bus)

	route := model.Route{
		Source:      "Kakinada",
		Destination: "Hyderabed",
	}

	DB.Create(&route)

	travelDate := time.Date(2026, 1, 23, 0, 0, 0, 0, time.Local)
	departureTime := time.Date(
		travelDate.Year(),
		travelDate.Month(),
		travelDate.Day(),
		20, 0, 0, 0,
		time.Local,
	)
	arrivalTime := departureTime.Add(9 * time.Hour)

	trip := model.Trip{
		BusID:         bus.ID,
		RouteID:       route.ID,
		TravelDate:    travelDate,
		DepartureTime: departureTime,
		ArrivalTime:   arrivalTime,
		Price:         700,
	}

	DB.Create(&trip)
}
