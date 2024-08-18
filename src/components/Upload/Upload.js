import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

import { AuthContext } from "~/contexts/AuthContext";
import constants from "~/services/constants";
import images from "~/assets/images";
import LoginModal from "../Modals/Login/LoginModal";
import * as miscFuncs from "~/helper/misc-functions";
import * as lockerService from "~/services/locketService";
import Help from "../Modals/Login/Help";
const cx = classNames.bind(styles);

const Upload = () => {
    const { user, setUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleAfterLogin = (userInfo) => {
        setIsShowModal(false);
        setUser(userInfo.user);

        toast.dismiss();
        toast.success("Đăng nhập thành công", {
            ...constants.toastSettings,
        });
        // Lưu vào cookie
        miscFuncs.setCookie("user", JSON.stringify(userInfo.user), 1);
    };

    const handleTriggerUploadFile = () => {
        fileRef.current.click();
    };

    const handleSelectFile = (e) => {
        const { files } = e.target;
        if (files?.length) {
            const objectUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(objectUrl);
        }
    };

    const handleDragOver = (e) => {
        // Ngăn chặn hành động mặc định của thẻ HTML để cho phép thả file vào
        e.preventDefault();
    };

    const handleSelectFileFromDrop = (e) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        if (files?.length) {
            const objectUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(objectUrl);
        }
    };

    const handleUploadFile = () => {
        const fileType = file.type.includes("image") ? "image" : "video";
        if (file) {
            setIsUploading(true);
            lockerService
                .uploadMedia(file, caption, showToastPleaseWait)
                .then((res) => {
                    if (res) {
                        setPreviewUrl("");
                        setCaption("");
                        setIsUploading(false);

                        // toast.success(`Upload ${fileType} successfully`, {
                        //     ...constants.toastSettings,
                        // });
                        toast.success(`Đăng bài thành công`, {
                            ...constants.toastSettings,
                        });
                    }
                })
                .catch((error) => {
                    let message =
                        error?.response?.data?.error?.message ||
                        "Không thể tải lên";

                    if (message === "Không thể tải lên") {
                        message = `
                            File không hợp lệ hoặc dung lượng file quá lớn.
                            Vui lòng chọn file khác và thử lại
                            `;
                        // message = `Your ${fileType} is exceeding the maximum size allowed, please try again with a smaller ${fileType}`;
                    }
                    setIsUploading(false);
                    toast.error(message, {
                        ...constants.toastSettings,
                    });
                });
        }
    };

    const showToastPleaseWait = () => {
        toast.dismiss();
        toast.info(
            "Vui lòng đợi! Hệ thống đang xử lý yêu cầu của bạn",
            {
                ...constants.toastSettings,
            },
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("card")}>
                {user ? (
                    <>
                        <h4 className="text-center">Tải lên hình ảnh hoặc video</h4>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập caption cho bài đăng"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                        <div
                            className={cx("upload-area")}
                            onDragOver={handleDragOver}
                            onDrop={handleSelectFileFromDrop}
                            role="button"
                            tabIndex="0"
                        >
                            {previewUrl ? (
                                <div className={cx("preview-wrapper")}>
                                    {file.type.includes("image") ? (
                                        <img
                                            src={previewUrl}
                                            alt="preview"
                                            className={cx("preview-image")}
                                        />
                                    ) : (
                                        <video
                                            src={previewUrl}
                                            alt="preview"
                                            className={cx("preview-video")}
                                            controls
                                        >
                                            <track
                                                kind="captions"
                                                src="captions.vtt"
                                                label="English"
                                            />
                                        </video>
                                    )}
                                    <button
                                        className={cx("btn-delete-preview")}
                                        onClick={() => setPreviewUrl("")}
                                    >
                                        <span>&times;</span>
                                    </button>
                                </div>
                            ) : (
                                <div className={cx("content")}>
                                    <button className={cx("btn-upload")} onClick={handleTriggerUploadFile}>
                                        <img
                                            src={images.mediaUpload}
                                            alt="upload"
                                            className={cx("upload-icon")}
                                        />
                                    </button>
                                    <h3>
                                        {/* Kéo thả ảnh, video vào đây hoặc{" "}
                                        <button
                                            className={cx("underline")}
                                            onClick={handleTriggerUploadFile}
                                        >
                                            chọn ảnh từ thư viện của bạn
                                        </button> */}
                                        <input
                                            type="file"
                                            ref={fileRef}
                                            onChange={handleSelectFile}
                                            accept="image/*,video/*"
                                        />
                                    </h3>
                                </div>
                            )}
                        </div>
                        <div className={cx("actions")}>
                            <Help />
                            <div className={cx("buttons")}>
                                <button onClick={() => setPreviewUrl("")}>
                                    Hủy
                                </button>
                                <button
                                    disabled={
                                        previewUrl && caption && !isUploading
                                            ? ""
                                            : "disable"
                                    }
                                    className={cx("btn-submit", {
                                        "is-loading": isUploading,
                                    })}
                                    onClick={handleUploadFile}
                                >
                                    <span>Đăng bài</span>
                                    {isUploading && (
                                        <img
                                            src={images.spinner}
                                            alt="spinner"
                                            className={cx("spinner")}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx("no-login")}>
                        <h3> Đăng nhập để có thể đăng ảnh hoặc video </h3>
                        <button
                            className={cx("btn-login")}
                            onClick={() => setIsShowModal(true)}
                        >
                            Đăng nhập ngay
                        </button>
                        <LoginModal
                            handleAfterLogin={handleAfterLogin}
                            show={isShowModal}
                            onHide={() => setIsShowModal(false)}
                            onPleaseWait={showToastPleaseWait}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
