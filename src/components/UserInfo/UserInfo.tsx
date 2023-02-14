
import React, { FunctionComponent } from 'react';

import s from './UserInfo.module.scss';

interface IUserInfo {
    avatarUrl: string;
    fullName: string;
    additionalText: string;
}

const UserInfo: FunctionComponent<IUserInfo> = ({ avatarUrl, fullName, additionalText }) => {
    return (
        <div className={s.root}>
            <img
                className={s.avatar}
                src={avatarUrl || '/noavatar.png'}
                alt={fullName}
            />
            <div className={s.userDetails}>
                <span className={s.userName}>
                    {fullName}
                </span>
                <span className={s.additional}>
                    {additionalText}
                </span>
            </div>
        </div>
    );
};

export default UserInfo;
