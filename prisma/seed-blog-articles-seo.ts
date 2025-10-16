#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to create slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Blog articles for each category with full SEO
const BLOG_ARTICLES = [
  {
    title: "The Ultimate Guide to Home Improvement in 2025",
    slug: "ultimate-guide-home-improvement-2025",
    category: "home-improvement",
    excerpt: "Discover the latest trends, tips, and best practices for transforming your home with professional renovation and improvement services.",
    content: `
# The Ultimate Guide to Home Improvement in 2025

Home improvement has evolved significantly over the years, and 2025 brings exciting new trends, technologies, and opportunities for homeowners looking to enhance their living spaces. Whether you're planning a complete renovation or small updates, this comprehensive guide will help you navigate the world of home improvement.

## Why Home Improvement Matters

Investing in your home isn't just about aesthetics—it's about creating a space that reflects your lifestyle, increases property value, and enhances your daily comfort. Professional home improvement services can transform your house into your dream home.

## Top Home Improvement Trends for 2025

### 1. Sustainable and Eco-Friendly Renovations
More homeowners are choosing environmentally conscious materials and energy-efficient solutions. Solar panels, smart home automation, and sustainable building materials are leading the way.

### 2. Open-Concept Living Spaces
Breaking down walls to create flowing, multi-functional spaces continues to be popular. Professional renovation contractors can help design the perfect layout.

### 3. Smart Home Integration
From automated lighting to intelligent climate control, integrating smart technology is no longer optional—it's expected in modern homes.

### 4. Outdoor Living Spaces
Creating beautiful outdoor areas, including swimming pools, outdoor kitchens, and landscaped gardens, extends your living space and adds significant value.

## Essential Home Improvement Services

### Interior Design
Professional interior designers bring your vision to life, combining aesthetics with functionality. They help select colors, furniture, lighting, and accessories that create cohesive, beautiful spaces.

### Renovation Contractors
Licensed renovation contractors handle everything from minor updates to major remodels. They coordinate all trades, manage timelines, and ensure quality workmanship.

### Custom Carpentry
Custom furniture and built-in solutions maximize space and add unique character to your home. Skilled carpenters create pieces perfectly suited to your needs.

### Kitchen Cabinet Installation
The kitchen is the heart of the home. Professional cabinet installation ensures both beauty and functionality in this crucial space.

## Planning Your Home Improvement Project

### 1. Set Clear Goals
Define what you want to achieve. Are you renovating for comfort, resale value, or both?

### 2. Establish a Budget
Professional services provide transparent pricing. Plan for 10-20% contingency for unexpected issues.

### 3. Choose the Right Professionals
Research contractors, read reviews, and verify licenses. Quality professionals make all the difference.

### 4. Timeline Planning
Understand realistic timelines. Rush jobs often compromise quality.

## ROI: Which Improvements Pay Off?

- **Kitchen Remodels**: 60-80% ROI
- **Bathroom Updates**: 50-70% ROI
- **Energy Efficiency**: Immediate savings + increased value
- **Curb Appeal**: 75-100% ROI

## Working with Professionals

Professional home improvement services offer:
- **Expertise**: Years of experience and specialized skills
- **Efficiency**: Projects completed faster and better
- **Quality**: Superior results that last
- **Safety**: Proper handling of complex tasks
- **Warranty**: Protection for your investment

## Conclusion

Home improvement is an exciting journey that enhances your lifestyle and property value. Whether you need interior design, renovation, custom carpentry, or complete home transformation, professional services ensure your vision becomes reality.

Ready to start your home improvement project? Browse our verified professionals and get started today!
    `,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    tags: ["home improvement", "renovation", "interior design", "remodeling"],
    seoTitle: "Complete Home Improvement Guide 2025 | Expert Tips & Trends",
    seoDescription: "Comprehensive guide to home improvement in 2025. Learn about renovation trends, ROI, professional services, and how to transform your home with expert contractors.",
    seoKeywords: ["home improvement", "renovation", "interior design", "remodeling", "home renovation contractor", "kitchen remodel", "bathroom remodel"]
  },
  {
    title: "Essential Home Maintenance: Keep Your Home in Perfect Condition",
    slug: "essential-home-maintenance-guide",
    category: "home-maintenance",
    excerpt: "Learn how regular maintenance protects your investment and prevents costly repairs. Expert tips for plumbing, electrical, HVAC, and more.",
    content: `
# Essential Home Maintenance: Keep Your Home in Perfect Condition

Regular home maintenance is the key to preserving your home's value, preventing expensive repairs, and ensuring your family's comfort and safety. This comprehensive guide covers everything you need to know about professional home maintenance services.

## Why Regular Maintenance Matters

Preventive maintenance saves money in the long run. A small leak caught early costs hundreds; ignored, it can cost thousands. Professional maintenance services identify issues before they become problems.

## Critical Maintenance Areas

### Plumbing Systems
- Regular inspections prevent water damage
- Professional plumbers detect hidden leaks
- Annual water heater maintenance extends lifespan
- Drain cleaning prevents blockages

### Electrical Systems
- Safety inspections identify hazards
- Licensed electricians ensure code compliance
- Preventive checks avoid power issues
- Surge protection installation

### HVAC Systems
- Bi-annual servicing maintains efficiency
- Filter changes improve air quality
- Professional aircon servicing reduces energy costs
- Timely repairs prevent complete breakdowns

### Pest Control
- Regular treatments prevent infestations
- Professional pest control protects health
- Eco-friendly solutions available
- Year-round protection plans

## Seasonal Maintenance Checklist

### Spring
- HVAC system inspection
- Gutter cleaning
- Exterior painting touch-ups
- Pest prevention treatments

### Summer
- Air conditioning servicing
- Roof inspection
- Landscape maintenance
- Swimming pool maintenance

### Fall
- Heating system check
- Window and door sealing
- Chimney cleaning
- Weatherproofing

### Winter
- Pipe insulation
- Emergency heating repairs
- Ice dam prevention
- Interior maintenance focus

## Professional vs DIY Maintenance

While some tasks are DIY-friendly, many require professional expertise:

**Call Professionals For:**
- Electrical work (safety hazard)
- Plumbing repairs (water damage risk)
- HVAC servicing (complex systems)
- Pest control (chemical handling)
- Roof work (fall risk)

**Safe for DIY:**
- Filter changes
- Basic cleaning
- Minor painting
- Landscaping

## Cost of Maintenance vs Repairs

**Preventive Maintenance:**
- Annual cost: $500-1,500
- Prevents major issues
- Extends equipment life
- Maintains home value

**Emergency Repairs:**
- Single repair: $1,000-10,000+
- Causes property damage
- Shortens equipment life
- Reduces home value

## Finding Reliable Maintenance Professionals

Look for:
- Licensed and insured professionals
- Positive customer reviews
- Clear pricing and contracts
- Emergency availability
- Warranty on work performed

## Smart Home Maintenance Technology

Modern technology helps homeowners:
- Smart leak detectors alert to water issues
- WiFi thermostats optimize HVAC
- Security systems monitor property
- Automated maintenance reminders

## Conclusion

Regular professional maintenance is an investment that pays dividends through lower repair costs, extended equipment life, improved efficiency, and maintained property value. Don't wait for problems—schedule regular maintenance today!
    `,
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    tags: ["home maintenance", "plumbing", "electrical", "HVAC", "pest control"],
    seoTitle: "Home Maintenance Guide 2025 | Essential Tips & Professional Services",
    seoDescription: "Complete home maintenance guide covering plumbing, electrical, HVAC, and pest control. Learn how regular maintenance saves money and protects your investment.",
    seoKeywords: ["home maintenance", "plumbing services", "electrical repair", "HVAC maintenance", "pest control", "preventive maintenance", "home repair"]
  },
  {
    title: "Professional Cleaning Services: Transform Your Space",
    slug: "professional-cleaning-services-guide",
    category: "cleaning-and-disinfection",
    excerpt: "Discover the benefits of professional cleaning and disinfection services for a healthier, spotless home or office environment.",
    content: `
# Professional Cleaning Services: Transform Your Space

A clean environment isn't just about appearances—it's essential for health, productivity, and peace of mind. Professional cleaning services offer expertise, efficiency, and results that go beyond regular cleaning.

## Why Choose Professional Cleaning?

### Health Benefits
- Eliminates allergens and dust
- Removes bacteria and viruses
- Improves indoor air quality
- Reduces illness and allergies

### Time Savings
- Reclaim hours each week
- Focus on what matters
- Regular schedule maintenance
- No equipment shopping needed

### Superior Results
- Professional-grade products
- Expert techniques
- Attention to detail
- Consistent quality

## Types of Professional Cleaning Services

### Regular Home Cleaning
- Weekly or bi-weekly service
- Maintains cleanliness
- Customized cleaning plans
- Flexible scheduling

### Deep Cleaning
- Thorough top-to-bottom clean
- Reaches neglected areas
- Perfect for seasonal refresh
- Recommended quarterly

### Post-Renovation Cleaning
- Removes construction dust
- Cleans all surfaces
- Window and floor detailing
- Makes space move-in ready

### Move In/Out Cleaning
- Complete property cleaning
- Deposit recovery assistance
- New home preparation
- Time-saving solution

### Disinfection Services
- Medical-grade sanitization
- Virus and bacteria elimination
- Safe for families and pets
- Essential for health protection

### Specialized Services
- Carpet deep cleaning
- Sofa and mattress cleaning
- Curtain cleaning
- Post-event cleanup

## What Professional Cleaners Do

### Standard Service Includes:
- Dusting all surfaces
- Vacuuming and mopping
- Bathroom sanitization
- Kitchen deep cleaning
- Window cleaning
- Trash removal
- Surface disinfection

### Premium Services:
- Inside appliances
- Baseboards and trim
- Light fixtures
- Detailed organization
- Upholstery cleaning

## Eco-Friendly Cleaning

Modern professional services offer:
- Non-toxic products
- Biodegradable solutions
- Safe for children and pets
- Environmentally responsible
- Effective and powerful

## Commercial Cleaning Services

### Office Cleaning
- Daily or weekly service
- After-hours availability
- Customized schedules
- Professional appearance

### Retail Cleaning
- High-traffic area focus
- Flexible timing
- Consistent results
- Brand image maintenance

## Choosing the Right Cleaning Service

Consider:
- Reputation and reviews
- Insurance and bonding
- Cleaning products used
- Service customization
- Pricing transparency
- Staff training and vetting

## Cleaning Service Pricing

Factors affecting cost:
- Property size
- Service frequency
- Cleaning type (regular vs deep)
- Additional services
- Location

Average Costs:
- Regular cleaning: $100-300
- Deep cleaning: $200-500
- Post-renovation: $300-800
- Disinfection: $150-400

## Preparing for Professional Cleaners

- Declutter surfaces
- Secure valuables
- Identify priority areas
- Communicate special needs
- Provide access information

## Maintaining Cleanliness Between Services

- Daily quick tidying
- Immediate spill cleanup
- Regular decluttering
- Ventilation maintenance
- Minor cleaning tasks

## COVID-19 and Enhanced Cleaning

Post-pandemic considerations:
- Enhanced disinfection protocols
- High-touch surface focus
- Hospital-grade products
- Safety-first approach

## Conclusion

Professional cleaning services provide health benefits, time savings, and superior results. Whether for home or office, regular professional cleaning is an investment in health, comfort, and quality of life.

Book your professional cleaning service today and experience the difference!
    `,
    imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200&q=80",
    tags: ["cleaning services", "disinfection", "home cleaning", "office cleaning"],
    seoTitle: "Professional Cleaning Services 2025 | Home & Office Cleaning Guide",
    seoDescription: "Complete guide to professional cleaning and disinfection services. Learn about different cleaning types, benefits, costs, and how to choose the best service.",
    seoKeywords: ["professional cleaning", "cleaning services", "disinfection services", "home cleaning", "office cleaning", "deep cleaning", "eco-friendly cleaning"]
  }
];

