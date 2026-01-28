import fs from 'fs'
import path from 'path'
// @ts-ignore - sanity/cli might not have types exposed in this environment clearly or typical ts-node issue
import { getCliClient } from 'sanity/cli'

// --- Configuration ---

// We use getCliClient which automatically loads the config and user session/token
// from `npx sanity exec`. 
// Note: This requires running with `npx sanity exec scripts/seed-blogs.ts --with-user-token`

const client = getCliClient({ apiVersion: '2025-01-27' });

// --- Content Data ---

const AUTHOR_NAME = "Vantura Digital Team";
const BLOG_IMAGES: Record<string, string> = {
    seo: "C:/Users/sharn/.gemini/antigravity/brain/f01eec39-b133-4f38-a74a-093e134ba53c/blog_seo_header_1769606805495.png",
    performance: "C:/Users/sharn/.gemini/antigravity/brain/f01eec39-b133-4f38-a74a-093e134ba53c/blog_performance_header_1769606910843.png",
    design: "C:/Users/sharn/.gemini/antigravity/brain/f01eec39-b133-4f38-a74a-093e134ba53c/blog_design_roi_header_1769606995502.png",
    accessibility: "C:/Users/sharn/.gemini/antigravity/brain/f01eec39-b133-4f38-a74a-093e134ba53c/blog_accessibility_header_1769607149982.png"
};

const POSTS = [
    {
        title: "10 Basic SEO Tips to Boost Your Rankings in 2026",
        slug: "classic-seo-tips-2026",
        imageKey: "seo",
        category: "SEO",
        publishedAt: new Date().toISOString(),
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Search Engine Optimization (SEO) is constantly evolving. What worked five years ago might get you penalized today. In 2026, Google (and AI search engines) prioritize user experience, authority, and technical performance above all else. Here are 10 actionable tips to improve your site's visibility right now." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "1. Prioritize Core Web Vitals" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Google's Core Web Vitals are no longer just a tie-breaker; they are a fundamental ranking factor. Ensure your Interaction to Next Paint (INP) is under 200ms and your Largest Contentful Paint (LCP) is under 2.5 seconds. A fast site is a rankable site." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "2. Optimize for Intent, Not Just Keywords" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Keyword stuffing is dead. Focus on 'Search Intent'. If a user searches for 'best running shoes', do they want to buy, learn, or compare? Align your content with the user's goal." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "3. Master Internal Linking" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Internal links helping crawlers understand your site structure. Create 'Content Hubs' where a main pilllar page links to related sub-topics, establishing tropical authority." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "4. Use Structured Data (Schema Markup)" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Help search engines understand your content by implementing JSON-LD schema. This can win you 'Rich Snippets' like stars, recipe cards, or event listings directly in the search results." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "5. Accessibility is SEO" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Screen readers and search bots interpret sites similarly. Proper alt text, semantic HTML headers, and keyboard navigability signal a high-quality site to Google." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "6. E-E-A-T Matters More Than Ever" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Ensure your blog posts have author bylines, and your 'About' page clearly states your credentials." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "7. Optimize Images for Speed" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Giant PNGs kill load times. Convert all images to WebP or AVIF formats and ensure they are properly sized. Use the 'loading=\"lazy\"' attribute for below-the-fold images." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "8. Update Old Content" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Don't just write new posts; refresh old ones. Google loves fresh content. Update statistics, fix broken links, and improve readability on your existing library." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "9. Mobile-First Indexing is the Default" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Design for mobile first. If your site is hard to use on a phone, it won't rank, period. Check your tap targets and font sizes." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "10. Secure Your Site (HTTPS)" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "This is basic but critical. An SSL certificate is mandatory for trust and ranking. Security warnings will drive users away immediately." }]
            },
        ]
    },
    {
        title: "Website Performance Starter Kit: Speed = Revenue",
        slug: "website-performance-starter-kit",
        imageKey: "performance",
        category: "Performance",
        publishedAt: new Date().toISOString(),
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "In the digital economy, speed is currency. Use this starter kit to audit and improve your website's performance immediately." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "Why Speed Matters (The Data)" }] },
            {
                _type: 'block',
                style: 'bullet',
                children: [{ _type: 'span', text: "53% of mobile users leave a site that takes longer than 3 seconds to load." }]
            },
            {
                _type: 'block',
                style: 'bullet',
                children: [{ _type: 'span', text: "A 1-second delay reduces conversion rates by 7%." }]
            },
            {
                _type: 'block',
                style: 'bullet',
                children: [{ _type: 'span', text: "Walmart found that for every 1 second of improvement in load time, they experienced a 2% increase in conversion." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "The Starter Kit Checklist" }] },
            { _type: 'block', style: 'h4', children: [{ _type: 'span', text: "1. Audit Your Current State" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Use tools like Google PageSpeed Insights, GTmetrix, or WebPageTest to get a baseline score. Focus on the metric 'LCP' (Largest Contentful Paint) - aim for < 2.5s." }]
            },
            { _type: 'block', style: 'h4', children: [{ _type: 'span', text: "2. Image Optimization Strategy" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Images are often the heaviest part of a page. Adopt Next.js Image component (<Image />) which automatically serves WebP/AVIF and handles resizing." }]
            },
            { _type: 'block', style: 'h4', children: [{ _type: 'span', text: "3. Code Splitting & Lazy Loading" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Don't send all JavaScript at once. Use dynamic imports for heavy components that aren't immediately visible (like modals or maps)." }]
            },
            { _type: 'block', style: 'h4', children: [{ _type: 'span', text: "4. Font Optimization" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Self-host your fonts or use `next/font` to prevent layout shifts. Ensure you are using 'font-display: swap' to show text immediately." }]
            },
            { _type: 'block', style: 'h4', children: [{ _type: 'span', text: "5. Reduce Third-Party Scripts" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Audit your trackers. Do you need Facebook Pixel, LinkedIn Insight, Hotjar, AND Google Analytics all loading in the head? Defer them or use a Tag Manager to load them only when necessary." }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Performance isn't a one-time fix, it's a culture. Start with these 5 steps and your users (and revenue) will thank you." }]
            }
        ]
    },
    {
        title: "The Hidden ROI of Premium Web Design",
        slug: "design-roi-business-growth",
        imageKey: "design",
        category: "Design",
        publishedAt: new Date().toISOString(),
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Many businesses view web design as an expense rather than an investment. The data suggests otherwise. Premium design isn't just about looking good—it's about trust, credibility, and conversion." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "The 50 Millisecond Rule" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "It takes about 50 milliseconds (0.05 seconds) for users to form an opinion about your website that determines whether they'll stay or leave. First impressions are 94% design-related." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "Trust Signals and Credibility" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "A study by Stanford University found that 75% of users admit to making judgments about a company’s credibility based on their website’s design. If your site looks outdated, users assume your business is outdated." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "The Cost of \"Good Enough\"" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Templates and DIY builders have their place, but they often lack the nuance of a custom strategy. A custom design guides the user's eye to the Call to Action (CTA) using psychology, spacing, and typography, significantly boosting conversion rates." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "Differentiation in a Crowded Market" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "In 2026, every competitor has a website. A premium, unique digital experience makes your brand memorable. It shifts the conversation from price to value." }]
            }
        ]
    },
    {
        title: "Accessibility: The Future of Digital Trust",
        slug: "accessibility-digital-trust-2026",
        imageKey: "accessibility",
        category: "Strategy",
        publishedAt: new Date().toISOString(),
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Web Accessibility (a11y) is often treated as a compliance checklist. In reality, it is the ultimate expression of digital customer service and brand integrity." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "The Business Case for Inclusion" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Over 1 billion people roughly 15% of the world's population experience some form of disability. Ignoring accessibility means ignoring a massive market segment. Accessible sites often perform better for everyone, including those on mobile devices or slow connections." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "SEO and Accessibility share the same DNA" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Clear headings, descriptive alt text, and logical structure help screen readers. They also happen to be exactly what Google looks for." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "Protecting Your Brand" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Digital accessibility lawsuits are rising year over year. Ensuring your site features keyboard navigation, good color contrast, and ARIA labels isn't just ethical—it's legal self-defense." }]
            },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: "Conclusion" }] },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: "Building an accessible web is not a burden; it's an opportunity to demonstrate that your brand cares about every single user." }]
            }
        ]
    }
];

