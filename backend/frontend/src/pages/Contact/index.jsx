import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactInfoBox from "../../components/ContactInfoBox";
import { useState } from "react";

const ContactPage = () => {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/contact-info")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Api khong phan hoi");
                }
                return res.json();
            })
            .then((data) => {
                setInfo(data);
            });
    }, []);
    console.log(info);
    if (!info) return <p>Đang tải dữ liệu</p>;
    console.log(info.google_map);
    return (
        <>
            <Header />

            <main>
                <section
                    className="breadcrumb-area"
                    data-background="img/bg/page-title.png"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="breadcrumb-text text-center">
                                    <h1>Contact Us</h1>
                                    <ul className="breadcrumb-menu">
                                        <li>
                                            <a href="index.html">home</a>
                                        </li>
                                        <li>
                                            <span>Contact</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="contact-area pt-120 pb-90"
                    data-background="assets/img/bg/bg-map.html"
                >
                    <div className="container">
                        <div className="row">
                            <ContactInfoBox
                                iconClass="fas fa-envelope"
                                title="Mail Here"
                            >
                                <p>
                                    <a href="#">{info.email}</a>
                                </p>
                            </ContactInfoBox>
                            <ContactInfoBox
                                iconClass="fas fa-map-marker-alt"
                                title="Visit Here"
                            >
                                <p>{info.address}</p>
                            </ContactInfoBox>
                            <ContactInfoBox
                                iconClass="fas fa-phone"
                                title="Call Here"
                            >
                                <p>{info.phone}</p>
                            </ContactInfoBox>
                        </div>
                    </div>
                </section>

                <section className="map-area">
                    <div id="contact-map" className="contact-map">
                        <iframe
                            src={info.google_map}
                            width="100%"
                            height="450"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
            </main>

            <Footer />

            <div className="search-wrap">
                <div className="search-inner">
                    <i
                        className="fas fa-times search-close"
                        id="search-close"
                    ></i>
                    <div className="search-cell">
                        <form method="get">
                            <div className="search-field-holder">
                                <input
                                    type="search"
                                    className="main-search-input"
                                    placeholder="Search Entire Store..."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
