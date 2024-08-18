import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import images from "~/assets/images";
import { AuthContext } from "~/contexts/AuthContext";
import UserDropdown from "~/components/UserDropdown";
const cx = classNames.bind(styles);

const Header = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo-wrapper")}>
                <Link to="/"> <img src={images.logo} alt="logo" className={cx("logo")} /> </Link>
            </div>

            {user && (
                <UserDropdown
                    userInfo={user}
                    className={cx("dropdown-wrapper")}
                />
            )}
        </div>
    );
};

export default Header;
