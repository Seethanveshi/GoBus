package utils

import "GoBus/server/model"

func CalculateSeatScore(seat model.Seat) int {
	score := 0

	switch seat.SeatType {
	case "window":
		score += 10
	case "aisle":
		score += 5
	case "middle":
		score += -10
	}

	switch seat.Position {
	case "front":
		score += 15
	case "middle":
		score += 5
	case "back":
		score += -15
	}

	if seat.NearToilet {
		score -= 10
	}

	if seat.ExtraLegroom {
		score += 10
	}

	return score
}

func SeatBucket(score int) string {
	if score < 0 {
		return "LOW"
	}
	if score <= 15 {
		return "MEDIUM"
	}

	return "HIGH"
}
