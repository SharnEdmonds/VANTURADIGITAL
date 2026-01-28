import { defineField, defineType } from "sanity";

export const brandIdentity = defineType({
  name: "brandIdentity",
  title: "Brand Identity",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }),
    defineField({ name: "positioningStatement", title: "Positioning Statement", type: "text", rows: 3 }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "logoDark", title: "Logo (Dark)", type: "image" }),
    defineField({
      name: "palette",
      title: "Brand Palette",
      type: "object",
      fields: [
        defineField({ name: "primary", type: "string", title: "Primary" }),
        defineField({ name: "secondary", type: "string", title: "Secondary" }),
        defineField({ name: "accent", type: "string", title: "Accent" }),
        defineField({ name: "background", type: "string", title: "Background" }),
        defineField({ name: "foreground", type: "string", title: "Foreground" }),
        defineField({ name: "muted", type: "string", title: "Muted" }),
        defineField({ name: "mutedForeground", type: "string", title: "Muted Foreground" }),
      ],
    }),
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      fields: [
        defineField({ name: "headingFont", type: "string", title: "Heading Font" }),
        defineField({ name: "bodyFont", type: "string", title: "Body Font" }),
        defineField({ name: "monoFont", type: "string", title: "Mono Font" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});

export const valueProposition = defineType({
  name: "valueProposition",
  title: "Value Proposition",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subheadline", title: "Subheadline", type: "string" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "differentiators",
      title: "Differentiators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
            defineField({ name: "icon", type: "string", title: "Icon Name" }),
          ],
        },
      ],
    }),
    defineField({
      name: "proofPoints",
      title: "Proof Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "metric", type: "string", title: "Metric", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", title: "Label", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "headline" },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Site Title", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", title: "Site Description", rows: 3 }),
    defineField({ name: "url", type: "url", title: "Site URL" }),
    defineField({ name: "ogImage", type: "image", title: "Default OG Image" }),
    defineField({
      name: "headerNav",
      title: "Header Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Link" }),
            defineField({ name: "external", type: "boolean", title: "External?" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerNav",
      title: "Footer Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Link" }),
            defineField({ name: "external", type: "boolean", title: "External?" }),
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              title: "Platform",
              options: { list: ["twitter", "linkedin", "github", "instagram"] },
            }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
