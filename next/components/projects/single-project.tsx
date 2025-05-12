"use client";
import React from "react";
import { Project } from "@/types/types";
import { motion } from "framer-motion";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { BlurImage } from "../blur-image";
import { ParagraphStory } from "../paragraph-story";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export const SingleProject = ({
  project,
  locale,
  containerClassName,
}: {
  project: Project,
  locale: string,
  containerClassName?: string,
}) => {
  const infoSectionClassName = "flex flex-col lg:flex-row gap-2 lg:gap-20 items-center lg:items-start";
  return (
    <div className={cn(containerClassName)}>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex flex-col justify-center gap-4">
          <Heading className="text-center lg:text-start mx-0 font-medium text-charcoal">
            {project.name}
          </Heading>

          <Subheading className="text-center lg:text-start mx-0 text-neutral-500 text-lg">
            {project.description}
          </Subheading>

          <div className={infoSectionClassName}>
            <Subheading className="text-center lg:text-start m-0 text-neutral-500 text-lg font-bold">
              Companies:
            </Subheading>
            <div className="flex flex-col gap-2">
              {
                project.companies?.map((company, index) => (
                  <BlurImage
                    key={index}
                    src={strapiImage(company.logo?.url)}
                    alt="Featured Project Logo"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ))
              }
            </div>
          </div>

          <div className={infoSectionClassName}>
            <Subheading className="text-center lg:text-start m-0 text-neutral-500 text-lg font-bold">
              Services
            </Subheading>
            <div className="flex flex-col gap-2">
              <ul className="list-disc list-inside">
              {
                project.services?.map((services, index) => (
                    <li key={index} className="text-neutral-500 text-lg">
                      {services.name}
                    </li>
                ))
              }
              </ul>
            </div>
          </div>

          <div className={infoSectionClassName}>
            <Subheading className="text-center lg:text-start m-0 text-neutral-500 text-lg font-bold">
              Completed On
            </Subheading>
            <p className="text-neutral-500 text-lg">
              {project?.completion_date || "N/A"}
            </p>
          </div>
        </div>

        {
          project.thumbnail && (
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              className="rounded-lg relative overflow-hidden"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 35,
              }}
              >
                <BlurImage
                  src={strapiImage(project.thumbnail.url)}
                  alt={project.name}
                  width={600}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </motion.div>
          )
        }
      </div>
      {
        project.story.map((story, index) => (
          <ParagraphStory
            key={index}
            {...story}
            locale={locale}
            containerClassName="bg-white my-10 rounded-lg shadow-md p-8"
          />
        ))
      }
      <div className="my-10">
        <Heading className="text-center text-charcoal mb-8">
          Testimonials
        </Heading>
        <Carousel>
          <CarouselContent>
            {
              project.testimonials?.map((testimonial, index) => (
                <CarouselItem key={index}
                  className="flex items-center justify-center"
                >
                  <div className="w-96 flex flex-col gap-2 bg-gradient-to-r from-slate-200 to-slate-100 rounded-md p-4 border-4 border-gray-300 shadow-md hover:shadow-lg">
                    <p className="text-neutral-500 text-lg">
                      {`"${testimonial.remarks}"`}
                    </p>
                    <p className="text-neutral-500 text-lg font-bold text-right">
                      {testimonial.representative_name}
                    </p>
                    <p className="text-neutral-500 text-lg font-bold text-right">
                      {testimonial.representative_role}
                    </p>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}