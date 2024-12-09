import React, { useState } from "react";
import {
    Box,
    Checkbox,
    Collapse,
    FormControlLabel,
    List,
    ListItem,
    Typography,
    IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarRating from "../StarRating";

interface FilterItem {
    label?: string;
    value: string | number;
    icon?: React.ReactNode;
}

interface FilterCardProps<T extends string | number> {
    title: string;
    items: FilterItem[];
    isStarFilter?: boolean;
    onChange: (selectedValues: T[]) => void;
}

export default function FilterCard<T extends string | number>({
    title,
    items,
    isStarFilter = false,
    onChange,
}: FilterCardProps<T>) {
    const [open, setOpen] = useState(true);
    const [selectedValues, setSelectedValues] = useState<T[]>([]);

    function handleToggle() {
        setOpen(!open);
    };

    function handleCheck(value: T) {
        const updatedSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        setSelectedValues(updatedSelectedValues);
        onChange(updatedSelectedValues);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "20px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                width:"250px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
                <IconButton onClick={handleToggle} size="small">
                    {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>

            <Collapse in={open}>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.value} disablePadding>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedValues.includes(item.value as T)}
                                        onChange={() => handleCheck(item.value as T)}
                                    />
                                }
                                label={
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {isStarFilter ? (
                                            <StarRating rating={item.value as number} />
                                        ) : (
                                            <Typography>{item.label}</Typography>
                                        )}
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Box>
    );
}
