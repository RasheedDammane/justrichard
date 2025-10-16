import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📝 Creating blog posts for all service domains...');

  // Get or create admin user as author
  let admin = await prisma.user.findUnique({
    where: { email: 'admin@communityhub.com' },
  });

  if (!admin) {
    console.log('Creating admin user first...');
    const { hash } = await import('bcryptjs');
    const adminPassword = await hash('admin123', 12);
    admin = await prisma.user.create({
      data: {
        email: 'admin@communityhub.com',
        password: adminPassword,
        name: 'Admin User',
        role: 'ADMIN',
        phone: '+1234567890',
        emailVerified: new Date(),
      },
    });
  }

  const blogPosts = [
    // Real Estate
    {
      title: 'Top 10 Tips for Finding Your Dream Home in Dubai',
      slug: 'top-10-tips-finding-dream-home-dubai',
      excerpt: 'Discover expert advice on navigating the Dubai real estate market and finding your perfect property.',
      content: `
# Top 10 Tips for Finding Your Dream Home in Dubai

Dubai's real estate market offers incredible opportunities for both buyers and renters. Here are our top 10 tips to help you find your dream home:

## 1. Define Your Budget
Before starting your search, determine your budget including down payment, monthly payments, and additional costs like maintenance fees.

## 2. Choose the Right Location
Consider proximity to work, schools, shopping centers, and public transportation. Popular areas include Dubai Marina, Downtown Dubai, and Arabian Ranches.

## 3. Work with Certified Agents
Partner with RERA-certified real estate agents who understand the market and can guide you through the process.

## 4. Understand the Legal Process
Familiarize yourself with Dubai's property laws, registration procedures, and required documentation.

## 5. Inspect Properties Thoroughly
Always conduct thorough inspections and consider hiring professional inspectors for detailed assessments.

## 6. Research the Developer
Check the developer's track record, previous projects, and reputation in the market.

## 7. Consider Future Development
Research upcoming infrastructure projects and developments that might affect property values.

## 8. Negotiate Smartly
Don't hesitate to negotiate prices, payment plans, and terms with sellers or landlords.

## 9. Check Community Amenities
Evaluate facilities like gyms, pools, parks, and security systems in the community.

## 10. Plan for the Long Term
Consider your future needs and how the property fits into your long-term plans.

Ready to find your dream home? Connect with our certified real estate agents today!
      `,
      featuredImage: '/images/blog/dubai-real-estate.jpg',
      language: 'en',
      countryCode: 'AE',
      categories: ['Real Estate', 'Dubai', 'Property Tips'],
      tags: ['real estate', 'dubai', 'property', 'home buying', 'investment'],
      metaTitle: 'Top 10 Tips for Finding Your Dream Home in Dubai | CommunityHub',
      metaDescription: 'Expert tips for navigating Dubai real estate market. Find your perfect property with advice from certified agents.',
      keywords: ['dubai real estate', 'property buying', 'home search', 'dubai property'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Accounting
    {
      title: 'Essential Tax Planning Strategies for UAE Businesses in 2025',
      slug: 'essential-tax-planning-strategies-uae-businesses-2025',
      excerpt: 'Navigate the UAE tax landscape with expert accounting advice and maximize your business efficiency.',
      content: `
# Essential Tax Planning Strategies for UAE Businesses in 2025

With the introduction of corporate tax in the UAE, businesses need strategic planning to ensure compliance and optimize their tax position.

## Understanding UAE Corporate Tax

The UAE introduced a 9% corporate tax on business profits exceeding AED 375,000. Here's what you need to know:

### Key Points:
- **Tax Rate**: 9% on taxable income above AED 375,000
- **Effective Date**: Financial years starting on or after June 1, 2023
- **Small Business Relief**: 0% tax on profits up to AED 375,000

## Top Tax Planning Strategies

### 1. Maintain Accurate Records
Implement robust accounting systems to track all income and expenses accurately.

### 2. Optimize Business Structure
Review your business structure to ensure it's tax-efficient under the new regime.

### 3. Leverage Deductions
Identify all eligible deductions including:
- Business expenses
- Depreciation
- Employee costs
- R&D expenses

### 4. Plan Cash Flow
Ensure sufficient liquidity for tax payments while maintaining operational efficiency.

### 5. Stay Compliant
Keep up with regulatory changes and filing deadlines to avoid penalties.

## VAT Considerations

Don't forget about VAT obligations:
- Standard rate: 5%
- Registration threshold: AED 375,000
- Voluntary registration: AED 187,500

## Get Professional Help

Our certified accountants can help you:
- Prepare tax returns
- Optimize your tax position
- Ensure compliance
- Plan for the future

Contact our accounting experts today for a consultation!
      `,
      featuredImage: '/images/blog/uae-tax-planning.jpg',
      language: 'en',
      countryCode: 'AE',
      categories: ['Accounting', 'Tax', 'Business'],
      tags: ['tax planning', 'uae tax', 'corporate tax', 'accounting', 'business'],
      metaTitle: 'UAE Tax Planning Strategies 2025 | Expert Accounting Advice',
      metaDescription: 'Essential tax planning strategies for UAE businesses. Expert advice on corporate tax, VAT, and compliance.',
      keywords: ['uae tax', 'corporate tax', 'tax planning', 'accounting uae'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Translation Services
    {
      title: 'Why Professional Translation Matters for Your Global Business',
      slug: 'why-professional-translation-matters-global-business',
      excerpt: 'Discover how professional translation services can help your business succeed in international markets.',
      content: `
# Why Professional Translation Matters for Your Global Business

In today's interconnected world, professional translation is not just a nice-to-have—it's essential for business success.

## The Cost of Poor Translation

Bad translations can:
- Damage your brand reputation
- Lead to legal issues
- Cause misunderstandings
- Result in lost sales

### Real-World Examples

Many global brands have suffered from translation mistakes. Don't let your business be next!

## Benefits of Professional Translation

### 1. Cultural Accuracy
Professional translators understand cultural nuances and adapt content appropriately.

### 2. Industry Expertise
Specialized translators know industry-specific terminology in:
- Legal documents
- Medical records
- Technical manuals
- Marketing materials

### 3. Quality Assurance
Professional services include:
- Multiple review stages
- Native speaker verification
- Consistency checks
- Formatting preservation

### 4. Time Efficiency
Professional translators deliver:
- Faster turnaround times
- Consistent quality
- Reliable deadlines

## Types of Translation Services

### Document Translation
- Contracts
- Certificates
- Reports
- Presentations

### Website Localization
- Multilingual websites
- E-commerce platforms
- Mobile apps

### Interpretation
- Simultaneous interpretation
- Consecutive interpretation
- Business meetings

### Certified Translation
- Legal documents
- Official certificates
- Immigration papers

## Choosing the Right Translator

Look for:
- Native speakers
- Industry specialization
- Proven track record
- Quality certifications

## Languages We Cover

Our translators specialize in:
- Arabic ↔ English
- French ↔ English
- Spanish ↔ English
- German ↔ English
- And 15+ more languages!

Ready to expand globally? Contact our professional translators today!
      `,
      featuredImage: '/images/blog/professional-translation.jpg',
      language: 'en',
      categories: ['Translation', 'Business', 'Global'],
      tags: ['translation', 'localization', 'business', 'multilingual'],
      metaTitle: 'Professional Translation Services for Global Business | CommunityHub',
      metaDescription: 'Why professional translation matters for your business. Expert translators in 15+ languages.',
      keywords: ['professional translation', 'business translation', 'localization'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Visa Services
    {
      title: 'Complete Guide to UAE Visa Types and Application Process',
      slug: 'complete-guide-uae-visa-types-application-process',
      excerpt: 'Everything you need to know about UAE visas, from tourist visas to golden visas.',
      content: `
# Complete Guide to UAE Visa Types and Application Process

Navigating the UAE visa system can be complex. This comprehensive guide covers everything you need to know.

## Types of UAE Visas

### 1. Tourist Visa
- **Duration**: 30 or 90 days
- **Purpose**: Tourism, visiting family
- **Extension**: Possible for 30 days

### 2. Visit Visa
- **Duration**: 30 or 90 days
- **Purpose**: Business meetings, family visits
- **Sponsorship**: Required

### 3. Employment Visa
- **Duration**: 2 or 3 years
- **Purpose**: Work in UAE
- **Requirements**: Job offer, medical test, Emirates ID

### 4. Investor Visa
- **Duration**: Up to 10 years
- **Purpose**: Business investment
- **Requirements**: Minimum investment threshold

### 5. Golden Visa
- **Duration**: 5 or 10 years
- **Purpose**: Long-term residency
- **Eligibility**: Investors, entrepreneurs, specialists

### 6. Student Visa
- **Duration**: 1 year (renewable)
- **Purpose**: Study in UAE
- **Requirements**: University admission

## Application Process

### Step 1: Determine Visa Type
Identify the appropriate visa based on your purpose of visit.

### Step 2: Gather Documents
Common requirements:
- Valid passport (6 months validity)
- Passport-size photos
- Completed application form
- Supporting documents

### Step 3: Submit Application
- Through sponsor
- Via visa service
- Online portal

### Step 4: Medical Test
Required for residence visas:
- Blood test
- Chest X-ray
- General health check

### Step 5: Emirates ID
For residence visas:
- Biometric registration
- ID card issuance

## Processing Times

- Tourist Visa: 2-3 days
- Visit Visa: 3-5 days
- Employment Visa: 2-4 weeks
- Golden Visa: 4-6 weeks

## Common Mistakes to Avoid

1. Incomplete documentation
2. Expired passport
3. Incorrect visa type
4. Missing medical tests
5. Late renewals

## Visa Renewal

Start renewal process:
- 30 days before expiry
- Gather updated documents
- Complete medical tests
- Pay renewal fees

## Our Visa Services

We help with:
- Visa consultation
- Document preparation
- Application submission
- Status tracking
- Renewal assistance

Get expert help with your UAE visa application today!
      `,
      featuredImage: '/images/blog/uae-visa-guide.jpg',
      language: 'en',
      countryCode: 'AE',
      categories: ['Visa', 'Immigration', 'UAE'],
      tags: ['uae visa', 'immigration', 'golden visa', 'work visa'],
      metaTitle: 'Complete UAE Visa Guide 2025 | Types & Application Process',
      metaDescription: 'Comprehensive guide to UAE visas. Learn about tourist, work, golden visas and application process.',
      keywords: ['uae visa', 'dubai visa', 'golden visa', 'work visa uae'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Business Consulting
    {
      title: '10 Strategies to Scale Your Business in the Middle East',
      slug: '10-strategies-scale-business-middle-east',
      excerpt: 'Expert business consulting advice for growing your company in the MENA region.',
      content: `
# 10 Strategies to Scale Your Business in the Middle East

The Middle East offers tremendous opportunities for business growth. Here's how to capitalize on them.

## 1. Understand the Market

### Key Considerations:
- Cultural nuances
- Consumer behavior
- Regulatory environment
- Competition landscape

### Market Research
Invest in thorough market research to understand:
- Target demographics
- Buying patterns
- Price sensitivity
- Distribution channels

## 2. Build Local Partnerships

### Benefits:
- Market knowledge
- Network access
- Cultural insights
- Regulatory navigation

### Partnership Types:
- Joint ventures
- Distributors
- Agents
- Strategic alliances

## 3. Adapt Your Product/Service

### Localization:
- Language translation
- Cultural adaptation
- Pricing strategy
- Payment methods

### Compliance:
- Halal certification (if applicable)
- Local regulations
- Quality standards

## 4. Leverage Technology

### Digital Transformation:
- E-commerce platforms
- Mobile apps
- Cloud solutions
- AI and automation

### Online Presence:
- Localized website
- Social media marketing
- SEO optimization
- Digital advertising

## 5. Focus on Customer Experience

### Excellence in Service:
- Personalized approach
- Quick response times
- Quality assurance
- After-sales support

### Build Trust:
- Transparent communication
- Reliable delivery
- Consistent quality

## 6. Optimize Operations

### Efficiency Improvements:
- Process automation
- Supply chain optimization
- Cost management
- Quality control

### Scalability:
- Flexible infrastructure
- Modular systems
- Cloud-based solutions

## 7. Invest in Talent

### Recruitment:
- Local expertise
- International experience
- Cultural fit
- Skill diversity

### Development:
- Training programs
- Career progression
- Retention strategies

## 8. Financial Planning

### Key Areas:
- Cash flow management
- Investment strategy
- Risk mitigation
- Growth funding

### Funding Options:
- Bank loans
- Venture capital
- Angel investors
- Government grants

## 9. Marketing Strategy

### Channels:
- Digital marketing
- Traditional media
- Events and exhibitions
- Influencer partnerships

### Content:
- Localized messaging
- Cultural relevance
- Value proposition

## 10. Measure and Adapt

### KPIs to Track:
- Revenue growth
- Market share
- Customer acquisition cost
- Customer lifetime value
- Operational efficiency

### Continuous Improvement:
- Regular reviews
- Data analysis
- Strategy adjustment
- Innovation

## Get Expert Guidance

Our business consultants can help you:
- Develop growth strategies
- Enter new markets
- Optimize operations
- Scale successfully

Schedule a consultation with our experts today!
      `,
      featuredImage: '/images/blog/business-scaling-mena.jpg',
      language: 'en',
      categories: ['Business', 'Strategy', 'Growth'],
      tags: ['business consulting', 'scaling', 'middle east', 'growth strategy'],
      metaTitle: '10 Strategies to Scale Your Business in Middle East | Expert Consulting',
      metaDescription: 'Expert strategies for scaling your business in the MENA region. Professional consulting advice.',
      keywords: ['business scaling', 'middle east business', 'growth strategy'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Architecture
    {
      title: 'Modern Architecture Trends in Dubai: Sustainability Meets Innovation',
      slug: 'modern-architecture-trends-dubai-sustainability-innovation',
      excerpt: 'Explore the latest architectural trends shaping Dubai skyline with a focus on sustainable design.',
      content: `
# Modern Architecture Trends in Dubai: Sustainability Meets Innovation

Dubai continues to push the boundaries of architectural innovation while embracing sustainability.

## Sustainable Design Principles

### 1. Energy Efficiency
- Solar panels integration
- Smart building systems
- LED lighting
- Thermal insulation

### 2. Water Conservation
- Greywater recycling
- Low-flow fixtures
- Rainwater harvesting
- Drought-resistant landscaping

### 3. Green Building Materials
- Recycled materials
- Local sourcing
- Low VOC products
- Sustainable timber

## Trending Architectural Styles

### Biophilic Design
Connecting buildings with nature:
- Indoor gardens
- Natural lighting
- Living walls
- Water features

### Smart Buildings
Technology integration:
- IoT sensors
- Automated systems
- Energy management
- Security systems

### Modular Construction
Efficient building methods:
- Prefabricated components
- Faster construction
- Cost efficiency
- Quality control

## Iconic Dubai Projects

### Museum of the Future
- Innovative design
- Sustainable features
- Cultural landmark

### Sustainable City
- Zero-energy homes
- Green transportation
- Community focus

### Dubai Creek Tower
- Tallest structure
- Observation decks
- Sustainable design

## Residential Architecture Trends

### 1. Open Floor Plans
- Spacious living
- Natural light
- Flexible spaces

### 2. Indoor-Outdoor Living
- Large terraces
- Balcony gardens
- Seamless transitions

### 3. Smart Home Integration
- Voice control
- Automated lighting
- Climate control
- Security systems

## Commercial Architecture

### Office Spaces
- Collaborative areas
- Wellness focus
- Flexible layouts
- Technology integration

### Retail Design
- Experiential spaces
- Digital integration
- Sustainable materials

## Regulatory Framework

### Dubai Municipality Requirements:
- Green building regulations
- Safety standards
- Accessibility guidelines
- Energy efficiency codes

### Certifications:
- LEED certification
- Estidama Pearl Rating
- BREEAM

## Working with Architects

### Selection Criteria:
- Portfolio review
- Experience in UAE
- Sustainability focus
- Budget alignment

### Project Phases:
1. Concept design
2. Detailed design
3. Construction documents
4. Site supervision

## Future of Architecture in Dubai

### Emerging Trends:
- 3D-printed buildings
- Vertical forests
- Net-zero buildings
- Adaptive reuse

### Innovation Areas:
- AI in design
- VR visualization
- Sustainable materials
- Smart cities

Ready to bring your architectural vision to life? Connect with our certified architects!
      `,
      featuredImage: '/images/blog/dubai-architecture-trends.jpg',
      language: 'en',
      countryCode: 'AE',
      categories: ['Architecture', 'Design', 'Sustainability'],
      tags: ['architecture', 'dubai', 'sustainable design', 'innovation'],
      metaTitle: 'Modern Architecture Trends in Dubai | Sustainable Design',
      metaDescription: 'Latest architectural trends in Dubai. Sustainable design meets innovation. Expert architects.',
      keywords: ['dubai architecture', 'sustainable design', 'modern architecture'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Photography
    {
      title: 'Professional Photography Tips for Real Estate and Events',
      slug: 'professional-photography-tips-real-estate-events',
      excerpt: 'Master the art of professional photography with expert tips for real estate and event coverage.',
      content: `
# Professional Photography Tips for Real Estate and Events

Elevate your photography skills with professional techniques for real estate and event photography.

## Real Estate Photography

### Equipment Essentials

#### Camera:
- Full-frame DSLR or mirrorless
- Wide-angle lens (16-35mm)
- Tripod
- External flash

#### Additional Gear:
- Drone for aerial shots
- HDR software
- Editing tools

### Shooting Techniques

#### 1. Lighting
- Natural light preference
- Golden hour shooting
- Fill flash for shadows
- HDR for balanced exposure

#### 2. Composition
- Rule of thirds
- Leading lines
- Symmetry
- Vertical lines straight

#### 3. Room Preparation
- Declutter spaces
- Stage furniture
- Open curtains
- Turn on all lights

### Post-Processing

#### Essential Edits:
- Straighten verticals
- Adjust exposure
- Enhance colors
- Remove distractions

#### HDR Processing:
- Merge exposures
- Tone mapping
- Natural look
- Avoid over-processing

## Event Photography

### Pre-Event Planning

#### 1. Client Consultation
- Understand expectations
- Create shot list
- Discuss timeline
- Scout venue

#### 2. Equipment Check
- Backup camera
- Multiple lenses
- Extra batteries
- Memory cards

### During the Event

#### Coverage Strategy:
- Candid moments
- Key moments
- Details shots
- Group photos

#### Technical Settings:
- Fast shutter speed
- Wide aperture
- High ISO if needed
- Continuous shooting mode

### Types of Events

#### Weddings:
- Ceremony coverage
- Reception moments
- Family portraits
- Detail shots

#### Corporate Events:
- Speakers and presentations
- Networking moments
- Branding elements
- Venue details

#### Social Events:
- Candid interactions
- Decor and ambiance
- Food and beverages
- Entertainment

## Portrait Photography

### Lighting Techniques

#### Natural Light:
- Window light
- Outdoor shade
- Golden hour
- Reflectors

#### Studio Lighting:
- Key light
- Fill light
- Rim light
- Background light

### Posing Tips

#### Individuals:
- Relaxed posture
- Natural expressions
- Eye contact
- Flattering angles

#### Groups:
- Varied heights
- Tight composition
- Everyone visible
- Natural interactions

## Product Photography

### Setup:
- Clean background
- Proper lighting
- Multiple angles
- Detail shots

### Styling:
- Product placement
- Props selection
- Color coordination
- Brand consistency

## Business Photography

### Headshots:
- Professional look
- Consistent lighting
- Clean background
- Natural expression

### Team Photos:
- Coordinated attire
- Consistent style
- Brand alignment

## Editing Workflow

### Organization:
- File naming
- Folder structure
- Backup system
- Selection process

### Processing:
- Color correction
- Exposure adjustment
- Retouching
- Export settings

## Delivering Results

### Formats:
- High-resolution files
- Web-optimized versions
- Print-ready files
- Social media sizes

### Presentation:
- Online gallery
- USB delivery
- Cloud storage
- Print options

## Building Your Portfolio

### Showcase:
- Best work
- Variety
- Consistent style
- Professional presentation

### Marketing:
- Website
- Social media
- Networking
- Client testimonials

Ready to capture your special moments? Book our professional photographers today!
      `,
      featuredImage: '/images/blog/professional-photography-tips.jpg',
      language: 'en',
      categories: ['Photography', 'Real Estate', 'Events'],
      tags: ['photography', 'real estate photography', 'event photography', 'professional'],
      metaTitle: 'Professional Photography Tips | Real Estate & Events',
      metaDescription: 'Expert photography tips for real estate and events. Professional techniques and equipment guide.',
      keywords: ['professional photography', 'real estate photography', 'event photography'],
      status: 'published',
      publishedAt: new Date(),
    },

    // Coaching
    {
      title: 'Transform Your Life: The Power of Professional Coaching',
      slug: 'transform-your-life-power-professional-coaching',
      excerpt: 'Discover how professional coaching can help you achieve your personal and professional goals.',
      content: `
# Transform Your Life: The Power of Professional Coaching

Professional coaching is a powerful tool for personal and professional development. Here's how it can transform your life.

## What is Professional Coaching?

### Definition:
A collaborative partnership between coach and client focused on:
- Goal achievement
- Personal growth
- Performance improvement
- Life transformation

### Types of Coaching:

#### 1. Life Coaching
- Personal development
- Work-life balance
- Relationship improvement
- Lifestyle changes

#### 2. Career Coaching
- Career transitions
- Job search strategies
- Professional development
- Leadership skills

#### 3. Executive Coaching
- Leadership development
- Strategic thinking
- Team management
- Performance optimization

#### 4. Health & Wellness Coaching
- Fitness goals
- Nutrition planning
- Stress management
- Healthy habits

#### 5. Business Coaching
- Entrepreneurship
- Business growth
- Strategy development
- Performance improvement

## Benefits of Coaching

### Personal Benefits:
- Increased self-awareness
- Better decision-making
- Improved confidence
- Enhanced relationships
- Work-life balance

### Professional Benefits:
- Career advancement
- Leadership skills
- Better communication
- Increased productivity
- Goal achievement

## The Coaching Process

### 1. Initial Assessment
- Current situation analysis
- Goal identification
- Challenges assessment
- Success metrics

### 2. Goal Setting
- SMART goals
- Action plans
- Timeline creation
- Milestone definition

### 3. Regular Sessions
- Progress review
- Strategy adjustment
- Accountability
- Skill development

### 4. Ongoing Support
- Between-session tasks
- Resource provision
- Continuous feedback
- Motivation

## Coaching Methodologies

### GROW Model:
- **G**oal: What do you want?
- **R**eality: Where are you now?
- **O**ptions: What could you do?
- **W**ill: What will you do?

### Solution-Focused Approach:
- Future orientation
- Strength-based
- Action-oriented
- Quick results

### Cognitive Behavioral Coaching:
- Thought patterns
- Behavior change
- Emotional regulation
- Practical strategies

## Finding the Right Coach

### Qualifications to Look For:
- Certified credentials (ICF, EMCC)
- Relevant experience
- Specialization match
- Proven track record

### Chemistry Matters:
- Trust and rapport
- Communication style
- Shared values
- Mutual respect

## Success Stories

### Career Transformation:
"My coach helped me transition from corporate to entrepreneurship successfully."

### Work-Life Balance:
"I learned to prioritize and now have time for what matters most."

### Leadership Development:
"Coaching transformed my leadership style and team performance."

## Coaching vs. Other Services

### Coaching vs. Therapy:
- Future-focused vs. past-focused
- Action-oriented vs. healing-oriented
- Performance vs. treatment

### Coaching vs. Consulting:
- Questions vs. answers
- Client-driven vs. expert-driven
- Process vs. solutions

### Coaching vs. Mentoring:
- Professional vs. personal
- Structured vs. informal
- Time-limited vs. ongoing

## Investment in Yourself

### ROI of Coaching:
- Career advancement
- Income increase
- Better relationships
- Improved health
- Life satisfaction

### Commitment Required:
- Time investment
- Openness to change
- Active participation
- Homework completion

## Getting Started

### Steps to Begin:
1. Identify your goals
2. Research coaches
3. Schedule consultations
4. Choose your coach
5. Commit to the process

### What to Expect:
- Initial assessment session
- Regular coaching sessions (weekly/bi-weekly)
- Between-session work
- Progress reviews
- Ongoing support

## Coaching Specializations

### Available Coaches:
- Life coaches
- Career coaches
- Executive coaches
- Health coaches
- Relationship coaches
- Business coaches
- Financial coaches
- Mindfulness coaches

Ready to transform your life? Connect with our certified coaches today!
      `,
      featuredImage: '/images/blog/professional-coaching.jpg',
      language: 'en',
      categories: ['Coaching', 'Personal Development', 'Career'],
      tags: ['coaching', 'life coaching', 'career development', 'personal growth'],
      metaTitle: 'Transform Your Life with Professional Coaching | Expert Coaches',
      metaDescription: 'Discover the power of professional coaching. Achieve your personal and professional goals with certified coaches.',
      keywords: ['professional coaching', 'life coaching', 'career coaching', 'personal development'],
      status: 'published',
      publishedAt: new Date(),
    },
  ];

  // Create blog posts
  for (const post of blogPosts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: {
        ...post,
        authorId: admin.id,
      },
    });
    console.log(`✅ Created blog post: ${created.title}`);
  }

  console.log(`\n🎉 Successfully created ${blogPosts.length} blog posts!`);
  console.log('\n📝 Blog posts created for:');
  console.log('  • Real Estate');
  console.log('  • Accounting & Tax');
  console.log('  • Translation Services');
  console.log('  • Visa Services');
  console.log('  • Business Consulting');
  console.log('  • Architecture');
  console.log('  • Photography');
  console.log('  • Coaching');
}

main()
  .catch((e) => {
    console.error('❌ Error creating blog posts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
