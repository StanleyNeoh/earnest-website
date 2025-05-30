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
import { Locale } from "@/config";

function contactLocalised(locale: string) {
  if (locale === "zh") {
    return {
      header: "联系我们",
      fields: [
        {
          name: "name",
          label: "姓名",
          placeholder: "请输入您的姓名",
          required: true,
          type: "text",
        },
        {
          name: "email",
          label: "邮箱",
          placeholder: "请输入您的邮箱",
          required: true,
          type: "email",
        },
        {
          name: "phone",
          label: "电话",
          placeholder: "请输入您的电话号码",
          required: true,
          type: "text",
        },
        {
          name: "company_name",
          label: "公司名称",
          placeholder: "请输入您的公司名称",
          required: true,
          type: "text",
        },
        {
          name: "service_interest",
          label: "服务意向",
          required: true,
          type: "select",
          options: ["租赁咨询", "设计与建造", "设计顾问", "还原装修"],
        },
        {
          name: "message",
          label: "留言",
          placeholder: "请输入您的留言内容",
          required: false,
          type: "textarea",
        },
        {
          name: "attachments",
          label: "附件",
          placeholder: "选择文件      未选择文件",
          required: false,
          type: "file",
        },
      ],
      captcha: "请确认您不是机器人",
      submit: "提交",
      contactDetails: "联系信息"
    };
  }
  return {
    header: "Get in Touch",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
        type: "text",
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
        type: "email",
      },
      {
        name: "phone",
        label: "Phone",
        placeholder: "Enter your phone number",
        required: true,
        type: "text",
      },
      {
        name: "company_name",
        label: "Company Name",
        placeholder: "Enter your company name",
        required: true,
        type: "text",
      },
      {
        name: "service_interest",
        label: "Service Interest",
        required: true,
        type: "select",
        options: ["Pre-Lease Advisory", "Design and Build", "Design Consultancy", "Reinstatement"],
      },
      {
        name: "message",
        label: "Message",
        placeholder: "Enter your message",
        required: false,
        type: "textarea",
      },
      {
        name: "attachments",
        label: "Attachments",
        placeholder: "Choose file      No file chosen",
        required: false,
        type: "file",
      },
    ],
    captcha: "Please verify that you are not a robot",
    submit: "Submit",
    contactDetails: "Contact Details"
  };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const { header, fields, captcha, submit, contactDetails } = contactLocalised(locale);
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
            {header}
          </h1>
        </div>
        <div className="pt-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {fields.map((field, idx) => {
              if (field.type === "select") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-md font-medium leading-6 text-neutral-800">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-2">
                      <select
                        id={field.name}
                        name={field.name}
                        className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        defaultValue=""
                        required={field.required}
                      >
                        <option value="" disabled hidden>
                          --
                        </option>
                        {Array.isArray(field.options) && field.options.map((option: string, i: number) => (
                          <option key={i} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              } else if (field.type === "textarea") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-md font-medium leading-6 text-neutral-800">
                      {field.label}
                    </label>
                    <div className="mt-2">
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        rows={4}
                        required={field.required}
                      />
                    </div>
                  </div>
                );
              } else if (field.type === "file") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-md font-medium leading-6 text-neutral-800">
                      {field.label}
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        multiple
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-md font-medium leading-6 text-neutral-800">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        required={field.required}
                      />
                    </div>
                  </div>
                );
              }
            })}
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
                onExpired={handleCaptchaExpired}
              />
              <div className="text-sm text-gray-600 mt-2">{captcha}</div>
            </div>
            <Button
              className={`w-full mt-6 ${!verified ? "opacity-50 cursor-not-allowed" : ""}`}
              variant="muted"
              type="submit"
              disabled={isSubmitting || !verified}
            >
              {submit}
            </Button>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-full justify-start gap-6">
        {/* Contact Details Card: always visible */}
        <div className="bg-white/95 p-6 flex flex-col gap-4 w-full z-10 md:rounded-2xl md:shadow-2xl md:border md:border-gray-200 ">
          <h2 className="text-lg font-semibold text-blue-800">{contactDetails}</h2>
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

        {/* Mapbox Map: only on md+ screens, next to the card */}
        <div className="relative w-full h-80 z-10">
          <MapboxMap className="md:rounded-2xl md:shadow-2xl md:border md:border-gray-200" />
        </div>
      </div>
    </div>
  );
};