import React, { FunctionComponent } from "react";
import { Link } from 'react-router-dom';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import SideBlock from "../SideBlock";

import s from './Tags.module.scss';

interface ITagsBlock {
    items: string[];
    isLoading: boolean;
}

const TagsBlock: FunctionComponent<ITagsBlock> = ({ items, isLoading = true }) => {
    return (
        <SideBlock title="Tags">
            {items && items.length > 0 ? (
                <List>
                    {items.map((name, i) => (
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/tags/${name}`}
                            key={i}
                        >
                            <ListItem
                                key={i}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TagIcon />
                                    </ListItemIcon>
                                    {isLoading ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        <ListItemText primary={name} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <List>
                    <div className={s.emptyBlock}>No tags yet</div>
                </List>
            )}
        </SideBlock>
    );
};

export default TagsBlock;
