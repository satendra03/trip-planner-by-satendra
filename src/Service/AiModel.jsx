import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {Bhopal} for no of days: {3} Days with no of People or group: {4-5} with Budget: {Luxury}; give me list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image url; also for the same create the itinerary for {4-5} days, suggest places, give name, details, pricing, timings, place images urls, location (coordinate or in map); Remember all have to cover in the {Luxury} level budget. Important: give the result in JSON Format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "location": "Bhopal",\n  "duration": 3,\n  "budget": "Luxury",\n  "people": 4,\n  "hotels": [\n    {\n      "name": "Jehan Numa Palace Hotel",\n      "description": "A heritage hotel with opulent rooms, a sprawling garden, and a rooftop pool offering panoramic views of the city.",\n      "address": "1, Shamla Hills, Near Van Vihar National Park, Bhopal, Madhya Pradesh 462003",\n      "rating": 4.5,\n      "price": "₹15,000 - ₹30,000 per night",\n      "location": "https://goo.gl/maps/j12Q3Z5g5aL9R7T9",\n      "coordinates": "23.2594, 77.4096",\n      "image_url": "https://images.thrillophilia.com/image/upload/s--7i8t9L4h--/c_fill,f_auto,fl_progressive,h_600,q_auto,w_900/v1/images/photos/000/009/817/original/jehan_numa_palace_hotel_bhopal_hotel_exterior_view.jpg"\n    },\n    {\n      "name": "The Lalit, Bhopal",\n      "description": "A modern and luxurious hotel with elegant rooms, a rooftop pool, a spa, and multiple dining options.",\n      "address": "122, VIP Road, Near New Market, Bhopal, Madhya Pradesh 462003",\n      "rating": 4.2,\n      "price": "₹12,000 - ₹25,000 per night",\n      "location": "https://goo.gl/maps/bYfX1V85QmG96y3y",\n      "coordinates": "23.2582, 77.4118",\n      "image_url": "https://www.thelaLit.com/images/hotels/the-lalit-bhopal/home-slider-image-1.jpg"\n    },\n    {\n      "name": "Hotel Lake View Ashok",\n      "description": "A lakeside hotel with stunning views of the Upper Lake, comfortable rooms, and an outdoor pool.",\n      "address": "Shahpura, Near Van Vihar National Park, Bhopal, Madhya Pradesh 462016",\n      "rating": 4,\n      "price": "₹8,000 - ₹18,000 per night",\n      "location": "https://goo.gl/maps/2D19M97kC451wK7b",\n      "coordinates": "23.2438, 77.4253",\n      "image_url": "https://www.hotellakeviewashok.com/images/gallery/gallery_3.jpg"\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "title": "Exploring the City\'s Heart",\n      "places": [\n        {\n          "name": "Bharat Bhavan",\n          "details": "A renowned cultural center showcasing Indian art, craft, and literature.",\n          "pricing": "Entry Fee: ₹50 per person",\n          "timings": "10:00 AM - 6:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bharat_Bhavan_Bhopal.jpg/1280px-Bharat_Bhavan_Bhopal.jpg",\n          "location": "https://goo.gl/maps/M1aJqM9J9L6YzY9b"\n        },\n        {\n          "name": "Rajwada",\n          "details": "A magnificent palace built in the 18th century, showcasing the grandeur of the Bhopal State.",\n          "pricing": "Entry Fee: ₹20 per person",\n          "timings": "9:00 AM - 6:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rajwada_Bhopal.jpg/1280px-Rajwada_Bhopal.jpg",\n          "location": "https://goo.gl/maps/2LhR6YfG84RjX2Q9"\n        },\n        {\n          "name": "Moti Masjid",\n          "details": "A beautiful mosque known for its intricate marble work and elegant architecture.",\n          "pricing": "Free Entry",\n          "timings": "5:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Moti_Masjid_%28Bhopal%29.jpg/1280px-Moti_Masjid_%28Bhopal%29.jpg",\n          "location": "https://goo.gl/maps/6D14aU3p13wZ3g83"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "title": "Nature and History",\n      "places": [\n        {\n          "name": "Van Vihar National Park",\n          "details": "A lush green sanctuary home to various wildlife species, ideal for a relaxing day.",\n          "pricing": "Entry Fee: ₹50 per person",\n          "timings": "8:00 AM - 6:00 PM",\n          "image_url": "https://www.bhopal.nic.in/sites/default/files/styles/medium/public/vanvihar_national_park.jpg",\n          "location": "https://goo.gl/maps/Y1z3D7CqHq4y4wF7"\n        },\n        {\n          "name": "Upper Lake",\n          "details": "A serene lake offering scenic views, boat rides, and a chance to soak in the tranquility.",\n          "pricing": "Boat Ride: ₹100 - ₹500 per person",\n          "timings": "8:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Upper_Lake_Bhopal_India.jpg/1280px-Upper_Lake_Bhopal_India.jpg",\n          "location": "https://goo.gl/maps/1S1N3bU47N26529v"\n        },\n        {\n          "name": "State Museum",\n          "details": "A comprehensive museum showcasing the history, art, and culture of Madhya Pradesh.",\n          "pricing": "Entry Fee: ₹20 per person",\n          "timings": "10:00 AM - 5:00 PM",\n          "image_url": "https://www.bhopal.nic.in/sites/default/files/styles/medium/public/state_museum.jpg",\n          "location": "https://goo.gl/maps/v3z4K9C931vD69s8"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "title": "Religious Sites and Culinary Delights",\n      "places": [\n        {\n          "name": "Taj-ul-Masjid",\n          "details": "One of the largest mosques in India, known for its grandeur and intricate architecture.",\n          "pricing": "Free Entry",\n          "timings": "5:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Taj_ul_Masjid_Bhopal.jpg/1280px-Taj_ul_Masjid_Bhopal.jpg",\n          "location": "https://goo.gl/maps/C9M1nR2zW1Qm6K7g"\n        },\n        {\n          "name": "Birla Mandir",\n          "details": "A serene Hindu temple dedicated to Lord Vishnu, offering panoramic views of the city.",\n          "pricing": "Free Entry",\n          "timings": "6:00 AM - 8:00 PM",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Birla_Mandir_Bhopal_India.jpg/1280px-Birla_Mandir_Bhopal_India.jpg",\n          "location": "https://goo.gl/maps/2x6kQ76F4c4s776R"\n        },\n        {\n          "name": "Bhopal Food Tour",\n          "details": "Experience the rich culinary heritage of Bhopal with a guided food tour, sampling local delicacies.",\n          "pricing": "₹1,500 - ₹2,500 per person",\n          "timings": "11:00 AM - 3:00 PM",\n          "image_url": "https://www.holidify.com/images/cmsuploads/2019/02/08/best-food-in-bhopal_1549636789.jpg",\n          "location": "Various locations in the city"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Note:** This itinerary is based on a luxury budget, which means the suggested hotels and activities cater to higher-end preferences. The prices for attractions and food tours are approximate and may vary depending on the chosen provider. The coordinates provided are for the general area and may not be exact pinpoint locations. It\'s always recommended to confirm the latest information and availability before your trip. \n',
        },
      ],
    },
  ],
});