function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export default function OfferLocationFilter(userLat, userLng, shops, radius) {
    return shops.filter(shop => {
        const distance = haversine(userLat, userLng, shop.seller.lat, shop.seller.lng);
        return distance <= radius;
    });
}