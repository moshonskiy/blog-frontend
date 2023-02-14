import React, { FunctionComponent } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import s from "./SideBlock.module.scss";

interface ISideBlock {
    title: string;
    children: React.ReactNode;
}

const SideBlock: FunctionComponent<ISideBlock> = ({ title, children }) => {
    return (
        <Paper classes={{ root: s.root }}>
            <Typography
                variant="h6"
                classes={{ root: s.title }}
            >
                {title}
            </Typography>
            {children}
        </Paper>
    );
};

export default SideBlock;
