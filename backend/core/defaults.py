"""Default marketing copy seeded into SiteSettings.pages (editable in Django Admin)."""

DEFAULT_PAGES = {
    "home": {
        "heroLine1": "Your Security, Our Passion",
        "heroLine2": "Welcome to Fencesense",
        "heroBody": (
            "Fencesense Technologies Pvt. Ltd. specializes in cybersecurity and digital solutions, offering network "
            "delivery, automation, and transformation, along with threat intelligence, cloud security, SOC services, "
            "and incident response for data protection."
        ),
        "aboutEyebrow": "About Fencesense",
        "aboutTitle": "Leading the charge in cyber defence innovation.",
        "aboutBody": (
            "Fencesense Technologies Pvt. Ltd. helps organisations secure networks, cloud platforms, and applications "
            "with consulting, managed SOC, and specialist delivery. We stay after launch so controls keep working as "
            "the business changes."
        ),
        "testimonialsKicker": "Testimonial",
        "testimonialsTitle": "Trusted by Our Customers",
        "customersMarqueeLabel": "Our Customers",
        "focusAreas": [
            {"title": "Cyber Security", "text": "Monitoring, threat intelligence, and incident response aligned to your estate."},
            {"title": "Network", "text": "Design and operations that keep connectivity reliable when pressure hits."},
            {"title": "Application Delivery", "text": "Performance, deployment, and protection for business-critical apps."},
            {"title": "Cloud & IAM", "text": "Platforms and access controls that leadership can audit and teams can run."},
        ],
    },
    "about": {
        "title": "About Us",
        "heroLede": (
            "At Fencesense Technologies Pvt Ltd, we provide cutting-edge cybersecurity, network management, application "
            "delivery, DevOps, and cloud security solutions, helping businesses navigate complex digital landscapes with "
            "tailored strategies for success."
        ),
        "shieldKicker": "Leading the charge in cyber defence innovation",
        "shieldTitle": "Digital Shield*",
        "shieldLede": (
            "At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge "
            "cybersecurity solutions ensures your business remains protected against evolving threats."
        ),
        "impactTitle": "Security monitoring and malware protection for businesses.",
        "impactBody": (
            "At Fencesense, we are committed to securing your digital world. Our expertise in cutting-edge "
            "cybersecurity solutions ensures your business remains protected against evolving threats."
        ),
        "capabilities": [
            "Cybersecurity Solutions",
            "Network Solution",
            "Application Delivery Solution",
            "On Demand Resource",
            "Automation & Orchestration",
        ],
    },
}
