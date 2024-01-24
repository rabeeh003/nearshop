function haversine(lat1, lon1, lat2, lon2) {
    console.log("Input Coordinates:", lat1, lon1, lat2, lon2);

    const R = 6371; // Earth radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    
    console.log("Calculated Distance:", distance);

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export default function checkOneLocation(shops, radius) {
    const loc = JSON.parse(localStorage.getItem('currentLocation'));
    const userLat = parseFloat(loc.lat);
    const userLng = parseFloat(loc.long);
    return (shops?.filter(shop => {
        const distance = haversine(userLat, userLng, shop.seller.lat, shop.seller.lng); // Corrected from shop.seller.lng
        console.log("Distance : ", distance, " Distance + radius: ", distance <= radius);
        return distance <= radius;
    })) || [];
}