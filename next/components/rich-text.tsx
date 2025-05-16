import React, { ReactNode } from "react";
import { RichTextNode } from "@/types/components/simple";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";

function renderText(node: RichTextNode) {
  let el: ReactNode = node.text || "";
  if (node.bold) el = <strong>{el}</strong>;
  if (node.italic) el = <em>{el}</em>;
  if (node.underline) el = <u>{el}</u>;
  if (node.strikethrough) el = <span style={{ textDecoration: "line-through" }}>{el}</span>;
  if (node.code) el = <code className="bg-neutral-100 px-1 rounded">{el}</code>;
  return el;
}
// @TODO: Use blocks-react-renderer for this
function RichText({
  node,
  heading1ClassName,
  heading2ClassName,
  heading3ClassName,
  heading4ClassName,
  heading5ClassName,
  heading6ClassName,
  paragraphClassName,
  quoteClassName,
  codeClassName,
  listClassName,
  listItemClassName,
  imageClassName,
  linkClassName,
}: {
  node: RichTextNode,
  heading1ClassName?: string,
  heading2ClassName?: string,
  heading3ClassName?: string,
  heading4ClassName?: string,
  heading5ClassName?: string,
  heading6ClassName?: string,
  paragraphClassName?: string,
  quoteClassName?: string,
  codeClassName?: string,
  listClassName?: string,
  listItemClassName?: string,
  imageClassName?: string,
  linkClassName?: string,
}): React.ReactNode {
  switch (node.type) {
    case "heading": {
      const level = node.level || 1;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const levelClassName =
        level === 1 ? heading1ClassName :
        level === 2 ? heading2ClassName :
        level === 3 ? heading3ClassName :
        level === 4 ? heading4ClassName :
        level === 5 ? heading5ClassName :
        level === 6 ? heading6ClassName : undefined;
      return React.createElement(
        HeadingTag,
        { className: cn("font-bold mt-6 mb-2 text-gray-900", levelClassName) },
        node.children?.map((child, i) => (
          <RichText
            key={i}
            node={child}
            heading1ClassName={heading1ClassName}
            heading2ClassName={heading2ClassName}
            heading3ClassName={heading3ClassName}
            heading4ClassName={heading4ClassName}
            heading5ClassName={heading5ClassName}
            heading6ClassName={heading6ClassName}
            paragraphClassName={paragraphClassName}
            quoteClassName={quoteClassName}
            codeClassName={codeClassName}
            listClassName={listClassName}
            listItemClassName={listItemClassName}
            imageClassName={imageClassName}
            linkClassName={linkClassName}
          />
        ))
      );
    }
    case "paragraph":
      return (
        <p
          className={cn("mb-4", paragraphClassName)}>
          {node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}
        </p>
      );
    case "quote":
      return (
        <blockquote
          className={cn("border-l-4 border-blue-300 pl-4 italic text-gray-700 my-4", quoteClassName)}>
          {node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}
        </blockquote>
      );
    case "code":
      return (
        <pre
          className={cn("bg-neutral-800 rounded p-3 my-4 overflow-x-auto", codeClassName)}>
          <code>{node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}</code>
        </pre>
      );
    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          className={cn("ml-6 mb-4 list-inside", listClassName)}>
          {node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}
        </ListTag>
      );
    }
    case "list-item":
      return (
        <li
          className={cn("mb-1", listItemClassName)}>
          {node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}
        </li>
      );
    case "image": {
      const img = node.image;
      if (!img?.url) return null;
      return (
        <div
          className={cn("my-6 flex flex-col items-center", imageClassName)}>
          <img
            src={strapiImage(img.url)}
            alt={img.alternativeText || img.name || "image"}
            width={img.width || 600}
            height={img.height || 400}
            className="rounded-lg shadow-md max-w-full h-auto"
          />
          {img.caption && (
            <span className="text-gray-500 text-sm mt-2">{img.caption}</span>
          )}
        </div>
      );
    }
    case "link":
      return (
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("text-blue-700 underline hover:text-blue-900", linkClassName)}
        >
          {node.children?.map((child, i) => (
            <RichText
              key={i}
              node={child}
              heading1ClassName={heading1ClassName}
              heading2ClassName={heading2ClassName}
              heading3ClassName={heading3ClassName}
              heading4ClassName={heading4ClassName}
              heading5ClassName={heading5ClassName}
              heading6ClassName={heading6ClassName}
              paragraphClassName={paragraphClassName}
              quoteClassName={quoteClassName}
              codeClassName={codeClassName}
              listClassName={listClassName}
              listItemClassName={listItemClassName}
              imageClassName={imageClassName}
              linkClassName={linkClassName} />
          ))}
        </a>
      );
    case "text":
      return <>{renderText(node)}</>;
    default:
      return null;
  }
}

export function RichTextRenderer({
  content,
  heading1ClassName,
  heading2ClassName,
  heading3ClassName,
  heading4ClassName,
  heading5ClassName,
  heading6ClassName,
  paragraphClassName,
  quoteClassName,
  codeClassName,
  listClassName,
  listItemClassName,
  imageClassName,
  linkClassName,
  className,
}: {
  content: RichTextNode[];
  heading1ClassName?: string;
  heading2ClassName?: string;
  heading3ClassName?: string;
  heading4ClassName?: string;
  heading5ClassName?: string;
  heading6ClassName?: string;
  paragraphClassName?: string;
  quoteClassName?: string;
  codeClassName?: string;
  listClassName?: string;
  listItemClassName?: string;
  imageClassName?: string;
  linkClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {content.map((node, i) => (
        <RichText
          key={i}
          node={node}
          heading1ClassName={heading1ClassName}
          heading2ClassName={heading2ClassName}
          heading3ClassName={heading3ClassName}
          heading4ClassName={heading4ClassName}
          heading5ClassName={heading5ClassName}
          heading6ClassName={heading6ClassName}
          paragraphClassName={paragraphClassName}
          quoteClassName={quoteClassName}
          codeClassName={codeClassName}
          listClassName={listClassName}
          listItemClassName={listItemClassName}
          imageClassName={imageClassName}
          linkClassName={linkClassName}
        />
      ))}
    </div>
  );
}