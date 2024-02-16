import React, { useRef, useState } from "react";
import { Header } from "../../components";
//import { CiPhone } from "react-icons/ci";
import { FaPhone, FaMobileAlt } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineTwitter } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_1a8i1mv",
        "template_xclj9xf",
        formRef.current,
        "-tyEzcObKlJQUeEF1"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Feedback Recorded. We will Contact you shortly");
        },
        (error) => {
          console.log(error.text);
          toast.error("Something went Wrong , Please try again later");
        }
      );
    setLoading(false);
    e.target.reset(); // clear input fields
  };

  return (
    <>

      <main className="w-full mx-auto px-2 lg:w-9/12 md:px-6 mt-4 lg:mt-6 flex flex-col md:flex-row justify-between gap-10">
        <section className="w-full md:w-[30rem] bg-pink-200 rounded-md p-6 h-72 lg:mt-20">
          {/* Card */}
          <div className="mb-10">
            <h1 className="text-xl md:text-3xl mb-2">
              Contact Information
            </h1>
            <p className="md:text-lg">
              We're here to help! Fill out the form, or reach out using one of the other methods below.
            </p>
          </div>
          <div>

            <div className="flex items-center gap-2  my-2 md:text-xl">
              <FaPhone />
              <a href="tel:+519-721-9555">+519-721-9555</a>
            </div>
            <div className="flex items-center gap-2 my-2 md:text-xl">
              <AiOutlineMail />
              <a href="mailto: jmcepeda97@gmail.com?subject=Feedback&body=message">
                Support@sportXchange.com
              </a>
            </div>
            <div className="flex items-center gap-2 md:text-xl  my-2">
              <AiOutlineTwitter />
              <a
                href="https://twitter.com/"
                rel="noreferrer"
                target="_blank"
              >
                @sportXchange
              </a>
            </div>
          </div>
        </section>
        <section className="w-full md:w-2/3 rounded-md shadow-lg border-2 p-6">
          {/* Form */}
          <h1 className="text-xl md:text-3xl">Contact Us</h1>
          <form
            className="form-control"
            onSubmit={sendEmail}
            ref={formRef}
          >
            <div className="py-2">
              <label className="label-text md:font-semibold mb-2 block text-lg">
                Name :
              </label>
              <input
                className="input input-bordered max-w-lg w-full border-2"
                type="text"
                placeholder="Full Name"
                required
                name="username"
              />
            </div>
            <div className="py-2">
              <label className="label-text md:font-semibold mb-2 block text-lg">
                Email :
              </label>
              <input
                className="input input-bordered max-w-lg w-full border-2"
                type="email"
                placeholder="Active Email"
                required
                name="email"
              />
            </div>
            <div className="py-2">
              <label className="label-text md:font-semibold mb-2 block text-lg">
                Subject :
              </label>
              <input
                className="input input-bordered max-w-lg w-full border-2"
                type="text"
                placeholder="Subject"
                required
                name="subject"
              />
            </div>
            <div className="py-2">
              <label className="label-text md:font-semibold mb-2 block text-lg">
                Message :
              </label>
              <textarea
                className="textarea textarea-bordered max-w-[100%] w-full"
                rows={5}
                required
                name="message"
              ></textarea>
            </div>
            <div className="flex justify-center">

              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-pink-600 rounded-lg lg:w-auto hover:bg-pink-500 focus:outline-none focus:bg-blue-500" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Contact;
