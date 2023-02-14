import React, { FunctionComponent } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import SideBlock from "../SideBlock";
import { IComment } from '../../redux/slices/commentSlice';

import s from './CommentsBlock.module.scss';


interface ICommentsBlock {
    comments: IComment[] | null;
    isLoading: boolean;
}

const CommentsBlock: FunctionComponent<ICommentsBlock> = ({ comments, isLoading = true }) => {
    return (
        <SideBlock title="Comments">
            {comments && comments.length > 0 ? (
                <List>
                    {comments.map((comment) => (
                        <React.Fragment key={comment._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading
                                    ? <Skeleton variant="circular" width={40} height={40} />
                                    : <Avatar alt={comment.fullName} src={comment?.avatarUrl} />}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </div>
                            ) : (
                                <ListItemText
                                    primary={comment.fullName}
                                    secondary={comment.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                    ))}
                </List>
            ) : (
                <List>
                    <div className={s.emptyBlock}>No comments yet</div>
                </List>
            )}
        </SideBlock>
    );
};

export default CommentsBlock;
