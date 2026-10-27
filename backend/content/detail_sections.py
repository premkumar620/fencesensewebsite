"""Build API detailContent from admin rows or legacy JSON."""


def _benefit_dict(block):
    payload = {"title": block.title}
    icon = block.resolved_icon()
    if icon:
        payload["icon"] = icon
    if block.description:
        payload["description"] = block.description
    items = block.bullet_items()
    if items:
        payload["items"] = items
    if block.action_label:
        payload["actionLabel"] = block.action_label
    return payload


def _methodology_dict(step):
    return {"step": step.step, "title": step.title, "text": step.text}


def _faq_dict(faq):
    return {"question": faq.question, "answer": faq.answer}


def build_service_detail_content(service):
    benefits = [_benefit_dict(b) for b in service.benefit_blocks.all()]
    methodology = [_methodology_dict(s) for s in service.methodology_steps.all()]
    faqs = [_faq_dict(f) for f in service.faq_items.all()]

    if benefits or methodology or faqs:
        payload = {}
        if benefits:
            payload["benefitsTitle"] = service.benefits_title or f"Key benefits of {service.title.lower()}"
            payload["benefits"] = benefits
        if service.methodology_title:
            payload["methodologyTitle"] = service.methodology_title
        elif methodology:
            payload["methodologyTitle"] = "Our delivery methodology"
        if methodology:
            payload["methodology"] = methodology
        if faqs:
            payload["faqs"] = faqs
        if service.cta_title:
            payload["ctaTitle"] = service.cta_title
        if service.cta_text:
            payload["ctaText"] = service.cta_text
        return payload

    return service.detail_content or {}


def build_solution_detail_content(solution):
    benefits = [_benefit_dict(b) for b in solution.benefit_blocks.all()]
    methodology = [_methodology_dict(s) for s in solution.methodology_steps.all()]
    faqs = [_faq_dict(f) for f in solution.faq_items.all()]

    if benefits or methodology or faqs:
        payload = {}
        if benefits:
            payload["benefitsTitle"] = solution.benefits_title or f"Key benefits of {solution.title.lower()}"
            payload["benefits"] = benefits
        if solution.methodology_title:
            payload["methodologyTitle"] = solution.methodology_title
        elif methodology:
            payload["methodologyTitle"] = "Our delivery methodology"
        if methodology:
            payload["methodology"] = methodology
        if faqs:
            payload["faqs"] = faqs
        if solution.cta_title:
            payload["ctaTitle"] = solution.cta_title
        if solution.cta_text:
            payload["ctaText"] = solution.cta_text
        return payload

    return solution.detail_content or {}


def _bullets_from_items(items):
    if not items:
        return ""
    return "\n".join(str(item) for item in items)


def import_detail_json_to_service(service, data):
    if not data:
        return

    service.benefits_title = data.get("benefitsTitle") or service.benefits_title
    service.methodology_title = data.get("methodologyTitle") or service.methodology_title
    service.cta_title = data.get("ctaTitle") or service.cta_title
    service.cta_text = data.get("ctaText") or service.cta_text
    service.save(
        update_fields=["benefits_title", "methodology_title", "cta_title", "cta_text"],
    )

    service.benefit_blocks.all().delete()
    for index, row in enumerate(data.get("benefits") or []):
        if not isinstance(row, dict):
            continue
        ServiceBenefit = service.benefit_blocks.model
        ServiceBenefit.objects.create(
            service=service,
            title=row.get("title") or f"Benefit {index + 1}",
            description=row.get("description") or "",
            bullets=_bullets_from_items(row.get("items")),
            icon=row.get("icon") or "",
            action_label=row.get("actionLabel") or "",
            sort_order=index,
        )

    service.methodology_steps.all().delete()
    for index, row in enumerate(data.get("methodology") or []):
        if not isinstance(row, dict):
            continue
        ServiceStep = service.methodology_steps.model
        ServiceStep.objects.create(
            service=service,
            step=row.get("step") or f"{index + 1:02d}",
            title=row.get("title") or "",
            text=row.get("text") or "",
            sort_order=index,
        )

    service.faq_items.all().delete()
    for index, row in enumerate(data.get("faqs") or []):
        if not isinstance(row, dict):
            continue
        ServiceFaq = service.faq_items.model
        ServiceFaq.objects.create(
            service=service,
            question=row.get("question") or "",
            answer=row.get("answer") or "",
            sort_order=index,
        )


def import_detail_json_to_solution(solution, data):
    if not data:
        return

    solution.benefits_title = data.get("benefitsTitle") or solution.benefits_title
    solution.methodology_title = data.get("methodologyTitle") or solution.methodology_title
    solution.cta_title = data.get("ctaTitle") or solution.cta_title
    solution.cta_text = data.get("ctaText") or solution.cta_text
    solution.save(
        update_fields=["benefits_title", "methodology_title", "cta_title", "cta_text"],
    )

    solution.benefit_blocks.all().delete()
    for index, row in enumerate(data.get("benefits") or []):
        if not isinstance(row, dict):
            continue
        SolutionBenefit = solution.benefit_blocks.model
        SolutionBenefit.objects.create(
            solution=solution,
            title=row.get("title") or f"Benefit {index + 1}",
            description=row.get("description") or "",
            bullets=_bullets_from_items(row.get("items")),
            icon=row.get("icon") or "",
            action_label=row.get("actionLabel") or "",
            sort_order=index,
        )

    solution.methodology_steps.all().delete()
    for index, row in enumerate(data.get("methodology") or []):
        if not isinstance(row, dict):
            continue
        SolutionStep = solution.methodology_steps.model
        SolutionStep.objects.create(
            solution=solution,
            step=row.get("step") or f"{index + 1:02d}",
            title=row.get("title") or "",
            text=row.get("text") or "",
            sort_order=index,
        )

    solution.faq_items.all().delete()
    for index, row in enumerate(data.get("faqs") or []):
        if not isinstance(row, dict):
            continue
        SolutionFaq = solution.faq_items.model
        SolutionFaq.objects.create(
            solution=solution,
            question=row.get("question") or "",
            answer=row.get("answer") or "",
            sort_order=index,
        )
