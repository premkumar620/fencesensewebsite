const methodology = (focus) => [
  {
    step: "01",
    title: "Discover",
    text: `We review your ${focus}, stakeholders, and constraints so the scope matches how the business actually runs.`,
  },
  {
    step: "02",
    title: "Design",
    text: "Architecture, controls, and delivery plans are documented with your internal owners before build starts.",
  },
  {
    step: "03",
    title: "Deliver",
    text: "Implementation, validation, and handover happen in stages so operations are not disrupted.",
  },
  {
    step: "04",
    title: "Improve",
    text: "Reporting, tuning, and follow-on work keep the outcome aligned as threats and priorities change.",
  },
];

const faq = (question, answer) => ({ question, answer });

export const detailContent = {
  "solution:security-solution": {
    benefitsTitle: "Key benefits of security solutions",
    benefits: [
      {
        title: "Managed detection & response",
        items: ["24/7 monitoring", "Alert triage and escalation", "Incident coordination", "Executive reporting"],
      },
      {
        title: "Threat intelligence",
        items: ["IP, domain, and URL intelligence", "Context for analyst decisions", "Feed tuning for your stack", "Briefings for leadership"],
      },
      {
        title: "Platform protection",
        items: ["Cloud workload security", "Network and edge controls", "Application protection", "Hybrid estate coverage"],
      },
      {
        title: "Risk visibility",
        items: ["Control gap analysis", "Prioritized remediation", "Compliance alignment", "Residual risk reporting"],
      },
    ],
    methodologyTitle: "Our security delivery methodology",
    methodology: methodology("security posture"),
    faqs: [
      faq("Do you support on-premises and cloud environments?", "Yes. We design and operate security across on-premises, cloud, and hybrid estates so coverage follows the workloads you run."),
      faq("Can you work alongside our existing SOC?", "We can augment your team with monitoring, hunting, and response, or operate a managed SOC function depending on what you need."),
      faq("How quickly can monitoring go live?", "Timelines depend on telemetry access and scope, but many engagements begin structured monitoring within a few weeks of kickoff."),
      faq("What threat intelligence sources do you use?", "We combine commercial feeds, open-source intelligence, and context from your environment to prioritize what matters for your business."),
      faq("How do you report to leadership?", "Reports focus on what changed, what was blocked or investigated, and which risks still need a decision."),
    ],
  },
  "solution:network-solution": {
    benefitsTitle: "Key benefits of network solutions",
    benefits: [
      {
        title: "Reliable connectivity",
        items: ["Architecture for uptime", "Capacity planning", "Path redundancy", "Performance baselines"],
      },
      {
        title: "Segmentation & access",
        items: ["Zero-trust aligned design", "Site and user access", "East-west containment", "Policy simplification"],
      },
      {
        title: "Operational visibility",
        items: ["Critical path monitoring", "Change control support", "Documentation for teams", "Incident-ready runbooks"],
      },
      {
        title: "Secure evolution",
        items: ["Migration planning", "Phased rollouts", "Validation testing", "Handover to operations"],
      },
    ],
    methodologyTitle: "Our network delivery methodology",
    methodology: methodology("network estate"),
    faqs: [
      faq("Can you redesign without major downtime?", "We plan changes in phases, with rollback paths and maintenance windows agreed upfront."),
      faq("Do you support SD-WAN and remote access?", "Yes. Secure remote access and modern WAN designs are part of typical network engagements."),
      faq("How do you limit lateral movement?", "Segmentation, identity-aware access, and monitoring on critical paths are core design goals."),
      faq("Will our internal team receive documentation?", "Yes. Designs, as-built diagrams, and operating notes are part of delivery."),
    ],
  },
  "solution:application-delivery-solution": {
    benefitsTitle: "Key benefits of application delivery",
    benefits: [
      {
        title: "Availability & performance",
        items: ["Load and traffic design", "Health monitoring", "Capacity reviews", "User experience tuning"],
      },
      {
        title: "Secure delivery",
        items: ["WAF and edge protection", "TLS and certificate hygiene", "Release gate checks", "Traffic inspection"],
      },
      {
        title: "Release confidence",
        items: ["Repeatable deployments", "Rollback planning", "Staging validation", "Change windows"],
      },
      {
        title: "Operations alignment",
        items: ["Runbooks for app teams", "Shared dashboards", "Escalation paths", "Post-release reviews"],
      },
    ],
    methodologyTitle: "Our application delivery methodology",
    methodology: methodology("application delivery stack"),
    faqs: [
      faq("Can you help with both legacy and cloud-native apps?", "Yes. We work across traditional datacenter apps and cloud-native services."),
      faq("Do you integrate with our CI/CD pipeline?", "We align delivery controls and security checks with the pipelines your teams already use where possible."),
      faq("How do you prevent outages during releases?", "Phased rollouts, health checks, and rollback plans are standard in our delivery approach."),
      faq("Can you improve performance without replacing the app?", "Often yes—through traffic management, caching, and infrastructure tuning before larger rewrites."),
    ],
  },
  "solution:identity-access-management-iam": {
    benefitsTitle: "Key benefits of IAM",
    benefits: [
      {
        title: "Strong authentication",
        items: ["Single sign-on", "MFA rollout", "Conditional access", "Passwordless where suitable"],
      },
      {
        title: "Lifecycle control",
        items: ["Joiner-mover-leaver", "Role-based access", "Access reviews", "Orphan account cleanup"],
      },
      {
        title: "Privileged access",
        items: ["PAM for admins", "Session logging", "Just-in-time access", "Break-glass procedures"],
      },
      {
        title: "Audit readiness",
        items: ["Evidence for reviews", "Policy documentation", "Directory integration", "Compliance mapping"],
      },
    ],
    methodologyTitle: "Our IAM methodology",
    methodology: methodology("identity estate"),
    faqs: [
      faq("Can you connect cloud and on-premises directories?", "Yes. Hybrid identity is a common starting point for IAM engagements."),
      faq("How do you reduce excessive permissions?", "We use role design, access reviews, and privileged access controls tailored to your org structure."),
      faq("Do you support major identity platforms?", "We work with the platforms enterprises already run, integrating rather than forcing rip-and-replace."),
      faq("How long does an IAM improvement project take?", "Scope varies; many programs run in phases so high-risk access is addressed first."),
    ],
  },
  "solution:cloud-solution": {
    benefitsTitle: "Key benefits of cloud solutions",
    benefits: [
      {
        title: "Secure architecture",
        items: ["Landing zones", "Network design", "Identity integration", "Guardrails for new workloads"],
      },
      {
        title: "Data protection",
        items: ["Encryption standards", "Residency choices", "Backup strategy", "Key management"],
      },
      {
        title: "Operational control",
        items: ["Environment management", "Cost visibility", "Patch and config baselines", "Automation where it helps"],
      },
      {
        title: "Scale with confidence",
        items: ["Pilot to production path", "Workload onboarding", "Security embedded in design", "Handover to internal teams"],
      },
    ],
    methodologyTitle: "Our cloud methodology",
    methodology: methodology("cloud platform"),
    faqs: [
      faq("Which cloud providers do you support?", "We work across major hyperscale and hybrid platforms depending on your estate."),
      faq("Is security included from day one?", "Yes. Guardrails, identity, and workload protection are part of architecture—not an afterthought."),
      faq("Can you migrate existing workloads?", "We plan migrations in waves with validation, rollback, and security checks at each stage."),
      faq("Do you help internal teams operate the cloud?", "Documentation, training, and operating models are included in most engagements."),
    ],
  },
  "solution:digital-solutions": {
    benefitsTitle: "Key benefits of digital solutions",
    benefits: [
      {
        title: "Web applications",
        items: [
          "Enterprise web apps",
          "Web portals",
          "Customer-facing apps",
          "Supply chain management web apps",
          "Healthcare and analytics web apps",
          "Inventory web apps",
        ],
      },
      {
        title: "Mobile application",
        items: [
          "Mobile apps consulting",
          "Mobile UX and UI design",
          "Mobile app development",
          "Mobile app integration",
          "Maintenance and support",
          "Mobile app modernisation",
        ],
      },
      {
        title: "Cloud application migration",
        items: ["Cloud application migration", "Database migration", "Enterprise system migration", "Data migration"],
      },
      {
        title: "UI/UX design",
        items: [
          "Website design",
          "Web application design",
          "E-commerce design",
          "Mobile app design",
          "SaaS design",
          "Visual prototype",
        ],
      },
      {
        title: "Ecommerce solution",
        items: [
          "Platform-based e-commerce development",
          "Custom e-commerce development",
          "E-commerce migration",
          "E-commerce website design",
          "E-commerce integration",
        ],
      },
      {
        title: "Quality analysis",
        items: ["Performance benchmarking", "Automated testing", "Manual testing"],
      },
    ],
    methodologyTitle: "Our digital solutions methodology",
    methodology: [
      {
        step: "01",
        title: "Discover & define",
        text: "We capture business goals, users, and constraints so scope, UX, and technical choices stay aligned.",
      },
      {
        step: "02",
        title: "Design experience",
        text: "Wireframes, prototypes, and UI systems are validated before engineering begins.",
      },
      {
        step: "03",
        title: "Build & integrate",
        text: "Development, API integration, and security checks proceed in iterative releases.",
      },
      {
        step: "04",
        title: "Launch & improve",
        text: "Testing, deployment, monitoring, and enhancement cycles keep the product reliable in production.",
      },
    ],
    faqs: [
      faq(
        "What UI technologies do you specialize in for building modern web applications?",
        "We excel in HTML, CSS, JavaScript, and frameworks such as React, Angular, Vue.js, Semantic UI, and SASS to create responsive and engaging user interfaces.",
      ),
      faq(
        "Can you build cross-platform and native mobile applications?",
        "Yes, we develop mobile apps using React Native, Flutter, Android, and iOS (Swift) for both cross-platform and native solutions.",
      ),
      faq(
        "Which backend programming technologies do you support?",
        "Our backend expertise includes Java (Spring Boot, Play Framework), PHP (Laravel), Node.js, Scala, and Python, offering scalable architectures for diverse application needs.",
      ),
      faq(
        "What database technologies do you support for my project?",
        "We support a wide range of databases, including MySQL, MongoDB, PostgreSQL, MSSQL, Oracle, and DB2, to handle secure and optimized data management.",
      ),
      faq(
        "How do your UI/UX designs enhance user engagement?",
        "Our designs leverage the latest technologies and frameworks to deliver intuitive, user-friendly, and visually appealing interfaces tailored to the target audience.",
      ),
      faq(
        "Can you help us with both web and mobile application development?",
        "Absolutely. We provide full-stack development services for both web and mobile applications, ensuring seamless integration and consistent user experiences across platforms.",
      ),
      faq(
        "Do you provide scalable and future-ready application architectures?",
        "Yes, our solutions are designed to be scalable and adaptable, using cutting-edge technologies to support growth and evolving business needs.",
      ),
      faq(
        "Can you help modernize our legacy systems with current technology?",
        "We offer expertise in modern frameworks and programming languages to upgrade and optimize legacy systems for enhanced performance and compatibility.",
      ),
      faq(
        "What makes your digital solutions stand out?",
        "Our solutions focus on innovation, scalability, and user-centric design, supported by a diverse stack of technologies and frameworks for tailored results.",
      ),
      faq(
        "How do you ensure robust security for applications and data?",
        "We follow industry best practices, leveraging secure programming and database management techniques to protect applications and sensitive data comprehensively.",
      ),
    ],
  },
  "service:professional-services": {
    ctaTitle: "Get in touch with our experts",
    ctaText:
      "Share your goals and timeline. We will respond with a practical scope, delivery model, and clear next step for your security or digital initiative.",
    benefitsTitle: "Key Benefits of Professional Services",
    benefits: [
      {
        title: "Cybersecurity Strategy & Implementation",
        description:
          "We provide Cybersecurity Strategy & Implementation services to enhance security frameworks, assessing risks and deploying effective solutions to safeguard assets.",
        actionLabel: "Download datasheet",
      },
      {
        title: "Network Design and Optimization",
        description:
          "We offer Network Design and Optimization services, analyzing infrastructure to create efficient, scalable networks that ensure reliable connectivity and performance.",
      },
      {
        title: "Automation and Digital Transformation",
        description:
          "We specialize in Automation and Digital Transformation, streamlining processes and integrating technologies to enhance operational efficiency and drive business growth.",
      },
      {
        title: "Threat Hunting and Mitigation",
        description:
          "We offer Threat Hunting and Mitigation services, proactively identifying and addressing threats to strengthen your organization's security posture and resilience.",
      },
      {
        title: "Cloud Solutions",
        description:
          "We provide Cloud Solutions to optimize your operations, offering scalable resources, enhanced security, and seamless integration for effective digital transformation.",
      },
    ],
    methodologyTitle: "Our Professional Services Methodology",
    methodology: [
      {
        step: "01",
        title: "Assessment & Discovery",
        text: "We begin by understanding your current infrastructure, security posture, and business objectives to identify gaps and opportunities for improvement.",
      },
      {
        step: "02",
        title: "Strategy Development",
        text: "Based on the assessment, we develop a customized strategy that aligns with your goals, focusing on risk mitigation, scalability, and efficiency.",
      },
      {
        step: "03",
        title: "Implementation & Integration",
        text: "Our expert team works seamlessly to implement solutions, integrating them into your existing systems with minimal disruption, ensuring smooth transitions.",
      },
      {
        step: "04",
        title: "Continuous Monitoring & Support",
        text: "Post-implementation, we provide ongoing monitoring, support, and optimization to ensure continuous alignment with your security and business needs.",
      },
      {
        step: "05",
        title: "Training & Empowerment",
        text: "We offer training and knowledge transfer so your teams are equipped to handle future challenges and maintain optimal system performance.",
      },
    ],
    faqs: [
      faq(
        "What is a red team exercise?",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
      faq(
        "What is the difference between pen testing and red teaming?",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
      faq(
        "How long does it take to conduct a red teaming operation?",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
      faq(
        "Could a red team operation cause any damage or disruption?",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
      faq(
        "What sets Fencesense apart from other cybersecurity service providers?",
        "Our approach combines deep expertise in cybersecurity with a tailored, proactive methodology, ensuring robust protection, regulatory compliance, and business continuity.",
      ),
      faq(
        "How can Fencesense help my organization achieve compliance with industry regulations?",
        "Fencesense provides end-to-end compliance consulting, including gap analysis, remediation plans, and ongoing compliance monitoring to help organizations meet industry-specific standards.",
      ),
      faq(
        "What types of cybersecurity assessments do you offer?",
        "We offer comprehensive assessments, including risk assessments, vulnerability assessments, penetration testing, and compliance audits to identify gaps and improve your cybersecurity posture.",
      ),
      faq(
        "Can Fencesense help with cloud security, and how does it work?",
        "Yes. We provide cloud security services including secure cloud architecture design, identity and access management, encryption, and compliance monitoring for your cloud infrastructure.",
      ),
      faq(
        "How does your incident response service work?",
        "We help you prepare for and respond to security breaches with custom response plans, support during incidents, and post-incident analysis to improve future readiness.",
      ),
      faq(
        "How do you ensure the privacy and confidentiality of sensitive data during projects?",
        "Fencesense employs strict confidentiality agreements and follows industry best practices, including encrypted communication and secure storage, to protect sensitive information.",
      ),
      faq(
        "Do you offer customized cybersecurity training for employees?",
        "Yes. We offer tailored cybersecurity awareness training to reduce human error and help employees recognize threats such as phishing and social engineering.",
      ),
      faq(
        "What industries do you specialize in for cybersecurity solutions?",
        "We provide services across finance, healthcare, government, retail, and manufacturing, customized to each industry's regulatory requirements and security challenges.",
      ),
      faq(
        "What is your approach to managing and mitigating risks in the enterprise environment?",
        "We employ a proactive, risk-based approach—assessing exposure, prioritizing threats, and implementing controls to reduce vulnerabilities and ongoing impact.",
      ),
      faq(
        "What are the costs associated with your professional services, and how do you price them?",
        "Pricing depends on scope and complexity. We offer fixed-fee projects, hourly rates, and subscription-based services, with a customized quote after initial consultation.",
      ),
    ],
  },
  "service:managed-security-services": {
    benefitsTitle: "Key benefits of managed security",
    benefits: [
      {
        title: "Continuous monitoring",
        items: ["SOC operations", "Alert triage", "Escalation to your owners", "Shift coverage"],
      },
      {
        title: "Threat intelligence",
        items: ["IP, domain, URL context", "Priority scoring", "Campaign tracking", "Analyst briefings"],
      },
      {
        title: "Incident support",
        items: ["Investigation assistance", "Containment guidance", "Communication templates", "Post-incident review"],
      },
      {
        title: "Reporting",
        items: ["Trend dashboards", "Monthly summaries", "Risk themes", "Improvement backlog"],
      },
    ],
    methodologyTitle: "Our managed security methodology",
    methodology: methodology("SOC scope"),
    faqs: [
      faq("Do we need to replace our internal team?", "No. Managed services can augment your team or operate as a standalone SOC function."),
      faq("What telemetry do you need?", "Requirements depend on scope; we document onboarding steps during discovery."),
      faq("How are incidents escalated?", "Runbooks define severity, contacts, and escalation paths agreed at kickoff."),
    ],
  },
  "service:on-demand-professional-expertise": {
    benefitsTitle: "Key benefits of on-demand expertise",
    benefits: [
      {
        title: "Flexible capacity",
        items: ["Short surge support", "Longer program staffing", "Specialist profiles", "Fast onboarding"],
      },
      {
        title: "Proven practitioners",
        items: ["Security architects", "Cloud engineers", "Network engineers", "SOC analysts"],
      },
      {
        title: "Project acceleration",
        items: ["Assessments", "Implementations", "Migrations", "Audit preparation"],
      },
      {
        title: "Knowledge transfer",
        items: ["Pairing with your staff", "Documentation", "Handover sessions", "Reduced dependency over time"],
      },
    ],
    methodologyTitle: "Our staffing methodology",
    methodology: methodology("resource need"),
    faqs: [
      faq("How quickly can someone join?", "Many requests are filled within days once role and clearance requirements are clear."),
      faq("Can experts work remotely?", "Yes. On-site support is available when the engagement requires it."),
      faq("Who manages the specialists?", "Fencesense provides oversight; day-to-day direction comes from your engagement lead."),
    ],
  },
  "service:cloud-services": {
    benefitsTitle: "Key benefits of cloud services",
    benefits: [
      {
        title: "Platform design",
        items: ["Landing zones", "Network topology", "Identity integration", "Service catalog"],
      },
      {
        title: "Security embedded",
        items: ["Workload protection", "Policy guardrails", "Secrets management", "Vulnerability management"],
      },
      {
        title: "Operations",
        items: ["Monitoring baselines", "Patch cadence", "Backup validation", "Cost reviews"],
      },
      {
        title: "Handover",
        items: ["Runbooks", "Training", "Admin transition", "Support model"],
      },
    ],
    methodologyTitle: "Our cloud services methodology",
    methodology: methodology("cloud program"),
    faqs: [
      faq("Can you secure multi-cloud estates?", "Yes. We design guardrails and monitoring that work across providers where you operate."),
      faq("Do you build landing zones from scratch?", "We can create new foundations or improve what you already run."),
      faq("How do you control cloud sprawl?", "Guardrails, tagging, and approval workflows are typical parts of cloud programs."),
    ],
  },
  "service:bas-penetration-testing": {
    ctaTitle: "Get in touch with our experts",
    ctaText:
      "Tell us about your environment and testing goals. We will propose scope, rules of engagement, and a delivery timeline that fits your risk and compliance needs.",
    benefitsTitle: "Key Benefits of BAS & Penetration Testing",
    benefits: [
      {
        title: "Proactive Threat Detection",
        description:
          "Identifies vulnerabilities before attackers exploit them, enabling organizations to strengthen defenses and reduce security risks effectively.",
      },
      {
        title: "Continuous Security Validation",
        description:
          "BAS provides ongoing assessment of defenses, ensuring that security controls are consistently effective against emerging threats and attack tactics.",
      },
      {
        title: "Real-World Attack Scenarios",
        description:
          "Simulates actual attack methods to test system resilience, uncover weaknesses, and prepare for potential real-world breaches.",
      },
      {
        title: "Enhanced Incident Response",
        description:
          "Provides insights to improve detection and response capabilities, reducing downtime and minimizing the impact of cyber incidents.",
      },
      {
        title: "Regulatory Compliance",
        description:
          "Assists in meeting industry standards like GDPR, HIPAA, and PCI-DSS by identifying gaps in security controls.",
      },
      {
        title: "Risk Prioritization",
        description:
          "Highlights the most critical vulnerabilities, enabling organizations to focus remediation efforts on areas that pose the highest risks.",
      },
      {
        title: "Improved Security Awareness",
        description:
          "Educates teams on attack methods and strengthens organizational security culture through detailed reports and actionable recommendations.",
      },
      {
        title: "Customizable Testing",
        description:
          "Tailored to your specific environment, ensuring targeted evaluations of systems, applications, and network infrastructure.",
      },
      {
        title: "Third-Party Validation",
        description:
          "Provides an unbiased assessment of your security posture, building confidence with stakeholders and enhancing overall cybersecurity strategy.",
      },
      {
        title: "Cost Savings",
        description:
          "Reduces long-term costs by preventing breaches and minimizing damage to reputation, operations, and compliance penalties.",
      },
    ],
    methodologyTitle: "Our BAS & Penetration Testing Methodology",
    methodology: [
      {
        step: "01",
        title: "Planning & Scoping",
        text: "We align on targets, rules of engagement, and success criteria with your stakeholders so testing matches business risk and compliance needs.",
      },
      {
        step: "02",
        title: "Vulnerability Assessment",
        text: "Structured assessment identifies misconfigurations and weaknesses across applications, infrastructure, and cloud assets.",
      },
      {
        step: "03",
        title: "Penetration Testing & BAS",
        text: "Manual and automated techniques simulate realistic attack paths while breach and attack simulation validates detective and preventive controls.",
      },
      {
        step: "04",
        title: "Reporting & Remediation",
        text: "Findings are prioritized by exploitability and business impact, with clear remediation guidance and optional retest to confirm fixes.",
      },
    ],
    faqs: [
      faq(
        "What is the difference between penetration testing and breach and attack simulation?",
        "Penetration testing focuses on finding and exploiting specific weaknesses in a point-in-time assessment. BAS continuously or periodically simulates attack techniques to validate that security controls detect and block threats as expected.",
      ),
      faq(
        "Will testing disrupt production systems?",
        "We agree rules of engagement and maintenance windows upfront. Intrusive tests use safe techniques where required, and high-risk actions are coordinated with your team.",
      ),
      faq(
        "How often should we run BAS and penetration tests?",
        "Many regulated and high-risk organizations test at least annually and after major changes. BAS can run more frequently to keep validation aligned with evolving threats.",
      ),
      faq(
        "Do you provide retesting after remediation?",
        "Yes. Retests confirm that critical findings were fixed effectively and give leadership evidence of closure.",
      ),
      faq(
        "Can testing help with GDPR, HIPAA, or PCI-DSS expectations?",
        "Structured VA/PT and BAS programs support control validation and gap identification that auditors and assessors commonly expect as part of a broader compliance program.",
      ),
    ],
  },
  "service:threat-hunting": {
    benefitsTitle: "Key benefits of threat hunting",
    benefits: [
      {
        title: "Hypothesis-led hunts",
        items: ["Technique-based searches", "Telemetry across estate", "Quiet intrusion detection", "Repeatable playbooks"],
      },
      {
        title: "Detection improvement",
        items: ["New use cases", "Tuning recommendations", "Gap closure", "SOC enablement"],
      },
      {
        title: "Clear outcomes",
        items: ["Findings briefings", "Benign vs malicious clarity", "Next-step actions", "Leadership summaries"],
      },
      {
        title: "Adversary alignment",
        items: ["Current TTP focus", "Sector-relevant threats", "Intel-driven hypotheses", "Continuous refinement"],
      },
    ],
    methodologyTitle: "Our threat hunting methodology",
    methodology: methodology("hunt program"),
    faqs: [
      faq("What data sources do hunts use?", "Endpoint, identity, network, and cloud telemetry you already collect—or we help you onboard gaps."),
      faq("How is hunting different from monitoring?", "Hunts proactively search for behaviors alerts may miss, based on current adversary activity."),
      faq("Do you leave behind detections?", "Yes. Sustainable detections and runbooks are a core deliverable."),
    ],
  },
  "service:breach-detection": {
    benefitsTitle: "Key Benefits of Breach Detection",
    benefits: [
      {
        title: "Continuous Monitoring",
        icon: "/solutions/security.png",
        description:
          "Real-time monitoring of network traffic, endpoints, and logs to detect unauthorized access and unusual activities.",
      },
      {
        title: "Incident Investigation",
        icon: "/solutions/network.png",
        description:
          "Detailed analysis to determine the root cause of breaches, assess the extent of impact, and identify compromised assets.",
      },
      {
        title: "Threat Intelligence Integration",
        icon: "/solutions/application.png",
        description:
          "Utilizes global threat databases and AI-driven insights to recognize advanced persistent threats (APTs).",
      },
      {
        title: "Rapid Response",
        icon: "/solutions/cloud.png",
        description:
          "Incident response capabilities to contain breaches quickly and minimize downtime.",
      },
    ],
    methodologyTitle: "Our breach detection methodology",
    methodology: methodology("detection program"),
    faqs: [
      faq("Can this work with our existing SIEM?", "Yes. We tune and extend detections in the platforms you operate."),
      faq("Do you help during live incidents?", "Investigation support and containment guidance are available as part of the service scope."),
      faq("How do you measure improvement?", "We track coverage, mean time to detect, and recurring false-positive themes over time."),
    ],
  },
};

export function getDetailContent(kind, slug) {
  return detailContent[`${kind}:${slug}`] ?? null;
}

export function buildFallbackContent(item) {
  return {
    benefitsTitle: `Key benefits of ${item.title.toLowerCase()}`,
    benefits: [
      {
        title: "What you gain",
        items: item.points,
      },
    ],
    methodologyTitle: "Our delivery methodology",
    methodology: methodology("engagement"),
    faqs: [
      faq(`What is included in ${item.title}?`, item.summary),
      faq("How do we get started?", "Share your goals and timeline—we will respond with a scoped plan and next steps."),
      faq("Can Fencesense work with our internal teams?", "Yes. We design engagements to complement the people and tools you already have."),
    ],
  };
}
