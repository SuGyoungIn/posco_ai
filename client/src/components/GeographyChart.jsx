import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {useTheme} from "@mui/material";
import {tokens} from '../theme';
import {geoFeatures} from "../data/mockGeoFeatures";
import {mockGeographyData} from "../data/mockData";

const GeographyChart = ({isDashboard = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
        </>
    );
};

export default GeographyChart;
