import React from "react";

const ContactInfoBox = ({ iconClass, title, children }) => {
    return (
        <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="contact text-center mb-30">
                <i className={iconClass}></i>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
};

export default ContactInfoBox;