async function main() {
  console.log('📝 Creating SEO-optimized blog articles for each category...\n');

  // Get or create a system user for blog posts
  let systemUser = await prisma.user.findFirst({
    where: { email: 'system@communityhub.com' }
  });

  if (!systemUser) {
    systemUser = await prisma.user.create({
      data: {
        email: 'system@communityhub.com',
        name: 'CommunityHub Editorial',
        password: 'hashed-password-placeholder', // Not used for login
        role: 'ADMIN'
      }
    });
  }

  let articleCount = 0;

  for (const article of BLOG_ARTICLES) {
    try {
      const blogPost = await prisma.blogPost.upsert({
        where: { slug: article.slug },
        update: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          featuredImage: article.imageUrl,
          status: 'published',
          publishedAt: new Date(),
          metaTitle: article.seoTitle,
          metaDescription: article.seoDescription,
          keywords: article.seoKeywords,
          categories: [article.category],
          tags: article.tags,
        },
        create: {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          featuredImage: article.imageUrl,
          authorId: systemUser.id,
          language: 'en',
          countryCode: 'TH',
          status: 'published',
          publishedAt: new Date(),
          metaTitle: article.seoTitle,
          metaDescription: article.seoDescription,
          keywords: article.seoKeywords,
          categories: [article.category],
          tags: article.tags,
        },
      });

      articleCount++;
      console.log(`   ✅ "${article.title}"`);
      console.log(`      Category: ${article.category}`);
      console.log(`      Tags: ${article.tags.join(', ')}`);
      console.log(`      SEO: ${article.seoTitle}`);
      console.log('');

    } catch (e: any) {
      console.log(`   ❌ Failed to create "${article.title}": ${e.message}`);
    }
  }

  const finalCounts = {
    blogPosts: await prisma.blogPost.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ BLOG ARTICLES SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  📝 ${finalCounts.blogPosts} Blog Posts
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Articles created: ${articleCount}

🌐 Test URLs:
  http://localhost:3000/en/blog
  http://localhost:3000/en/blog/${BLOG_ARTICLES[0].slug}

🎉 All SEO-optimized blog articles created!
  `);
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
