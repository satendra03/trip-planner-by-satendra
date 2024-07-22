export const SelectBudgetOptions = [
    {
        id:1,
        icon: "💵",
        title:"Cheap",
        desc: "Economize and Save"
    },
    {
        id: 2,
        icon: "💰",
        title:"Moderate",
        desc: "Balance Cost and Comfort"
    },
    {
        id:3,
        icon: "💎",
        title:"Luxury",
        desc: "Induldge without Limits"
    },
]

export const SelectNoOfPersons = [
    {
        id:1,
        icon: "🚶",
        title: "Solo",
        desc: "Discovering on Your Own",
        no: "1 Person"
    },
    {
        id:2,
        icon: "💑",
        title: "Partner",
        desc: "Exploring with a Loved One",
        no: "2 People"
    },
    {
        id:3,
        icon: "👨‍👩‍👧‍👦",
        title: "Family",
        desc: "Fun for All Ages",
        no: "3 to 5 People"
    },
    {
        id:4,
        icon: "🤝",
        title: "Friends",
        desc: "Adventure with Your Crew",
        no: "5 to 10 People"
    },
]

export const PROMPT = "Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {location} for no of days: {noOfDays} Days with no of People or group: {People} with Budget: {Budget}; give me list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image url; also for the same create the itinerary for {noOfDays} days, suggest places, give name, details, pricing, timings, place images urls, location (coordinate or in map); Remember all have to cover in the {Budget} level budget. Important: give the result in JSON Format"