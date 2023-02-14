import React from "react";

import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import s from "./Post.module.scss";

const PostSkeleton = () => {
    return (
        <div className={s.skeleton}>
            <Stack spacing={1}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                />
                <div className={s.skeletonContent}>
                    <div className={s.skeletonUser}>
                    <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        style={{ marginRight: 10 }}
                    />
                    <div className={s.skeletonUserDetails}>
                        <Skeleton
                            variant="text"
                            width={60}
                            height={20}
                        />
                        <Skeleton
                            variant="text"
                            width={100}
                            height={15}
                        />
                    </div>
                    </div>
                    <div className={s.skeletonInfo}>
                        <Skeleton
                            variant="text"
                            width="80%"
                            height={45}
                            />
                        <div className={s.skeletonTags}>
                            <Skeleton
                                variant="text"
                                width={40}
                                height={30}
                                />
                            <Skeleton
                                variant="text"
                                width={40}
                                height={30}
                                />
                            <Skeleton
                                variant="text"
                                width={40}
                                height={30}
                                />
                        </div>
                    </div>
                </div>
            </Stack>
        </div>
    );
};

export default PostSkeleton;
