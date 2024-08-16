import React from "react";
import TippyHeadless from "@tippyjs/react/headless";
import styles from "./Help.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Help = () => (
    <div>
        <TippyHeadless
            render={(attrs) => (
                <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
                    <p className={cx("content")}>
                        - Hiện tại, chỉ đăng được hình ảnh dưới{" "}
                        <b> 1MB. </b> <br />
                        - Video dưới <b>10 MB</b> và không quá{" "}
                        <b>
                            1&nbsp; phút.
                            <br />
                        </b>{" "}
                        - Bạn có thể truy cập{" "}
                        <a
                            className={cx("link")}
                            href="https://tinypng.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            trang này
                        </a>
                        <span> để nén hình ảnh.</span>
                        <br />
                        <span>
                            - Hoặc truy cập{" "}
                            <a
                                className={cx("link")}
                                href="https://www.freeconvert.com/video-compressor"
                                target="_blank"
                                rel="noreferrer"
                            >
                                trang này
                            </a>{" "}
                            để nén hình ảnh hoặc video.
                        </span>
                    </p>
                </div>
            )}
            interactive
            delay={[100, 500]}
            // offset={[25, 10]}
            placement="top-start"
            hideOnClick={false}
        >
            <div className={cx("help-me")}>Chú ý!</div>
        </TippyHeadless>
    </div>
);

export default Help;
