import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full card shadow-xl bg-base-200 p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-lg text-center mb-6">
          Have questions or feedback? Get in touch with us using the form below.
        </p>

        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>

        <div className="divider">OR</div>
        <div className="text-center">
          <p className="font-semibold">Email: support@jobfinder.com</p>
          <p className="font-semibold">Phone: +880 1234 567890</p>
          <p className="font-semibold">Address: Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
