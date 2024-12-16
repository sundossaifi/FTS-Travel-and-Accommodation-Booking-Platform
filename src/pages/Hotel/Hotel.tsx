import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    fetchHotelGallery,
    fetchHotelDetails,
    fetchHotelReviews,
    fetchAvailableRooms
} from "../../services/hotelService";
import { GalleryImage, HotelDetails, Review } from "../../types/hotel";
import { Room } from "../../types/room";
import HotelGallery from "../../components/HotelGallery";
import Navbar from "../../components/Navbar";
import HotelInfo from "../../components/HotelInfo";
import HotelDetailsComponent from "../../components/HotelDetailsComponent";
import AvailableRooms from "../../components/AvailableRooms";
import Footer from "../../components/Footer";
import { useSearch } from "../../context/SearchContext";
import styles from "./Hotel.module.css";
import { Typography } from "@mui/material";

export default function Hotel() {
    const { id } = useParams<{ id: string }>();

    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { checkInDate, checkOutDate } = useSearch();


    useEffect(() => {
        async function loadData() {
            if (!id) {
                setError("Invalid hotel ID. Please check the URL.");
                return;
            }

            try {
                // Fetch gallery images
                const images: GalleryImage[] = await fetchHotelGallery(id);
                const imageUrls = images.map((image) => image.url);
                setGalleryImages(imageUrls);

                // Fetch hotel details
                const details: HotelDetails = await fetchHotelDetails(id);
                setHotelDetails(details);

                // Fetch reviews
                const hotelReviews: Review[] = await fetchHotelReviews(id);
                setReviews(hotelReviews);
                //Fetch available rooms
                if (checkInDate && checkOutDate) {
                    const availableRooms: Room[] = await fetchAvailableRooms(id, checkInDate, checkOutDate);
                    setRooms(availableRooms);
                }

                setError(null);
            } catch (err) {
                console.error("Error loading hotel data:", err);
                setError("Failed to load hotel data.");
            }
        }

        loadData();
    }, [id, checkInDate, checkOutDate]);

    if (error) {
        return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
    }

    return (
        <div className={styles.hotelPageContainer}>
            <div>
                <Navbar />
                <div className={styles.headerContainer}>
                    <Typography variant="h4" sx={{
                        position: "absolute",
                        bottom: "10%",
                        left: "10%",
                        color: "#fff"
                    }}>
                        {hotelDetails?.hotelName}
                    </Typography>
                </div>
            </div>
            <div className={styles.hotelDetailsContainer}>
                <div style={{ width: "80%" }}>
                    {hotelDetails && (
                        <HotelInfo
                            hotelLocation={hotelDetails.location}
                            starRating={hotelDetails.starRating}
                            reviewsCount={reviews.length}
                        />
                    )}
                    <HotelGallery images={galleryImages} />
                    {hotelDetails && (
                        <HotelDetailsComponent
                            hotelDescription={hotelDetails.description}
                            lat={hotelDetails.latitude}
                            lng={hotelDetails.longitude}
                            amenities={hotelDetails.amenities}
                        />
                    )}

                    {rooms.length > 0 && (
                        <AvailableRooms rooms={rooms}/>
                    )}

                    {/* Hotel Reviews
                    {reviews.length > 0 && (
                        <div className={styles.reviewsContainer}>
                            <h4>Customer Reviews</h4>
                            {reviews.map((review) => (
                                <div key={review.reviewId} className={styles.reviewCard}>
                                    <p>
                                        <strong>{review.customerName}</strong> rated it{" "}
                                        <strong>{review.rating}/5</strong>
                                    </p>
                                    <p>{review.description}</p>
                                </div>
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
