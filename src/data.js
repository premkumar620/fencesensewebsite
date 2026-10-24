export const phone = "9650731119";
export const phoneHref = "tel:+919650731119";
export const email = "info@fencesense.com";
export const cin = "U62099DL2023PTC419464";
export const addressLines = [
  "Plot No. 44-A/2, KH-46B",
  "Somesh Vihar, Chhawla Extension",
  "Chhawla, South West Delhi",
  "New Delhi, Delhi 110071",
];
export const addressText = addressLines.join(", ");
export const mapsQuery = `${addressText}, India`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&hl=en&z=16&output=embed`;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Instagram", href: "https://www.instagram.com/fencesense_technologies/" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/fencesense-technologies" },
  { label: "YouTube", href: "https://www.youtube.com/@fencesense" },
];

export const partnerLogos = Array.from({ length: 17 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return `/partners/${id}.png`;
});

export const customerLogos = ["01", "02", "03"].map((id) => `/customers/${id}.png`);

export const stats = [
  { value: 10, suffix: "k", label: "Satisfied Clients" },
  { value: 20, suffix: "+", label: "Security Consultants" },
  { value: 5, suffix: "+", label: "Active Engagements" },
  { value: 2, suffix: "+", label: "Years of Experience" },
];

export const offerings = [
  "Cybersecurity Solutions",
  "Network Management & Solutions",
  "Application Delivery Solutions",
  "DevOps Services",
  "Cloud Infrastructure Management",
  "Cloud Security",
  "Digital Solutions",
];

export const services = [
  {
    slug: "professional-services",
    title: "Professional Services",
    heroImage: "/services/banners/professional-services.png",
    kicker: "Consulting, implementation, and support",
    summary:
      "Fencesense Professional Services offers expert solutions in cybersecurity, network management, application delivery, cloud security, and DevOps. Our team provides tailored consulting, implementation, and support to help businesses optimize digital infrastructure, enhance security, and streamline operations.",
    paragraphs: [
      "Fencesense delivers expert solutions in cybersecurity, network management, application delivery, cloud security, and DevOps. The team provides tailored consulting, implementation, and support so businesses can tighten security and simplify day-to-day operations.",
      "Engagements cover CNAPP, CSPM, network security, EDR, and application security. We stay with you from the first design conversation through rollout and handover, so the work fits the tools and people you already have.",
    ],
    points: [
      "Security architecture and control design",
      "Implementation across cloud, network, and endpoint",
      "Operating guidance for internal teams",
      "Practical recommendations your staff can maintain",
    ],
  },
  {
    slug: "managed-security-services",
    title: "Managed Security Services",
    heroImage: "/services/banners/managed-security-services.png",
    kicker: "SOC, monitoring, and response",
    summary:
      "A managed security function that watches the environment, investigates alerts, and helps you respond before an incident spreads.",
    paragraphs: [
      "Fencesense managed security services give organisations a working SOC without having to build one from scratch. We monitor critical systems, triage alerts, and bring threat intelligence into the decisions your team makes each day.",
      "Coverage includes proactive cybersecurity, managed SOC operations, and threat intelligence for IPs, domains, and URLs. The goal is steady visibility and a clear path from detection to containment.",
    ],
    points: [
      "Continuous monitoring and alert triage",
      "Threat intelligence for IPs, domains, and URLs",
      "Incident coordination with your internal owners",
      "Regular reporting on what was seen and what changed",
    ],
  },
  {
    slug: "on-demand-professional-expertise",
    title: "On-Demand Professional Expertise",
    heroImage: "/services/banners/on-demand-professional-expertise.png",
    kicker: "Specialists when the workload spikes",
    summary:
      "Senior security, cloud, and network specialists you can bring in for a project, a gap, or a stretch of extra demand.",
    paragraphs: [
      "Some work does not need a full-time hire. Fencesense places experienced consultants alongside your team for assessments, implementations, migrations, and surge support.",
      "You get people who have already delivered cybersecurity, network, application delivery, and cloud work, and who can join an engagement without a long ramp-up.",
    ],
    points: [
      "Short and long engagements",
      "Architecture, engineering, and analyst profiles",
      "Support during audits, rollouts, and incidents",
      "Knowledge transfer before we step back",
    ],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    heroImage: "/services/banners/cloud-services.png",
    kicker: "Design, protect, and run the cloud",
    summary:
      "Cloud architecture, security, and operations for teams that need the environment to stay reliable as it grows.",
    paragraphs: [
      "Fencesense helps businesses design cloud platforms that are easier to secure and easier to operate. We work across architecture, data protection, and day-to-day cloud management.",
      "That includes landing zones, workload protection, and the guardrails that keep new projects from drifting outside the standards you set.",
    ],
    points: [
      "Cloud architecture and landing zones",
      "Workload and platform protection",
      "Identity, network, and data controls",
      "Operational handover for internal teams",
    ],
  },
  {
    slug: "bas-penetration-testing",
    title: "BAS & Penetration Testing",
    heroImage: "/services/banners/bas-penetration-testing.png",
    kicker: "Find the gaps before someone else does",
    summary:
      "Breach and attack simulation plus penetration testing, so you can see which controls hold and which patches cannot wait.",
    paragraphs: [
      "Fencesense tests the paths an attacker would actually use. Penetration testing and breach and attack simulation show where controls fail, which exposures are reachable, and what to fix first.",
      "Clients use the results to close critical gaps, confirm that detection works, and give leadership a clear picture of residual risk.",
    ],
    points: [
      "External and internal penetration testing",
      "Breach and attack simulation against live controls",
      "Findings ranked by how they can be used",
      "Retest support after remediation",
    ],
  },
  {
    slug: "threat-hunting",
    title: "Threat Hunting",
    heroImage: "/services/banners/threat-hunting.png",
    kicker: "Look for what alerts miss",
    summary:
      "Hypothesis-led hunts across endpoints, identity, and cloud so quiet intrusions do not sit unnoticed.",
    paragraphs: [
      "Alerts only show what a rule already knows. Threat hunting at Fencesense starts from current adversary behaviour and looks for traces in the telemetry you already collect.",
      "Each hunt ends with what we found, what was benign, and which detections or gaps should change so the same pattern is caught next time.",
    ],
    points: [
      "Hunts across endpoint, identity, and cloud telemetry",
      "Findings tied to specific techniques",
      "Detection improvements your SOC can keep",
      "Briefings written for both analysts and leadership",
    ],
  },
  {
    slug: "breach-detection",
    title: "Breach Detection",
    heroImage: "/services/banners/breach-detection.png",
    kicker: "See an intrusion while it is still small",
    summary:
      "Detection content, telemetry review, and response support aimed at catching a breach early and limiting the blast radius.",
    paragraphs: [
      "Fencesense helps organisations notice attacker activity sooner. We review the signals you have, tighten detection for the paths that matter, and support the first hours of an investigation.",
      "The work sits alongside managed SOC services and incident response, so detection is connected to people who can act on it.",
    ],
    points: [
      "Detection coverage review",
      "Use-case tuning for high-risk paths",
      "Investigation support when something fires",
      "Clear next steps for containment",
    ],
  },
];

export const solutions = [
  {
    slug: "security-solution",
    title: "Security Solution",
    icon: "/solutions/security.png",
    heroImage: "/solutions/banners/security-solution.jpg",
    kicker: "Protection that keeps up with the threat",
    summary:
      "At Fencesense Technologies Pvt. Ltd., we deliver comprehensive security solutions to safeguard businesses against evolving cyber threats. Our offerings include proactive cybersecurity, managed SOC services, and advanced threat intelligence for IPs, domains, and URLs.",
    paragraphs: [
      "At Fencesense Technologies Pvt. Ltd., we deliver security solutions that help businesses stand up to changing cyber threats. Offerings include proactive cybersecurity, managed SOC services, and threat intelligence for IPs, domains, and URLs.",
      "We work across cloud security, network security, and application protection so operations stay available while risk is reduced. Whether the estate is on-premises, cloud, or hybrid, the design is matched to the way the business runs.",
    ],
    points: [
      "Managed SOC and ongoing monitoring",
      "Threat intelligence for IPs, domains, and URLs",
      "Cloud, network, and application protection",
      "Designs for on-premises and hybrid environments",
    ],
  },
  {
    slug: "network-solution",
    title: "Network Solution",
    icon: "/solutions/network.png",
    heroImage: "/solutions/banners/network-solution.jpg",
    kicker: "Networks that stay fast and contained",
    summary:
      "Fencesense designs and manages enterprise networks so connectivity stays reliable, traffic is easier to defend, and an incident cannot spread unchecked across the estate.",
    paragraphs: [
      "Fencesense designs and hardens enterprise networks for organisations that cannot afford brittle connectivity or flat trust. We look at architecture, segmentation, secure remote access, and the operational habits that keep the network understandable.",
      "The result is a network that performs under normal load and limits how far an incident can travel when something goes wrong.",
    ],
    points: [
      "Architecture and segmentation",
      "Secure access for users and sites",
      "Visibility into critical paths",
      "Changes planned around uptime",
    ],
  },
  {
    slug: "application-delivery-solution",
    title: "Application Delivery Solution",
    icon: "/solutions/application.png",
    heroImage: "/solutions/banners/application-delivery-solution.jpg",
    kicker: "Applications that stay available",
    summary:
      "At Fencesense Technologies Pvt. Ltd., we provide tailored application delivery solutions that keep applications secure, fast, and always available. Our work covers performance, seamless deployments, and the controls that protect traffic on the way in.",
    paragraphs: [
      "At Fencesense Technologies Pvt. Ltd., we provide application delivery solutions so applications stay secure, fast, and available. The work covers performance, smoother deployments, and the controls that protect traffic on the way to the application.",
      "We align load handling, release practices, and security checks so a new version does not become an outage or an open door.",
    ],
    points: [
      "Performance and availability design",
      "Safer, repeatable deployments",
      "Protection in front of critical apps",
      "Delivery paths that operations can support",
    ],
  },
  {
    slug: "identity-access-management-iam",
    title: "Identity & Access Management (IAM)",
    icon: "/solutions/iam.png",
    heroImage: "/solutions/banners/identity-access-management-iam.jpeg",
    kicker: "The right access, and nothing extra",
    summary:
      "We help organisations put authentication, identity governance, and privileged access on a footing they can audit, so people and services get only the access they need.",
    paragraphs: [
      "Identity is where most modern attacks begin. Fencesense helps organisations put authentication, lifecycle, and privileged access on a footing they can audit and operate.",
      "We cover workforce and admin access, joining cloud and on-premises directories, and the reviews that keep old accounts from lingering.",
    ],
    points: [
      "Single sign-on and strong authentication",
      "Joiner, mover, and leaver processes",
      "Privileged access control",
      "Access reviews leadership can follow",
    ],
  },
  {
    slug: "cloud-solution",
    title: "Cloud Solution",
    icon: "/solutions/cloud.png",
    heroImage: "/solutions/banners/cloud-solution.png",
    kicker: "Secure platforms that can scale",
    summary:
      "Fencesense Technologies Pvt. Ltd. offers advanced cloud solutions to help businesses optimize, secure, and scale digital operations. We design robust architectures, protect data, and manage cloud environments as they grow.",
    paragraphs: [
      "Fencesense Technologies Pvt. Ltd. offers cloud solutions that help businesses run digital operations with more control. We design architectures, protect data, and help teams manage cloud environments as they grow.",
      "Security is part of the design, not a layer added after the migration. Guardrails, identity, and workload protection are planned with the platform itself.",
    ],
    points: [
      "Robust cloud architecture",
      "Data protection and residency choices",
      "Environment management and guardrails",
      "A path from pilot to steady operations",
    ],
  },
  {
    slug: "digital-solutions",
    title: "Digital Solutions",
    icon: "/solutions/digital.png",
    heroImage: "/solutions/banners/digital-solutions.png",
    kicker: "Experiences, commerce, and automation",
    summary:
      "Our digital solutions cover web and mobile UI/UX design, eCommerce development, application consulting, network delivery, and automation, built to improve digital experience and support the way the business actually runs.",
    paragraphs: [
      "Our digital solutions cover web and mobile UI/UX design, eCommerce development, application consulting, network delivery, and automation. The aim is work that people can use and that the business can grow.",
      "We connect the experience on the screen with the delivery and security underneath it, so a new product does not outrun the platform it sits on.",
    ],
    points: [
      "Web and mobile UI/UX",
      "eCommerce development",
      "Application consulting",
      "Network delivery and automation",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Fencesense Technologies consistently delivers exceptional solutions, enhancing our cybersecurity, network performance, and cloud security. Their expertise and support are invaluable.",
    name: "CIO",
    role: "CIO - NBFC",
    logo: "/testimonials/ever-energy.svg",
  },
  {
    quote:
      "We are thoroughly impressed with Fencesense's proactive approach to security. Their team has consistently provided us with reliable solutions and exceptional support.",
    name: "Amit Garg",
    role: "System Administrator - Xander Finance Pvt Ltd",
    logo: "/testimonials/plux.svg",
  },
  {
    quote:
      "Fencesense has been a game-changer for our company's security. Their expert advice and seamless service have made us feel confident in our digital protection.",
    name: "North East",
    role: "System Administrator - Xander Finance Pvt Ltd",
    logo: "/testimonials/north-east.webp",
  },
  {
    quote:
      "Fencesense did a great job in assessing the vulnerabilities and conducting penetration tests. It helped us in addressing critical patches that could have caused security flaws. The Fencesense team is professional, efficient and easy to work with.",
    name: "Hiren Desai",
    role: "Assistant Vice President - SBI SG Global Securities Services Pvt Ltd",
    logo: "/testimonials/sbisg.png",
  },
];

export const posts = [
  {
    slug: "cloud-workload-protection",
    title: "Cloud Workload Protection (CWP)",
    date: "19 November, 2024",
    day: "19",
    month: "NOV",
    author: "Admin",
    image: "/blogs/cwp.png",
    excerpt:
      "Cloud Workload Protection is how organisations safeguard applications, virtual machines, containers, and serverless functions running in the cloud.",
    paragraphs: [
      "Cloud Workload Protection (CWP) is a security approach designed to safeguard cloud-hosted workloads, such as applications, virtual machines, containers, and serverless functions, from potential cyber threats.",
      "As organisations adopt cloud environments, CWP becomes part of keeping visibility, control, and protection over infrastructure that moves and scales. Without it, new workloads appear faster than the team can review them.",
      "Fencesense helps teams put workload protection next to architecture and operations, so coverage follows the estate instead of lagging a quarter behind it.",
    ],
  },
  {
    slug: "crowdstrike-cnapp",
    title: "CrowdStrike CNAPP",
    date: "19 November, 2024",
    day: "19",
    month: "NOV",
    author: "Admin",
    image: "/blogs/cnapp.png",
    excerpt:
      "CrowdStrike's Cloud-Native Application Protection Platform brings workload protection, visibility, and compliance into one view of cloud-native applications.",
    paragraphs: [
      "CrowdStrike's Cloud-Native Application Protection Platform (CNAPP) is a security platform for cloud-native applications across their lifecycle. It brings several security functions into one place so teams are not stitching together a separate tool for every question.",
      "A unified platform pulls workload protection, vulnerability management, and compliance monitoring together. That reduces the overhead of running many consoles that do not share context.",
      "Visibility extends across cloud workloads, containers, and serverless functions, which is what teams need when they are trying to see which exposures are real. Detection and response can then use threat intelligence and machine learning to surface activity closer to the moment it happens.",
      "CNAPP also supports regulatory work by watching the environment continuously and pointing out where compliance is drifting. For organisations standardising on CrowdStrike, it is a practical way to tighten cloud security without adding another disconnected programme.",
    ],
  },
  {
    slug: "vmware-vcenter-server-flaw",
    title: "VMware Discloses Exploitation of Hard-to-Fix vCenter Server Flaw",
    date: "12 November, 2024",
    day: "12",
    month: "NOV",
    author: "Admin",
    image: "/blogs/vmware.png",
    excerpt:
      "VMware confirmed that a difficult-to-fix vCenter Server vulnerability, first shown at a hacking contest, is being used in live attacks.",
    paragraphs: [
      "A difficult-to-fix vulnerability, first revealed at a Chinese hacking contest five months earlier, is being exploited in the wild, VMware confirmed. The company updated its VMSA-2024-0019 bulletin to acknowledge the live attacks and asked customers to prioritise the available fixes.",
      "For teams running vCenter, the practical step is to identify exposed servers, apply the vendor fix, and watch for signs of misuse while the change rolls out. Fencesense tracks advisories like this so clients can patch what is being used, not only what is newly published.",
    ],
  },
];