// --- Execution ---

async function seed() {
    console.log('🚀 Starting Blog Seeding...');

    // 1. Get/Create Author
    let authorId = null;
    const existingAuthor = await client.fetch('*[_type == "author"][0]._id');
    if (existingAuthor) {
        authorId = existingAuthor;
        console.log(`👤 Found existing author: ${authorId}`);
    } else {
        console.log(`👤 Creating new author...`);
        const newAuthor = await client.create({
            _type: 'author',
            name: AUTHOR_NAME,
            slug: { _type: 'slug', current: 'vantura-team' }
        });
        authorId = newAuthor._id;
    }

    // 2. Create Categories
    const categoryIds: Record<string, string> = {};
    const categoriesNeeded = ["SEO", "Performance", "Design", "Strategy"];

    for (const catName of categoriesNeeded) {
        const existingCat = await client.fetch('*[_type == "category" && title == $title][0]._id', { title: catName });
        if (existingCat) {
            categoryIds[catName] = existingCat;
        } else {
            console.log(`🏷️ Creating category: ${catName}`);
            const newCat = await client.create({
                _type: 'category',
                title: catName,
                slug: { _type: 'slug', current: catName.toLowerCase() }
            });
            categoryIds[catName] = newCat._id;
        }
    }

    // 3. Delete Old Posts (Optional: Uncomment to wipe slate clean)
    console.log('🗑️ Deleting existing posts...');
    await client.delete({ query: '*[_type == "post"]' });

    // 4. Create Posts
    for (const post of POSTS) {
        console.log(`📝 Creating post: ${post.title}`);

        // Upload Image
        let imageAssetId = null;
        if (post.imageKey && BLOG_IMAGES[post.imageKey]) {
            const imgPath = BLOG_IMAGES[post.imageKey];
            try {
                if (fs.existsSync(imgPath)) {
                    console.log(`   📸 Uploading image: ${imgPath}`);
                    const fileBuffer = fs.readFileSync(imgPath);
                    const asset = await client.assets.upload('image', fileBuffer, {
                        filename: path.basename(imgPath)
                    });
                    imageAssetId = asset._id;
                } else {
                    console.warn(`   ⚠️ Image not found at path: ${imgPath}`);
                }
            } catch (err) {
                console.error(`   ❌ Failed to upload image for ${post.title}:`, err);
            }
        }

        // Create Document
        await client.create({
            _type: 'post',
            title: post.title,
            slug: { _type: 'slug', current: post.slug },
            author: { _type: 'reference', _ref: authorId },
            categories: categoryIds[post.category] ? [{ _type: 'reference', _ref: categoryIds[post.category] }] : [],
            publishedAt: post.publishedAt,
            mainImage: imageAssetId ? {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAssetId },
                alt: post.title
            } : undefined,
            body: post.body
        });
    }

    console.log('✅ Blog seeding complete!');
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
});
