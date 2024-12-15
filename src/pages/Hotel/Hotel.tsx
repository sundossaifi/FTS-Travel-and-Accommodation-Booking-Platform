import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    fetchHotelGallery,
    fetchHotelDetails,
    fetchHotelReviews,
} from "../../services/hotelService";
import { GalleryImage, HotelDetails, Review } from "../../types/hotel";
import HotelGallery from "../../components/HotelGallery";
import Navbar from "../../components/Navbar";
import HotelInfo from "../../components/HotelInfo";
import styles from "./Hotel.module.css";
import { Typography } from "@mui/material";

export default function Hotel() {
    const { id } = useParams<{ id: string }>();

    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState<string | null>(null);

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

                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Error loading hotel data:", err);
                setError("Failed to load hotel data.");
            }
        }

        loadData();
    }, [id]);

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
        </div>
    );
}
