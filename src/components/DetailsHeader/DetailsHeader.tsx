import Navbar from "../Navbar";
import { Typography } from "@mui/material";
import styles from "./DetailsHeader.module.css";

interface DetailsHeaderProps {
    title:string;
}

export default function DetailsHeader({ title }: DetailsHeaderProps) {
    return (
        <div>
            <Navbar />
            {title &&
                <div className={styles.headerContainer}>
                    <Typography variant="h4" sx={{
                        position: "absolute",
                        bottom: "10%",
                        left: "10%",
                        color: "#fff"
                    }}>
                        {title}
                    </Typography>
                </div>}
        </div>
    )
}