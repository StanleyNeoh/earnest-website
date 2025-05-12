"use client";
import { redirect, useRouter } from "next/navigation";
import StarBackground from "@/components/decorations/star-background";
import ShootingStars from "@/components/decorations/shooting-star";
import { Button } from "../elements/button";
import { FormNextToSectionProps } from "@/types/components/dynamic-zone";
import { toast, Toaster } from "react-hot-toast";

export const FormNextToSection = async ({
  heading,
  sub_heading,
  form,
  sections,
}: FormNextToSectionProps) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { name, email, phone, company_name, inquiry_type, service_interest, estimated_budget, message } = data;
    const url = new URL(`api/leads`, process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name,
            email,
            phone,
            company_name,
            inquiry_type,
            service_interest,
            estimated_budget,
            message,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response", errorData);
        toast.error(`Error: ${errorData.error.message || "Something went wrong"}`);
        return;
      }

      router.push("/submit-success");
    } catch (error: any) {
      console.error("Unexpected error", error);
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    }
  }

  return (
    <>
      <Toaster />
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
        <div className="flex relative z-20 items-center w-full justify-center px-4 py-4 lg:py-40 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
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
                {form?.inputs?.map((input: any) => (
                  <div key={input.id}>
                    {input.type !== "submit" && (
                      <label
                        htmlFor={input.name}
                        className="block text-sm font-medium leading-6 text-neutral-800"
                      >
                        {input.display_name}
                      </label>
                    )}

                    <div className="mt-2">
                      {input.type === "textarea" ? (
                        <textarea
                          rows={5}
                          id={input.name}
                          name={input.name}
                          placeholder={input.placeholder}
                          className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        />
                      ) : input.type === "enum" ? (
                        <select
                          id={input.name}
                          name={input.name}
                          className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        >
                          <option value="" disabled>
                            {input.placeholder}
                          </option>
                          {input.options.map((option: any) => (
                            <option key={option.id} value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      ) : input.type === "submit" ? (
                        <Button className="w-full mt-6" type="submit">
                          {input.display_name || "Submit"}
                        </Button>
                      ) : (
                        <input
                          id={input.name}
                          name={input.name}
                          type={input.type}
                          placeholder={input.placeholder}
                          className="block w-full bg-neutral-100 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-neutral-800 placeholder:text-gray-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className="relative w-full z-20 hidden md:flex border-l border-charcoal overflow-hidden bg-neutral-900 items-center justify-center">
          <StarBackground />
          <ShootingStars />
          <div className="max-w-sm mx-auto">
            <p className="font-semibold text-xl text-center text-muted text-balance">
              {sections?.[0]?.title || "We're Here to Help"}
            </p>
            <p className="font-normal text-base text-center text-neutral-500 mt-8 text-balance">
              {sections?.[0]?.subtitle ||
                "Our team is ready to guide you through every step of your workspace journey."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};