import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { UrlObject } from "url";
import {
  PlaceholderValue,
  OnLoadingComplete,
} from "next/dist/shared/lib/get-img-props";

// Table component with explicit React.JSX.Element return type
type TableProps = {
  data: {
    headers: (string | number | bigint | boolean | React.ReactNode | null | undefined)[];
    rows: any[][];
  };
};

function Table({ data }: TableProps): React.JSX.Element {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.JSX.IntrinsicAttributes &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > & {
    href?: string | UrlObject;
    as?: string | UrlObject;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean | null;
    locale?: string | false;
    legacyBehavior?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

function CustomLink(props: CustomLinkProps) {
  const { href, ...rest } = props; // Extract href to handle separately

  if (!href) {
    return <a {...rest} />;
  }

  if (typeof href === "string" && href.startsWith("/")) {
    return (
      <Link {...rest} href={href}>
        {props.children}
      </Link>
    );
  }

  if (typeof href === "string" && href.startsWith("#")) {
    return <a {...rest} href={href} />;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest} href={href as string}>
      {props.children}
    </a>
  );
}

type RoundedImageProps = React.JSX.IntrinsicAttributes &
  Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    "ref" | "height" | "width" | "loading" | "alt" | "src" | "srcSet"
  > & {
    src: string | import("next/dist/shared/lib/get-img-props").StaticImport;
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    fill?: boolean | undefined;
    loader?: import("next/image").ImageLoader | undefined;
    quality?: number | `${number}` | undefined;
    priority?: boolean | undefined;
    loading?: "eager" | "lazy" | undefined;
    placeholder?: PlaceholderValue | undefined;
    blurDataURL?: string | undefined;
    unoptimized?: boolean | undefined;
    overrideSrc?: string | undefined;
    onLoadingComplete?: OnLoadingComplete | undefined;
    layout?: string | undefined;
    objectFit?: string | undefined;
    objectPosition?: string | undefined;
    lazyBoundary?: string | undefined;
    lazyRoot?: string | undefined;
  } & React.RefAttributes<HTMLImageElement | null>;

function RoundedImage(props: RoundedImageProps) {
  return <Image className="rounded-lg" {...props} />;
}

// Updated Code component to handle optional children and ReactNode
type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;  // Make children optional
};

function Code({ children, ...props }: CodeProps): React.JSX.Element {
  // Safely convert children to string if it's not a string, or handle undefined
  const codeString = typeof children === 'string' ? children : String(children ?? '');
  const codeHTML = highlight(codeString);

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: { toString: () => string }): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Ensure children is converted to a string safely
    const slug = slugify(children ? String(children) : "");

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props: React.JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      //@ts-ignore
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}