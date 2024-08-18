const constants = {
    apiRoutes: {
        LOGIN_URL: process.env.REACT_APP_LOGIN_URL,
        UPLOAD_MEDIA_URL: process.env.REACT_APP_UPLOAD_MEDIA_URL,
        USER_URL: process.env.REACT_APP_USER_URL,
    },
    toastSettings: {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    },
};

export default constants;
