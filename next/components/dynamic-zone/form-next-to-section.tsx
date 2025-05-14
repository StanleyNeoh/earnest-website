"use client";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import StarBackground from "@/components/decorations/star-background";
import ShootingStars from "@/components/decorations/shooting-star";
import { FormNextToSectionProps } from "@/types/components/dynamic-zone";
import { Button } from "../elements/button";
import { ParagraphStory } from "../paragraph-story";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const FormNextToSection = ({
  heading,
  sub_heading,
  sections,
  locale,
}: FormNextToSectionProps & {
  locale: string;
}) => {
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

    if (!name || !email || !phone || !companyName || !serviceInterest) {
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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <Toaster />
      <div className="flex relative items-center w-full justify-center px-6">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-charcoal">
              {heading || "Let's Bring Your Vision to Life"}
            </h1>
            <p className="mt-4 text-charcoal text-sm max-w-sm">
              {sub_heading ||
                "Ready to start your next design project? Reach out to us — we'd love to hear from you"}
            </p>
          </div>

          <div className="py-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
                  className="block text-sm font-medium leading-6 text-neutral-800"
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
              </div>

              { !verified && (
                <div className="text-sm text-red-500">
                  Please verify that you are not a robot
                </div>
              )}
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
      </div>
      <div className="relative w-full z-20 hidden md:flex border-l border-charcoal overflow-hidden bg-neutral-900 items-center justify-center px-12">
        <StarBackground />
        <ShootingStars />
        {
          sections?.map((section, index) => (
            <ParagraphStory
              {...section}
              key={index}
              locale={locale}
              containerClassName="bg-transparent"
              headerClassName="lg:flex-col-reverse xl:flex-row"
              titleClassName="text-white text-2xl font-bold"
              subtitleClassName="text-white text-sm font-normal"
              imgParaParagraphClassName="text-white text-sm font-normal"
              imgParaTitleClassName="text-white text-2xl font-bold"
            />
          ))
        }
      </div>
    </div>
  );
};