"use client";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/elements/button";

import { LinkedInIcon } from "@/components/icons/illustrations";
import { MailIcon, MapPin, PhoneIcon } from "lucide-react";
import MapboxMap from "@/components/mapbox-map";
import { IoLogoWhatsapp } from "react-icons/io";

import biosensorLogo from "@/public/contact-brands/biosensors.png";
import carlsbergLogo from "@/public/contact-brands/carlsberg-singapore.png";
import chinaCommunicationsLogo from "@/public/contact-brands/china-communications-cropped.svg";
import dominosLogo from "@/public/contact-brands/dominos-pizza-cropped.svg";
import garminLogo from "@/public/contact-brands/garmin.svg";
import jurongPortLogo from "@/public/contact-brands/jurong-port.png";
import krisshopLogo from "@/public/contact-brands/krisshop.svg";
import sfExpressLogo from "@/public/contact-brands/sf-express.svg";
import sisLogo from "@/public/contact-brands/sis.png";
import sunstarLogo from "@/public/contact-brands/sunstar-cropped.png";
import Image from "next/image";

const logos = [biosensorLogo, carlsbergLogo, chinaCommunicationsLogo, dominosLogo, garminLogo, jurongPortLogo, krisshopLogo, sfExpressLogo, sisLogo, sunstarLogo];

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [verified, setVerified] = useState(false);

  const handleCaptchaChange = async (token: string | null) => {
    try {
      if (!token) throw new Error("No recaptcha token received");
      const response = await fetch("/api/recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error("Failed to verify reCAPTCHA");
      setVerified(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify reCAPTCHA");
      recaptchaRef.current?.reset();
      setVerified(false);
    }
  };

  const handleCaptchaExpired = () => {
    setVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const companyName = formData.get("company_name") as string;
    const serviceInterest = formData.get("service_interest") as string;

    if (!name || !email || !companyName || !phone || !serviceInterest) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!verified) {
      toast.error("Please verify that you are not a robot");
      setIsSubmitting(false);
      return;
    }

    try {
      const attachments = formData.getAll("attachments") as File[];
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("phone", phone);
      formDataToSend.append("company_name", companyName);
      formDataToSend.append("service_interest", serviceInterest);
      formDataToSend.append("message", formData.get("message") as string);
      attachments.forEach((file) => {
        formDataToSend.append("attachments", file, file.name);
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const { success } = await response.json();
      if (!success) {
        throw new Error("Failed to send email");
      }
      toast.success("Form submitted successfully!");
      router.push("/submit-success");
    } catch (error: any) {
      console.error("Unexpected error", error);
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-20 gap-8 md:mx-8">
      <Toaster />
      <div className="flex flex-col w-full justify-center bg-white px-6 py-4 md:rounded-2xl md:shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold text-center md:text-start">
            Get in Touch
          </h1>
        </div>
        <div className="pt-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company_name"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  placeholder="Enter your company name"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service_interest"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Service Interest <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="service_interest"
                  name="service_interest"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="pre-lease">Pre-Lease</option>
                  <option value="design-and-build">Design and Build</option>
                  <option value="design-consultancy">Design Consultancy</option>
                  <option value="reinstatement">Reinstatement</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Message
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Enter your message"
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="attachments"
                className="block text-md font-medium leading-6 text-neutral-800"
              >
                Attachments
              </label>
              <div className="mt-2">
                <input
                  id="attachments"
                  name="attachments"
                  type="file"
                  multiple
                  className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
                onExpired={handleCaptchaExpired}
              />
              {!verified && (
                <div className="text-sm text-red-500">
                  Please verify that you are not a robot
                </div>
              )}
            </div>

            <Button
              className={`w-full mt-6 ${!verified ? "opacity-50 cursor-not-allowed" : ""}`}
              variant="muted"
              type="submit"
              disabled={isSubmitting || !verified}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-full justify-start gap-6">
        {/* Contact Details Card: always visible */}
        <div className="bg-white/95 p-6 flex flex-col gap-4 w-full z-10 md:rounded-2xl md:shadow-2xl md:border md:border-gray-200 ">
          <h2 className="text-lg font-semibold text-blue-800">Contact Details</h2>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <div>
              <div className="font-medium text-gray-800">{process.env.NEXT_PUBLIC_EARNEST_NAME}</div>
              <div className="text-gray-600 text-sm">{process.env.NEXT_PUBLIC_EARNEST_ADDRESS}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5">
              <PhoneIcon />
            </div>
            <span className="text-gray-700 text-sm">{process.env.NEXT_PUBLIC_EARNEST_PHONE}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5">
              <IoLogoWhatsapp />
            </div>
            <a href={process.env.NEXT_PUBLIC_EARNEST_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">WhatsApp</a>
          </div>
          <div className="flex items-center gap-3">
            <MailIcon className="w-5 h-5" />
            <a href={`mailto:${process.env.NEXT_PUBLIC_EARNEST_EMAIL}`} className="text-blue-700 underline text-sm">{process.env.NEXT_PUBLIC_EARNEST_EMAIL}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5">
              <LinkedInIcon />
            </div>
            <a href={process.env.NEXT_PUBLIC_EARNEST_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">LinkedIn</a>
          </div>
        </div>

        {/* Client Logos: always visible */}
        <div className="bg-white/95 p-6 flex flex-col gap-4 w-full z-10 md:rounded-2xl md:shadow-2xl md:border md:border-gray-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Trusted by major brands</h2>
          <div className="flex flex-row flex-wrap gap-8 justify-center justify-items-center">
            {logos.map((logo, idx) => {
              return (
                <Image
                  key={idx}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  alt={`Client logo ${idx + 1}`}
                  className="w-24 max-h-12 object-contain"
                  loading="lazy"
                />
              )
            })}
          </div>
        </div>

        {/* Mapbox Map: only on md+ screens, next to the card */}
        <div className="relative w-full h-80 z-10">
          <MapboxMap className="md:rounded-2xl md:shadow-2xl md:border md:border-gray-200" />
        </div>
      </div>
    </div>
  );
};