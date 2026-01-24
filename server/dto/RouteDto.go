package dto

type RouteDto struct {
	RouteID     uint   `json:"route_id"`
	Source      string `json:"source"`
	Destination string `json:"destination"`
}
