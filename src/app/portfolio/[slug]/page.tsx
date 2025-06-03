import { sansSerifFont } from "@/styles/fonts";
import { allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { imageSizeFromFile } from "image-size/fromFile";
import { join } from "path";

import { contactInfo } from "@/utils/constants";

type PageParams = {
  params: Promise<{ slug: string }>;
};

async function getPostWithImageSizes(slug: string) {
  const post = allPortfolios.find((item) => item.slug === slug);
  if (!post) {
    return { notFound: true };
  }

  const imageSizes: Record<string, { width: number; height: number }> = {};

  const iterator = post.body.raw.matchAll(/\!\[.*]\((.*)\)/g);

  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    try {
      const { width, height } = await imageSizeFromFile(join(process.cwd(), "public", src));
      imageSizes[src] = { width, height };
    } catch (err) {
      console.error(`Can't get dimensions for ${src}:`, err);
    }
  }

  return { post, imageSizes };
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;

  const result = await getPostWithImageSizes(slug);
  if (!result || result.notFound) {
    notFound();
  }

  const { post, imageSizes } = result!;

  const LinkButton = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      className="duration-200 text-neutral-400 hover:text-neutral-100"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <Navigation />
      <main className="grow space-y-8 text-neutral-800 bg-neutral-100">
        <div className="min-h-96 pb-8 px-4 flex flex-col items-center justify-center text-neutral-300 bg-neutral-900">
          <h1 className="text-neutral-50 text-3xl md:text-5xl text-center">
            {post?.title}
          </h1>
          <p className="pt-6 text-center">{post!.description}</p>
          <ul className="pt-4 text-sm list-none flex items-center justify-center flex-wrap">
            {post!.skills.map((skill) => (
              <li key={skill} className="pr-2">
                {skill}
              </li>
            ))}
          </ul>
          <div className="pt-12 space-x-6">
            {post!.repository ? (
              <LinkButton
                href={`https://${contactInfo.github}/${post!.repository}`}
              >
                GitHub →
              </LinkButton>
            ) : null}
            {post!.url ? (
              <LinkButton href={`https://${post!.url}`}>Website →</LinkButton>
            ) : null}
          </div>
        </div>
        <div
          className={`prose px-4 pt-4 pb-8 mx-auto max-w-4xl flex flex-col justify-start text-justify space-y-6 ${sansSerifFont.className}`}
        >
          <ReactMarkdown
            components={{
              img: (props) => (
                <span className="flex justify-center">
                  {imageSizes![props.src!] ? (
                    <Image
                      src={props.src!}
                      alt={props.alt!}
                      width={imageSizes![props.src!].width}
                      height={imageSizes![props.src!].height}
                      sizes="100vw"
                      className="w-auto max-h-[60vh]"
                    />
                  ) : (
                    <Image
                      src={props.src!}
                      alt={props.alt!}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-auto max-h-[60vh]"
                    />
                  )}
                </span>
              ),
            }}
          >
            {post!.body.raw}
          </ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
