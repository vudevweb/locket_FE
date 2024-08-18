import React from "react";
import { useContext } from "react";

import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Header from "~/components/Header";


const cx = classNames.bind(styles);

const Profile = () => {

    return (
        <>
            <Header />
            <div className={cx("content")}>
                <div className={cx("wrapper")}>
                    <div className={cx("card")}>
                        <div className="card-body">
                            <div className="text-center"> Đang phát tiển ...! </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
