import {
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import PageNameSection from "@/components/pageNameSection/PageNameSection";
import { useState } from "react";
import dynamic from "next/dynamic";

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
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <div className="shadow p-4">
                <h4 className="fw-bold mb-4">
                  MOTOR <span style={{ color: "var(--orange)" }}>ONE</span>
                </h4>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <FaPhoneAlt />
                  </span>
                  <span>+1126556666</span>
                </div>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <MdEmail />
                  </span>
                  <span>Motoroneeg1998@gmail.com</span>
                </div>
                <div className="d-flex align-items-center mb-4 gap-2">
                  <span>
                    <FaLocationArrow />
                  </span>
                  <span>New Cairo 1, Cairo Governorate 4735420</span>
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
            <div className="col-12 col-md-8">
              <div className="shadow p-4 h-100 w-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.3939775026024!2d31.4688483!3d30.054239499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823b5e13fd379%3A0x5c02c50b74ed8e4!2sMOTOR%20ONE%20-%20LUXURY!5e0!3m2!1sen!2seg!4v1704321331557!5m2!1sen!2seg"
                  className="w-100 h-100"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
