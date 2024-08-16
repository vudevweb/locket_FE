import React from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Header from "~/components/Header";

const cx = classNames.bind(styles);

const Profile = () => {
    return (
        // <div className={cx("wrapper")}>
            <>
            <Header />
                <div className={cx("content")}>
                    <div className={cx("wrapper")}>
                        <div className={cx("card")}> Đang phát triển....! :0 </div>
                    </div>
                </div>
            </>
        // </div>
    );
};

export default Profile;
