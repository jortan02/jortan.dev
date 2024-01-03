import {
    defineDocumentType,
    defineNestedType,
    makeSource,
} from "contentlayer/source-files";

const Image = defineNestedType(() => ({
    name: "Image",
    fields: {
        width: { type: "number", required: true },
        height: { type: "number", required: true },
        src: { type: "string", required: true },
    },
}));

export const Portfolio = defineDocumentType(() => ({
    name: "Portfolio",
    filePathPattern: `portfolio/**/*.md`,

    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "date", required: true },
        category: { type: "string", required: true },
        skills: { type: "list", of: { type: "string" }, required: true },
        slug: { type: "string", required: true },
        published: { type: "boolean" },
        url: { type: "string" },
        repository: { type: "string" },
    },
}));

export default makeSource({
    contentDirPath: "src/content",
    documentTypes: [Portfolio],
});
