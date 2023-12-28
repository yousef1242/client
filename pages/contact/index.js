import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MapContainer, TileLayer } from "react-leaflet";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import PageNameSection from "@/components/pageNameSection/PageNameSection";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="contactPage">
        <PageNameSection
          title={"Contact"}
          links={[
            { name: "Home", to: "/" },
            { name: "Contact", to: "/contact" },
          ]}
        />
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="shadow p-4">
                <h4 className="fw-bold mb-4">
                  AUTO <span style={{ color: "var(--orange)" }}>SHOWROOM</span>
                </h4>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <FaPhoneAlt />
                  </span>
                  <span>+01 123 456 78</span>
                </div>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <MdEmail />
                  </span>
                  <span>example@gmail.com</span>
                </div>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <FaLocationArrow />
                  </span>
                  <span>
                    418 Saint Regis Rd, Hogansburg, New York, NY 10000, USA
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link href={"/"} className="text-white bg-black px-3 py-2">
                    <FaFacebook />
                  </Link>
                  <Link href={"/"} className="text-white bg-black px-3 py-2">
                    <FaInstagram />
                  </Link>
                  <Link href={"/"} className="text-white bg-black px-3 py-2">
                    <FaTwitter />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-8">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Other components specific to your map */}
              </MapContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
