// projectsData.js — 21 entries: 8 case studies, 8 AI & analytics, 5 hardware.
// RULE: only facts supplied by the owner appear here. `placeholder: true` entries are
// clearly labelled stubs — replace them with real content/assets. No fabricated links/metrics.

export const categories = [
  { id: "case-studies", name: "Case Studies", accent: "#A76D5E", icon: "folder",
    description: "Product thinking, user research, strategy, experimentation and growth." },
  { id: "ai-analytics", name: "AI & Analytics", accent: "#C4A071", icon: "layers",
    description: "Data-driven problem solving, predictive modelling, machine learning and business intelligence." },
  { id: "hardware-electrical", name: "Hardware & Electrical", accent: "#98A086", icon: "cpu",
    description: "Embedded systems, circuit design, digital systems and engineering experiments." },
];

const TODO = "Add details here.";
// Schema: contentType: "case_study" | "link" | "pdf"
// sections: [{ heading, body }]  (any number, any order; headings e.g. Research, Analysis, Strategy, Implementation, Results, Learnings)
// images/videos: [{ src, alt }]  links: [{ label, url }]  documents: [{ label, url }]  (pdf preview uses documents[0].url)
const ph = (id, category, n, type = "case_study") => ({
  id, category, placeholder: true, contentType: type,
  title: `Placeholder Project ${n}`,
  summary: "Editable placeholder — replace with a real project.",
  description: TODO, tags: ["Placeholder"], tools: [], role: "", duration: "",
  metrics: [], problem: "", sections: [], images: [], videos: [], links: [], documents: [],
});

export const projects = [
  // ───────── CASE STUDIES (8) ─────────
  {
    id: "country-delight", category: "case-studies", contentType: "case_study",
    title: "Country Delight — Product Management Internship",
    summary: "Focused on activating users from the store to the cart.",
    coverImage: "/projects/CD/cover.png",
    description: "Country Delight is a tech-driven, farm-to-doorstep (D2C) brand that delivers milk and food essentials through an integrated supply chain.",
    tags: ["Product Management", "UI/UX design", "Paid Internship"],
    tools: ["MoEngage", "PRD", "15-day sprints", "Funnel Analysis"],
    role: "Product Management Intern", duration: "May–Jul 2026",
    metrics: [
      { label: "App opens", value: "119K+" },
      { label: "Drop-off", value: "98.5%" },
      { label: "User interviews", value: "50+" },
    ],
    problem: "Country Delight is known as a milk subscription app, and it wanted users to adopt Instant Delivery (groceries and other categories) as well. The 7-day funnel for new users showed a very steep drop.About 98.5% of installs never placed an Instant Delivery order.The biggest leak was early: 76% never reached a product listing page. The existing fix was a ₹99 cashback, but it only paid out after a completed purchase. That made it expensive and did nothing for the users who never started a cart.",
    sections:
[
  {
    heading: "Research",
    body: `
### Understanding the Drop-off

The research combined **SQL-based funnel analysis** with **phone interviews and in-person observation** to understand not just where users dropped off, but why.

**Quantitative — Funnel Analysis**

Five stages were examined, each with a corresponding hypothesis:

| Stage | Hypothesis |
|---|---|
| Entry | Lack of motivation to enter the app |
| Browsing | Difficulty discovering products |
| Add to Cart | Hesitation to initiate a cart |
| Cart | Additional charges discouraging purchases |
| Checkout | Payment friction |

**Qualitative — Four User Cohorts**

Interviews and observations covered milk-only buyers, low cross-sell users, high-variety/low-depth users (spending above ₹2,000), and loyal autopay subscribers.

**What I Observed**

In-person observation of the low cross-sell cohort revealed five recurring friction points:

- Users bypassed navigation and treated the app primarily as a milk subscription tool.
- Products lacked visibility, while listing pages offered little to encourage exploration.
- Most users were unaware of the Instant Delivery feature.

**Five Insights That Shaped the Solution**

1. **One-time setup, limited engagement:** Users set up their subscriptions but rarely developed broader shopping habits.
2. **Awareness gap:** The wider catalogue and delivery options were under-discovered.
3. **Trust doesn't transfer:** Confidence in milk subscriptions did not automatically extend to other categories.
4. **Category-specific price sensitivity:** Willingness to spend varied across product categories.
5. **Split-household blind spot:** The app user was not necessarily the household purchase decision-maker.
`
  },

  {
    heading: "Strategy",
    body: `
### The ₹9 Store Credit Concept

**Shop for ₹199 and unlock one item at just ₹9.**

The proposed experience combined a threshold-based shopping incentive with a curated popup of everyday essentials.

Rather than offering a flat cashback reward, the mechanic encouraged users to **start a cart, add more products, and reach a defined spending threshold**.

The experience used progressive rewards as the basket approached the threshold, making the next purchase action more tangible.

**The product logic**

- **Activation:** Give users a reason to start adding products.
- **Basket growth:** Use the ₹199 threshold to encourage additional purchases.
- **Discovery:** Introduce relevant essentials through a curated popup.
- **Incentive:** Offer a ₹9 unlock as the reward for meeting the threshold.
`
  },

  {
    heading: "Implementation",
    body: `
### Turning the Concept into a Product

**01 — Prototype & Iterate**

Developed **five iterations** of the proposed experience, culminating in a wireframe set and an interactive HTML prototype built independently.

The prototype demonstrated the popup/drawer interaction, time-limit logic, locked and unlocked states, and a review-cart step. The design team refined the experience further.

**02 — Documentation & Handoff**

Prepared the core product documentation for engineering:

- **PRD:** Feature requirements and user experience.
- **Technical specifications:** Functional logic and implementation details.
- **MoEngage tracking plan:** Events required to measure user behaviour.

**03 — Cross-functional Execution**

Worked through **15-day sprints**, design discussions and engineering grooming sessions to align the proposed experience with implementation requirements.

**04 — Experiment Design**

Designed a **tenure-based A/B testing framework**, defining cohort splits, control and treatment groups, and success criteria.

**05 — Measurement & Decisions**

The measurement framework covered four dimensions:

| Dimension | Metrics |
|---|---|
| Activation | First add-to-cart rate, funnel conversion |
| Commercial | AOV, basket size, activation cost, gross margin |
| Retention & Risk | Repeat rate, misuse |
| Business Viability | ROI against the ₹99 cashback baseline |

**Four possible outcomes**

**Scale** if the experiment meets success criteria.  
**Test** alternative price points such as ₹19 or ₹29.  
**Pivot** if the results point towards a different opportunity.  
**Sunset** if the intervention does not demonstrate sufficient value.

---

### Beyond the Core Feature — Curated Add-on Discovery

Alongside the primary initiative, I explored a separate concept to improve discovery and encourage broader baskets.

The proposed experience brought together a **calendar-style drawer of add-ons for the next day's delivery**, a personalised *Recommended for You* strip, and a catalogue-led GTM approach.

**What happened?**

The initiative was put on hold after the analytics team launched a similar solution that showed no measurable impact.

**My takeaway:** Better visibility does not automatically translate into incremental purchases. Discovery initiatives need to demonstrate measurable behavioural and commercial impact.
`
  }
],
    images: [
  {
    src: "/projects/CD/prototype.png",
    alt: "Interactive Store and Cart Activation prototype"
  },
  {
    src: "/projects/CD/final_design.png",
    alt: "Final design"
  }], videos: [], links: [], documents: [],
  },
  {
    id: "google-maps-india", category: "case-studies", contentType: "case_study",
    title: "Google Maps India",
    summary: "Comfort-aware routing and Choice on Missed Turn.",
    coverImage: "/projects/maps/cover.jpeg",
    description: "Product case study proposing comfort-aware routing and a Choice on Missed Turn feature for Google Maps in India.",
    tags: ["Independent Product Case Study", "Product Improvement"], tools: [], role: "", duration: "",
    metrics: [], sections: [
    {
      heading: "Problem",
      body: `
Google Maps optimizes mainly for the **fastest route**, even when that means narrow lanes, tight roads or less practical paths. This is especially true on Indian roads.

Drivers who value **comfort and safety** have no easy way to express that.

### Two friction points

1. **Speed over comfort:** routes ignore road width, comfort and safety.
2. **Silent rerouting:** after a missed turn, Maps reroutes immediately and gives the user **no choice** between the original route and the new one. By the time they notice, the route has already changed.

`
    }
  ],
    pdf: "/projects/maps/google_maps.pdf",
    videos: [], links: [], documents: [],
  },
  {
    id: "apple-tv-plus", category: "case-studies", contentType: "case_study",
    title: "Apple TV+ — Funnel Teardown",
    summary: "Five-stage funnel analysis, first-play friction and personalized onboarding.",
    coverImage: "/projects/apple/cover.png",
    description: "Product teardown of the Apple TV+ user journey with a five-stage funnel analysis.",
    tags: ["Product Teardown", "Funnel Analysis", "Onboarding"], tools: [], role: "", duration: "",
    metrics: [],
    pdf: "/projects/apple/apple_teardown.pdf",
    images: [], videos: [], links: [], documents: [],
  },
  {
  id: "ai-workforce-exposure-reskilling",
  title: "AI Workforce Exposure & Reskilling Investment Strategy",
  category: "case-studies",
  contentType: "case_study",
  summary:
    "Modelled AI-driven workforce budget allocation for a IT-BPM firm and a 3-year NPV optimiser to identify a ₹17.9 Cr return from redesign-first strategies.",
  description:
    "A management-consulting case study that measures how exposed IT-BPM jobs are to generative AI, then works out how a fixed workforce budget should be split between reskilling, redeployment, hiring and work redesign. The client is a hypothetical 10,000-person IT-BPM firm. This is a pilot covering three roles: software developers (3,000), QA testers (1,200) and customer service reps (3,000).",
  problem:
    "Most conversations about AI and jobs stop at “which roles are at risk.” A CHRO has to answer a harder question: with a limited budget, where does the money go, and what return does it earn?",
  tags: [
    "Management Consulting",
    "Workforce Strategy",
    "Generative AI",
    "Financial Modelling",
    "Optimisation"
  ],
  tools: ["Python", "Claude Sonnet 5.5"],
  role: "",
  duration: "",
  metrics: [
    { label: "3-year NPV (optimised portfolio)", value: "+₹17.9 cr" },
    { label: "ROI on present value of costs", value: "98%" },
    { label: "Cumulative payback", value: "Year 2" },
    { label: "Employees covered", value: "4,380 of 7,200" },
  ],
  sections: [
    {
      heading: "The decision",
      layout: "research",
      body: `The CHRO has a fixed budget (₹25 crore, assumed) and four moves:

- **Reskill**
- **Redeploy**
- **Hire specialists**
- **Redesign work and monitor**

The case answers which roles change most, which move suits each role, how many employees to put in each, at what cost, what the 3-year return is, and what to do in the next 12 months.`,
    },
    {
      heading: "Approach",
      layout: "implementation",
      body: `1. **Task-level scoring.** I scored 60 O\\*NET tasks across three occupations on five 0-4 dimensions: exposure, automation, augmentation, human judgment and feasibility.
2. **External benchmark.** Results were checked against the ILO’s 2025 exposure index (WP140, Table A1, 112 occupations).
3. **Clean definitions.** Exposure, automability, adoption and displacement are kept as separate concepts. Displacement is never inferred from exposure scores.
4. **3-year financial model.** Each move is valued per employee, per role, in INR at a 12% discount rate.
5. **Optimisation.** An integer program chooses headcounts per move under budget, training-capacity, redeployment-demand and coverage constraints.
6. **Strategy comparison.** The optimised plan is tested against equal-budget-per-role, most-exposed-first and business-as-usual.
7. **Stress test.** 11 drivers were varied one at a time (adoption, productivity, workforce size, time to benefit, budget and others).`,
    },
    {
      heading: "Key findings",
      body: `- **Customer service is the most exposed role (0.85); developers the least (0.63).** This matches the ILO’s ranking. My automation scores sit 0.01-0.14 from the ILO means, and the differences come from my added limited-oversight test.
- **Developers keep the most human-led work.** About 51% of developer task weight is human-led, against 24% for QA and 5% for customer service.
- **Redesign beats reskilling per employee.** For developers, redesign adds +₹39k against +₹19.5k for reskilling. Reskilling destroys value in QA (−₹4.4k) and customer service (−₹43k).
- **Redeployment pays but is capped.** It returns the most per head (+₹157.5k developers, +₹99.2k QA, +₹47.6k customer service), but only up to 6% of each role because it depends on demand in target roles.

### The optimised portfolio wins clearly

| Strategy | 3-year NPV |
|---|---|
| Optimised portfolio | +₹17.9 cr |
| Equal budget per role | +₹8.4 cr |
| Business as usual | ₹0 |
| Reskill most exposed first | −₹8.7 cr |

The optimised plan puts 2,820 developers and 1,128 QA testers on redesign and moves 432 people through redeployment. That covers 4,380 of 7,200 modelled employees, with ROI of 98% on the present value of costs and cumulative payback in year 2.`,
    },
    {
      heading: "Recommendation",
      layout: "research",
      body: `1. **Redesign work and monitor** for developers and QA.
2. **Redeploy** up to 6% of each role into higher-demand roles.
3. **Hold reskilling** until measured training costs are known.
4. **Make no headcount cuts** on exposure alone.
5. **Review at a month-12 gate:** continue only if adoption and benefits reach at least half of plan.`,
    },
    {
      heading: "12-month roadmap",
      layout: "implementation",
      body: `1. **Months 0-3:** replace assumed wages and headcount with client data, pilot AI tooling in two developer and QA teams, and human-label a 24-task validation sample.
2. **Months 3-6:** scale where adoption tracks plan and open the redeployment slots.
3. **Months 6-12:** run the gate and re-test reskilling with measured costs.`,
    },
    {
      heading: "Economics and robustness",
      body: `NPV stays positive in every single-factor test (₹6.0-30.8 crore). It is most sensitive to AI adoption and productivity realisation, and benefits can fall about 50% before NPV reaches zero. Reskilling only enters the optimal mix if training cost falls 30% or its productivity multiplier reaches 1.7.`,
    },
    {
      heading: "Limitations",
      body: `This is a pilot and is labelled as such. It covers three occupations, uses single-pass LLM scoring without human validation or stability tests, and relies on analyst-assigned occupation mapping. Wages, costs, adoption and headcount are assumptions, and results are modelled, not realised. Client wage, headcount and attrition data would improve it most.`,
    },
    {
      heading: "Data and tools",
      body: `ILO WP140 (2025) · O\\*NET OnLine · Indian Labour Statistics 2022-23 (QES IT/BPO) · Claude Sonnet 5.5 for task scoring · Python · integer programming`,
    },
  ],
  images: [],
  videos: [],
  links: [],
  documents: [],
  pdf: "/projects/ai_workforce/AI_workforce.pdf",   // add when you have it
  coverImage: "/projects/ai_workforce/cover.jpeg", // add when you have it
},
{
  id: "rural-micro-retailer-bookkeeping",
  title: "Voice-First Bookkeeping for Rural Micro-Retailers", // working title, rename as you like
  category: "case-studies",
  contentType: "case_study",
  summary:
    "A voice-first, vernacular bookkeeping solution for rural micro-retailers, with a recommended partner-funded go-to-market and a 5-year financial model projecting INR 1.93 Cr NPV.",
  description:
    "Evaluated digitisation gaps among rural micro-retailers, identifying poor bookkeeping and credit leakage as key business challenges. Designed a voice-first, vernacular bookkeeping solution tailored to low digital literacy and limited connectivity, translating it into a product. Evaluated 5 GTM models using competitive benchmarking and unit economics, and recommended partner-funded distribution. Built a 5-year financial model projecting INR 1.93 Cr NPV, estimated a 32K-merchant break-even and advised a stage-gated pilot.",
  problem:
    "Rural micro-retailers face poor bookkeeping and credit leakage, and their digitisation gaps are made harder by low digital literacy and limited connectivity.",
  tags: [
    "Product Strategy",
    "Go-to-Market",
    "Rural Retail",
  ],
  tools: [],
  role: "",
  duration: "",
  metrics: [
    { label: "5-year NPV (projected)", value: "INR 1.93 Cr" },
    { label: "Break-even (estimated)", value: "32K merchants" },
    { label: "GTM models evaluated", value: "5" },
  ],
  sections: [],
  images: [],
  videos: [],
  links: [],
  documents: [],
  pdf: "/projects/rural-bookkeeping/Hiba_EE23BTECH11026.pdf", // add when you paste the PDF
  coverImage: "/projects/rural-bookkeeping/cover.png",
},

  // ───────── AI & ANALYTICS (8) ─────────
  {
  id: "instacart-quick-commerce",
  title: "Instacart Quick-Commerce Analytics",
  category: "ai-analytics",
  contentType: "case_study",
  summary:
    "Using Instacart data as a stand-in for a quick-commerce platform to understand reorders, customer cohorts and basket behaviour.",
  description:
    "Used the public Instacart dataset (3M+ orders, 206K customers) as a stand-in for a quick-commerce platform to understand reorder behaviour, customer cohorts and basket patterns. Built an interactive Power BI dashboard to turn those findings into retention insights.",
  problem:
    "How can a quick-commerce platform keep customers coming back and get them to order more often?",
  tags: ["Retention Analytics", "Customer Cohorts", "Quick Commerce"],
  tools: ["Python", "SQL", "Power BI"],
  role: "",
  duration: "",
  metrics: [
    { label: "Orders analysed", value: "3M+" },
    { label: "Customers", value: "206K" },
    { label: "Reorder rate", value: "59%" },
  ],
  sections: [
    {
      heading: "The question",
      body: `How can a quick-commerce platform improve retention and order frequency?

I treated the Instacart dataset as a stand-in for platforms like Blinkit and Zepto, and looked at it three ways:

- **Customers:** reorder rate, repeat buyers and drop-off after the first order
- **Delivery:** delivery times, late orders and whether they relate to repeat behaviour
- **Products:** top items, basket size and when people order`,
    },
    {
      heading: "What I found",
      body: `- **59% of items are reorders**, so most baskets are things people already buy.
- **The average basket is about 10 items.**
- **Customers fall into distinct groups by how often they buy**, which shows where retention opportunities sit.`,
    },
    {
      heading: "What I built",
      body: `- Customer segmentation and order-by-order retention analysis in Python and SQL
- An interactive Power BI dashboard with DAX measures for reorder rate, basket size and segment behaviour`,
    },
    {
      heading: "Why it matters",
      body: `Reorder rate and early retention are the main levers for repeat sales in groceries. Knowing where customers drop off, and which products they keep coming back for, points to practical fixes like reminders, bundles and replenishment prompts.`,
    },
    {
      heading: "A note on the data",
      body: `The delivery times are a synthetic layer added for the analysis, so those results show the method, not real delivery performance.`,
    },
  ],
  images: [],     // add dashboard screenshots: { src: "/projects/instacart/dashboard.png", alt: "Power BI dashboard" }
  videos: [],
  links: [],
  documents: [],
  coverImage: "/projects/instacart.png",  // uncomment once the file is in public/projects/instacart/
  // pdf: "/projects/instacart.pdf",     // uncomment if you add a PDF
},
  
  {
    id: "ikea-business-analytics", category: "ai-analytics", contentType: "case_study",
    title: "IKEA Retail Sales Analysis",
    summary: "65 SQL queries on £10.64M of transactions showed that 37.8% of revenue comes from the top 5% of customers and £896.8K leaks through cancellations.",
    coverImage: "/projects/ikea.png",
    description: "An end-to-end retail analytics project using MySQL and Python to find what drives revenue, which customers matter most and where money is lost. I structured 65 SQL queries around seven business questions, validated the results in Python, and turned them into prioritised recommendations on customer retention, cancellations and returns.",
    tags: ["Business Analytics", "Retail Analytics", "Customer Segmentation", "RFM Analysis", "SQL"],
    tools: ["MySQL 8", "Python", "Pandas", "Excel"],
    role: "Independent Data Analyst", duration: "",
    metrics: [
      { label: "Revenue analysed", value: "£10.64M" },
      { label: "Top 5% customers' revenue share", value: "37.8%" },
      { label: "Revenue at risk (cancellations)", value: "£896.8K" },
      { label: "Customers analysed", value: "4,373" },
      { label: "Repeat purchase rate", value: "69.97%" },
      { label: "SQL queries", value: "65" },
    ],
    problem: "Standard sales reports show totals but hide who drives revenue and where money leaks. The goal was to find the customers who contribute most, spot wholesale-style buying, see which products drive revenue and returns, and quantify the revenue lost to cancellations.",
    sections: [
      {
        heading: "Approach",
        body: `
Instead of running isolated queries, I organised the analysis around **seven business questions**: sales performance, product performance, customer behaviour, geography, returns and cancellations, order patterns, and advanced analytics (RFM, segmentation, cohorts).

- Wrote **65 SQL queries** using CTEs and window functions in MySQL.
- Validated and visualised the results in **Python/Pandas**.
- Consolidated everything into a structured Excel workbook.

**Advanced methods:** RFM analysis, NTILE percentile ranking to find top customers, LAG-based purchase-gap analysis, and cohorts by first purchase month.
`
      },
      {
        heading: "Data Preparation",
        body: `
Messy data was treated as a finding, not just cleaned away.

- Kept **negative quantities** so returns and cancellations could be analysed.
- Stored invoice numbers as text to keep cancellation-prefixed invoices.
- Separated non-product lines (postage, discounts, manual adjustments) from real products.
- Excluded unidentified customers from customer-level segmentation.
`
      },
      {
        heading: "Key Findings",
        body: `
**Revenue is concentrated in a few accounts**
- The top 5% of customers (218 accounts) generated **£4.03M, or 37.8% of revenue**. The largest customer spent £279,489, over 125x the average.
- 30% of identified customers bought only once.
- Fixed spend thresholds labelled 99.6% of customers as low-value, so percentile-based tiers were far more useful.

**Buying patterns point to wholesale demand**
- The average invoice had about 21 distinct products and nearly 200 units.
- Weekday revenue was more than 12x weekend revenue, concentrated between 8 AM and 5 PM.
- November and December were the peak months, at £1.51M and £1.46M.

**Revenue leakage**
- **19.97% of invoices were cancelled**, an estimated £896.8K or about 8.4% of gross revenue. One £168,470 order was cancelled in full.
- The top revenue product (Regency Cakestand 3 Tier, £174.5K) was also the most-returned real product, with 181 returns, which points to a packaging or handling issue.
`
      },
      {
        heading: "Recommendations",
        body: `
1. **Protect high-value accounts:** replace fixed-value tiers with percentile-based segmentation and give the top 5% dedicated account management.
2. **Reduce leakage:** audit high-value cancelled invoices for stock, pricing or order-management causes, and review packaging for fragile, high-return products.
3. **Improve retention:** offer second-purchase incentives to first-time buyers within 60-90 days, guided by cohort and purchase-gap results.
4. **Strengthen data quality:** flag admin line items separately, capture customer IDs more reliably, and replace keyword-based categories with a structured product taxonomy.
`
      },
      {
        heading: "Limitations & Next Steps",
        body: `
- The data covers about 13 months and one holiday cycle, so long-term seasonality can't be concluded.
- The 55.3% apparent churn is inflated by the dataset's end date and isn't confirmed churn.
- Keyword-based categories placed 86.7% of sales in "Others", so category-level conclusions are unreliable.
- Wholesale behaviour is inferred from order patterns; customer type can't be confirmed without account data.

**Next steps:** churn prediction with Random Forest and Logistic Regression, K-means to validate the RFM segments, market basket analysis, and monthly revenue forecasting.
`
      },
      {
        heading: "What I Learned",
        body: `
A query that returns results isn't necessarily correct, so cross-checking against business logic was essential. Imperfect data can distort insights if it is ignored, and the real value of analytics is turning findings into prioritised, measurable actions.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
    {
    id: "bankruptcy-prediction", category: "ai-analytics", contentType: "case_study",
    title: "Corporate Bankruptcy Prediction",
    summary: "Four ML models compared on a 30:1 imbalanced dataset, showing the best bankruptcy model depends on whether you want to catch every risky firm or avoid false alarms.",
    coverImage: "/projects/bankruptcy.png",
    description: "A machine learning project that predicts corporate bankruptcy from financial ratios. It compares Logistic Regression, Decision Tree, Random Forest and Gradient Boosting on 6,819 Taiwanese listed companies, with a focus on class imbalance, minority-class detection and interpreting which financial signals matter.",
    tags: ["Predictive Modelling", "Machine Learning", "Credit Risk", "Imbalanced Data"],
    tools: ["Python", "scikit-learn", "SMOTE", "Pandas"],
    role: "Course Project, Business Analytics Using Python", duration: "",
    metrics: [
      { label: "Firms analysed", value: "6,819" },
      { label: "Bankrupt share", value: "3.2%" },
      { label: "Highest recall (Logistic Regression)", value: "84.1%" },
      { label: "Highest precision (Gradient Boosting)", value: "33.3%" },
    ],
    problem: "Only 3.2% of the companies in the dataset went bankrupt, roughly a 30:1 imbalance. A model can score high accuracy by predicting 'not bankrupt' every time and still be useless. The challenge was to reliably find the few at-risk firms and understand which financial signals reveal them.",
    sections: [
      {
        heading: "Approach",
        body: `
**Preparing the data**

- Clipped extreme financial ratios at the 1st and 99th percentiles to limit the influence of outliers.
- Balanced the classes with **SMOTE applied to the training set only**, so the test set kept the real class distribution and there was no leakage. The resampled training data had 5,279 observations per class.
- Scaled features for Logistic Regression only, since tree-based models are scale-invariant.

**Modelling and evaluation**

- Compared four models: Logistic Regression (interpretable baseline), a depth-limited Decision Tree, a 200-tree Random Forest and Gradient Boosting.
- Judged them on **ROC-AUC, precision, recall and F1**, with accuracy as a secondary metric.
- Checked stability with **5-fold stratified cross-validation** on Random Forest and Gradient Boosting.
`
      },
      {
        heading: "Key Findings",
        body: `
- **Financial distress is multidimensional.** No single ratio dominates; the models draw on several dimensions of financial health.
- **Leverage and equity are the strongest signals.** Net Worth / Assets and Debt Ratio % ranked as the top two features.
- **Liquidity gives early warning.** Current Ratio and Working Capital / Total Assets were also among the strongest predictors.
- **Models make different trade-offs.** Logistic Regression caught the most bankruptcies (84.1% recall) but raised many false alarms. Gradient Boosting was the most precise (33.3%) with lower recall (52.3%). Random Forest gave the best precision–recall balance.
`
      },
      {
        heading: "Conclusion & Business Application",
        body: `
The right model depends on the cost of a missed bankruptcy versus a false alarm, not on a single score.

I proposed a **two-stage screening framework**: a high-recall model first flags potentially distressed firms, then a more balanced ensemble reviews the flagged firms. This supports credit-risk screening, early-warning systems and portfolio risk monitoring.
`
      },
      {
        heading: "Limitations & Next Steps",
        body: `
- Feature importance shows association, not causation.
- The data covers Taiwanese listed companies from 1999 to 2009, so it may not generalise to other countries or industries.
- There is no temporal validation on future data.
- This is a coursework project built with public sources and AI-assisted tools, not independently validated research.

**Next steps:** SHAP explainability, probability calibration, cost-sensitive classification and XGBoost / LightGBM comparison.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
  {
    id: "ixigo-sentiment", category: "ai-analytics", contentType: "case_study",
    title: "Ixigo Review Sentiment Analytics",
    summary: "Text analytics on 9,609 Google Play reviews that traced Ixigo's low app rating to five fixable problems, with a recommendation for each.",
    coverImage: "/projects/ixigo_cover.jpeg",
    description: "A text analytics study of 9,609 Google Play reviews for the Ixigo travel app. Using an NLP pipeline in Orange and VADER sentiment scoring, it goes beyond star ratings to identify what drives negative sentiment and what that costs the business in retention, acquisition cost and lifetime value.",
    tags: ["Sentiment Analysis", "Text Analytics", "Customer Experience", "Product Strategy"],
    tools: ["Orange", "VADER", "Python", "Google Sheets"],
    role: "Course Project, Text Analytics for Business", duration: "",
    metrics: [
      { label: "Reviews analysed", value: "9,609" },
      { label: "1-star reviews", value: "80.7%" },
      { label: "Core pain points found", value: "5" },
    ],
    problem: "Ixigo competes with MakeMyTrip, EaseMyTrip and Yatra, where user trust drives growth, yet most of its reviews are one star. Star ratings show that users are unhappy but not why, or what it costs the business.",
    sections: [
      {
        heading: "Approach",
        body: `
- Collected the reviews from Google Play with Python and loaded them into **Orange's Text Mining add-on**.
- Cleaned the text with lowercasing, tokenisation, stop-word removal, punctuation and number removal, and lemmatisation, then built a bag-of-words representation.
- Scored every review with **VADER** (compound score from -1 to +1) and compared the vocabulary of 1-star and higher-rated reviews with word clouds.
`
      },
      {
        heading: "Key Findings: Five Recurring Pain Points",
        body: `
1. **Refund and cancellation failures:** refunds promised in days take weeks or never arrive.
2. **Price deception:** low fares shown in search rise at checkout through added fees, which users describe as "fraud".
3. **Unreachable support:** no visible phone or email, and generic replies that don't resolve issues, even though almost every review gets a developer response.
4. **Payment failures:** money debited with no booking and no automatic reversal, which also creates regulatory risk.
5. **Technical instability:** server errors that make every other problem worse during peak travel periods.

Reviews skew negative because happy users rarely write them, so the real ratio of satisfied to unhappy users is probably less extreme.
`
      },
      {
        heading: "Recommendations",
        body: `
- **Refunds:** build a transparent tracker showing whether a refund is processed, in transit or credited.
- **Pricing:** show the total, all-inclusive price from the first search result.
- **Support:** add live in-app chat staffed by trained agents, especially in peak periods.
- **Payments:** same-day or next-day automatic reversals with a proactive notification.
- **Reliability:** load-test ahead of festivals and long weekends.
`
      },
      {
        heading: "Conclusion",
        body: `
The complaints are repeated and interconnected, which suggests they are unresolved rather than random. Fixing even some of them could lift the rating above 3.0 and rebuild user trust. In this market, sentiment directly drives customer acquisition cost, lifetime value and market share.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
    {
    id: "agentic-discovery-ranking", category: "ai-analytics", contentType: "case_study",
    title: "GlanceFlow AI: Agentic Discovery & Action Engine",
    summary: "An agent system that turns a plain-language request into ranked, explained picks. Precision@5 rose from 44% to 97% and budget violations fell from 44% to 0% in an offline benchmark.",
    coverImage: "/projects/glanceflow.png",
    description: "An independent prototype where you describe what you need in plain language, for example a thoughtful gift under ₹1,500 for a friend who loves reading, and a small team of agents finds options, ranks them with a transparent score, checks every hard constraint in code, and explains each pick from catalogue facts. Users can then save, compare, dismiss and refine. It works without any API key, and every claim it makes is verified rather than trusted.",
    tags: ["Agentic AI", "Ranking & Retrieval", "Product Thinking", "Responsible AI"],
    tools: ["Python", "Streamlit", "Pydantic", "SQLite", "BM25", "Plotly"],
    role: "Independent Project (product, design and build)", duration: "",
    metrics: [
      { label: "Precision@5", value: "44% → 97%" },
      { label: "Constraint violations", value: "44% → 0%" },
      { label: "Hit rate@5", value: "78% → 100%" },
      { label: "Automated tests passing", value: "80" },
    ],
    problem: "People face information overload, generic recommendations and friction when narrowing down options. The hypothesis I set out to test: users find relevant products with less effort when a system understands their intent, personalises, explains its picks and helps with the next action. The harder engineering question was how to make an AI system helpful without letting it invent facts, break budgets or act without permission.",
    sections: [
      {
        heading: "Approach",
        body: `
I built the system as separate agents, each with one job, so every step can be tested on its own.

- **Understand:** turns the request into structured constraints (budget, interests, exclusions). An optional LLM extractor is schema-checked and fact-checked against the original text.
- **Retrieve and rank:** BM25 search over a 283-item catalogue, hard filtering, de-duplication, preference-aware scoring and diversity-aware selection, so the top 5 are not near-copies.
- **Critic:** verifies budget, stock, catalogue facts, duplicates, exclusions and hallucinated IDs in code. It gets one bounded revision, then a safe fallback.
- **Action:** save, unsave, dismiss, compare and feedback. Actions are idempotent, permission-checked and confirmed by re-reading storage. There are no purchases.

A step cap of 12 and strict state transitions stop the workflow from looping.
`
      },
      {
        heading: "Results",
        body: `
Measured offline on 23 answerable queries at top-5, comparing three systems:

| Metric | Keyword only | + Hard filters | Full intent-aware system |
|---|---|---|---|
| Precision@5 | 0.443 | 0.739 | **0.974** |
| Hit rate@5 | 0.783 | 0.913 | **1.000** |
| Constraint-violation rate | 44.3% | 0% | **0%** |
| Distinct products in top 5 | 2.39 | 2.61 | **4.22** |

Edge cases were handled correctly in **7 of 7** tests: a purchase request is refused, a contradictory budget triggers one clarifying question, and an impossible query gets an honest empty state.
`
      },
      {
        heading: "Trust & Safety by Design",
        body: `
- **Nothing the model says is trusted blindly:** extracted budgets must appear in the user's text, and generated explanations may only cite the item's price or the user's budget.
- **Catalogue text is treated as untrusted:** a 3-layer prompt-injection screen runs before display, and all output is HTML-escaped.
- **Privacy by default:** it runs locally, the external LLM is opt-in per session, and events store structured properties rather than raw prompts.
- **Full visibility:** an Agent Activity view shows each step, including revisions and failed checks, and a 13-event log feeds a built-in analytics dashboard.
`
      },
      {
        heading: "Limitations & Next Steps",
        body: `
- The catalogue is synthetic and there are no real users. Relevance labels come from catalogue tags, so the benchmark is optimistic and is **not proof of real-world impact**.
- Retrieval is keyword-based (BM25) rather than semantic, and the live LLM path was tested only with fake-LLM tests.

**Next steps:** embedding retrieval behind the existing swappable retriever, ranking learned from real feedback, multi-user profiles with authentication, and a proper A/A then A/B test.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
    {
    id: "ed-triage", category: "ai-analytics", contentType: "case_study",
    title: "AI-Assisted ED Triage & Hospital Routing",
    summary: "A working prototype where AI recommends triage priority, a safety layer only ever escalates, and a rule-based engine routes patients across a 5-hospital network, with clinicians always in control.",
    coverImage: "/projects/hospitals.png",
    description: "An academic proof-of-concept for clinical decision support in emergency departments, built on 100% synthetic data. A Gradient Boosting model recommends a triage priority, a safety layer escalates uncertain or risky cases, and a deterministic engine refers patients to better-equipped hospitals when local capacity runs out. Every decision is logged in an audit trail, and clinicians can review and override each one.",
    tags: ["Accenture", "Healthcare ML", "Decision Support", "Responsible AI"],
    tools: ["Python", "Streamlit", "Gradient Boosting", "scikit-learn", "SQLite"],
    role: "", duration: "",
    metrics: [
      { label: "Synthetic patient records", value: "1,200" },
      { label: "Hospital network", value: "5" },
      { label: "Demo patient scenarios", value: "20" },
      { label: "Surge stress test", value: "3x volume" },
    ],
    problem: "Emergency departments must prioritise patients quickly, but real hospitals face incomplete data, rural facilities with limited resources, and sudden surges. The challenge was to show how AI can support triage safely: assisting clinicians rather than replacing them, never quietly downgrading a patient, and keeping every decision traceable.",
    sections: [
      {
        heading: "Approach",
        body: `
The system separates **prediction**, **safety** and **routing**, so each can be checked independently.

- **AI triage:** a Gradient Boosting model assigns one of five priority levels (red to blue) and always returns a confidence score, an uncertainty band (low, moderate or high) and the factors behind the call. It never returns a bare label.
- **Safety layer:** applied after the model, it **only escalates, never downgrades**. It raises priority by one level on low confidence, missing critical data, concerning vitals, or high uncertainty in pediatric and geriatric patients.
- **Routing engine:** a deterministic, rule-based engine, fully separate from the ML model. It checks specialty, ICU and bed capacity, diagnostic headroom and ED load. If the current hospital can't cope, it scores the other network hospitals and recommends the best feasible one.
- **Waiting-room monitoring:** flags patients who exceed priority-specific wait thresholds and triggers a priority review if new vitals show deterioration.
`
      },
      {
        heading: "Human Oversight & Audit Trail",
        body: `
Every case requires clinician review. Clinicians can accept or **override** the AI recommendation with a stated reason. Each decision (AI output, confidence, safety escalation, final decision, override reason, referral) is written to a **SQLite audit log** and can be reviewed later.
`
      },
      {
        heading: "What the Prototype Demonstrates",
        body: `
Four scenarios, supported by 20 fictional patients covering pediatric, geriatric, zero-history, incomplete-data and low-confidence cases:

1. **Urban emergency:** a high-risk chest pain patient is triaged and tracked through the queue and network.
2. **Rural resource limitation:** a rural hospital can't fully support the case, so the engine recommends referral to a better-equipped hospital.
3. **Surge:** a 3x volume simulation shows queue length, occupancy and diagnostic load rising, with overloaded departments flagged.
4. **Clinician override:** a clinician overrides the AI priority with a reason, and it appears in the audit log.
`
      },
      {
        heading: "Limitations & Path to Real Use",
        body: `
This is a proof-of-concept, **not a healthcare system**.

- The training labels come from a simplified illustrative scoring function, not real clinical data, so the model's accuracy says nothing about real-world performance.
- Hospital data is fictional and static, with no live bed-management or EHR integration.
- Authentication is simulated, and there is no encryption. Safety and wait thresholds are illustrative, not clinical standards.

**Before any real deployment:** train and validate on real, ethically sourced clinical data, audit for bias, add real access control and encryption, integrate with hospital systems, complete regulatory review (including India's data-protection framework), and test with real nursing and physician staff.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
  
  // ───────── HARDWARE & ELECTRICAL (5) ─────────
    {
    id: "mips32-five-stage", category: "hardware-electrical", contentType: "case_study",
    title: "5-Stage Pipelined MIPS32 Processor",
    summary: "A 32-bit, 5-stage pipelined RISC processor designed in Verilog, with a 14-instruction ISA, two-phase clocking and branch handling.",
    coverImage: "/projects/mips32.png",
    description: "A Verilog model of a classic 5-stage pipelined MIPS32 processor. It covers instruction and data memory, a 32-register file, an ALU and the pipeline registers between stages. Alternating pipeline stages run on a two-phase clock (clk1 and clk2), and branches are resolved in the memory stage, with the instructions fetched after a taken branch cancelled.",
    tags: ["Digital Design", "Computer Architecture", "Processor Design", "Verilog"],
    tools: ["Verilog"],
    role: "Individual Project", duration: "",
    metrics: [
      { label: "Pipeline stages", value: "5" },
      { label: "Data width", value: "32-bit" },
      { label: "General-purpose registers", value: "32" },
      { label: "Instructions implemented", value: "14" },
    ],
    problem: "A processor runs far faster when it works on several instructions at once, but pipelining adds real design problems: splitting work cleanly across stages, passing state between them, and handling branches that change the program flow mid-pipeline. The goal was to build a working pipelined processor from scratch and understand how these pieces fit together.",
    sections: [
      {
        heading: "Architecture",
        body: `
- **32-bit RISC design:** 32 general-purpose registers (R0 hardwired to 0) and word-addressable memory.
- **Instruction set (14 instructions):**
  - R-type: ADD, SUB, AND, OR, MUL, SLT
  - I-type: ADDI, SUBI, SLTI, LW, SW
  - Branch: BEQZ, BNEQZ
  - Control: HLT
- **No flag register:** conditions are evaluated through registers.
`
      },
      {
        heading: "The Five Pipeline Stages",
        body: `
| Stage | Clock | What it does |
|---|---|---|
| **IF** Instruction Fetch | clk1 | Reads the instruction at the PC and computes the next PC |
| **ID** Decode / Register Fetch | clk2 | Decodes the opcode, reads operands, sign-extends the 16-bit immediate, classifies the instruction type |
| **EX** Execute | clk1 | Runs the ALU operation, computes load/store addresses, and computes branch targets and conditions |
| **MEM** Memory Access | clk2 | Reads or writes data memory and completes branches |
| **WB** Write-Back | clk1 | Writes the result back to the register file |

Pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB) carry each instruction's data and control signals from one stage to the next.
`
      },
      {
        heading: "Key Design Features",
        body: `
- **Two-phase clocking:** IF, EX and WB run on clk1, while ID and MEM run on clk2. Alternating phases keep neighbouring stages from overlapping.
- **Branch handling:** branches are resolved in the MEM stage. When one is taken, the PC jumps to the target and a TAKEN_BRANCH flag cancels the instructions already in the pipeline, including their write-backs and stores, so wrong-path instructions cannot change processor state.
- **Clean shutdown:** the HLT instruction sets a HALTED flag once it reaches write-back, and no further instructions are fetched or processed.
`
      },
      {
        heading: "Limitations & Next Steps",
        body: `
- Branches resolve late (in MEM), so a taken branch costs several wasted cycles.
- The jump instruction (J) is not implemented.
- Hazard handling is limited to branches.

**Next steps:** add data forwarding and hazard detection, move branch resolution earlier, implement jumps, and run the design on an FPGA.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },

    {
    id: "ripple-flood", category: "hardware-electrical", contentType: "case_study",
    title: "R!PPLE: Early Flood Warning for Rural Communities",
    summary: "A solar-powered sensor network that uses LoRa, on-device ML and GSM to warn flood-prone villages by SMS and siren, even where there is no internet.",
    coverImage: "/projects/ripple.png",
    description: "R!PPLE is a low-power flood early-warning system designed for rural communities that get no warning before floodwaters arrive. Solar-powered sensor nodes track rainfall, river level, soil moisture and humidity, and send data over long-range LoRa to a receiver that runs a machine-learning flood prediction. When risk is detected, it alerts residents and authorities by SMS and a physical siren, without needing internet or mobile data. Built as a team of five for the Texas Instruments WiSH programme (Group 27).",
    tags: ["Embedded Systems", "IoT", "TinyML", "Disaster Resilience", "Social Impact"],
    tools: ["ESP32", "Arduino Nano 33 BLE Sense", "LoRa (SX1278)", "GSM (SIM900A)", "TinyML", "KiCad"],
    role: "WISH Mentorship TI", duration: "",
    metrics: [
      { label: "Sensors monitored", value: "4" },
      { label: "LoRa range in rural areas", value: "15-20+ km" },
      { label: "Estimated system cost", value: "~₹40,000" },
      { label: "Alert channels", value: "SMS + siren" },
    ],
    problem: "Floods and storms account for about 80% of natural disasters in Asia, and India alone has lost an estimated $3.2 billion to flooding, with roughly 1,300 casualties in the events cited. In villages around Kodagu, residents said they received no warning before floodwater submerged fields and homes, destroying crops and property. Rural areas lack real-time monitoring of rainfall, water level and soil conditions, and existing alert systems are delayed or unavailable where connectivity and infrastructure are poor. A few extra minutes of warning can be the difference between safety and tragedy.",
    sections: [
      {
        heading: "Understanding the Community Need",
        body: `
The design began with the people affected, not the hardware.

- **Observed gap:** rural communities in flood-prone regions have no real-time warning, so families lose homes, crops and livestock with no time to act.
- **Livelihoods at stake:** agriculture is highly exposed, so a flood damages income as well as property.
- **Design goal:** sense the rising flood early and alert both communities and authorities, so they have time to act, protect and survive.
- **Constraint that shaped everything:** the system had to work with poor connectivity and little infrastructure.
`
      },
      {
        heading: "System Design",
        body: `
**Transmitter nodes (in the field).** Four sensor nodes, each built on an ESP32 with a LoRa module, measure:

| Parameter | Sensor |
|---|---|
| Rainfall intensity | Raindrop sensor |
| River / water level | MaxBotix MB7389 ultrasonic sensor |
| Soil saturation | Teros soil moisture sensor |
| Air humidity | DHT humidity sensor |

**Communication.** Nodes send data to the receiver over **LoRa peer-to-peer** on the unlicensed 868 MHz band. LoRa is built for very low power and long range, so remote nodes can sleep most of the time and still reach a gateway kilometres away.

**Receiver and alerts.** An Arduino Nano 33 BLE Sense receives the data and runs the prediction. If flood risk is detected, a **SIM900A GSM module** sends SMS alerts, with no internet needed, and a **siren** gives a physical warning to anyone nearby.
`
      },
      {
        heading: "Edge ML Prediction",
        body: `
Instead of fixed thresholds, flood risk is predicted with a **Random Forest** model:

1. Train on a past flood dataset with an 80/20 train/test split.
2. Evaluate feature importance to see which sensor readings matter most.
3. Convert the model to **TensorFlow Lite** for the microcontroller.
4. Tune it for the hardware, test and optimise, then upload it.
5. Run **real-time prediction on the device**, so it still works when the network does not.

The Nano 33 BLE Sense was chosen because it has the compute and memory to run TinyML on a small, low-power board.
`
      },
      {
        heading: "Power & Hardware Trade-offs",
        body: `
The nodes have to run unattended in remote places, so power came first.

- **Solar plus battery:** a solar panel (about 5-6 V) charges a battery through a diode. At night the node runs on the battery, which is sized to last at least 1-2 days without sun.
- **Clean supply:** an optional low-dropout regulator provides a stable 3.3 V for the electronics.
- **Component choices:** ESP32 for its low-power modes and integrated RF, LoRa for range at low power, and a GSM module as the most affordable low-power option for reaching phones. The team analysed power, performance and area trade-offs before finalising components.
- **Circuit design:** schematics for the transmitter and receiver were drawn in KiCad.
`
      },
      {
        heading: "Cost & Public Value",
        body: `
The full system is estimated at about **₹40,000**, mostly the siren and the higher-grade sensors. The system is meant as shared public infrastructure, so one installation protects a whole community, and the cost is justified as an investment by government or local authorities for public benefit rather than for individual purchase.
`
      },
      {
        heading: "Limitations & Next Steps",
        body: `
- This is a design and prototype-stage project with no field deployment, so the prediction accuracy and warning lead time are not yet validated on real flood events.
- Sensor and hardware choices were made for a prototype and would need ruggedising and weatherproofing for the field.
- The siren and soil sensors dominate the cost, so cheaper alternatives could widen reach.

**Next steps:** pilot in a flood-prone village, validate the model against real river and rainfall data, add a link to local authorities' alert systems, and support regional-language alerts.
`
      },
    ],
    images: [], videos: [], links: [], documents: [],
  },
  
];

export const projectsByCategory = (id) => projects.filter((p) => p.category === id);
