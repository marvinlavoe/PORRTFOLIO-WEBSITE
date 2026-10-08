from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable
from reportlab.lib.colors import HexColor

out_path = r'D:\MY WORK\MY MINI PROJECT\PORRTFOLIO WEBSITE\portfolio-v2\public\marvin-lavoe-resume.pdf'
doc = SimpleDocTemplate(out_path, pagesize=letter, leftMargin=0.8*inch, rightMargin=0.8*inch, topMargin=0.7*inch, bottomMargin=0.7*inch)
styles = getSampleStyleSheet()

name_style = ParagraphStyle('Name', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=HexColor('#1b1b1b'), spaceAfter=8)
section_style = ParagraphStyle('Section', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=HexColor('#1b1b1b'), spaceBefore=12, spaceAfter=6)
body_style = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=9.5, leading=13, textColor=HexColor('#2a2a2a'))
small_style = ParagraphStyle('Small', parent=styles['BodyText'], fontName='Helvetica', fontSize=8.5, leading=11, textColor=HexColor('#4d4d4d'))

story = []
story.append(Paragraph('MARVIN LAVOE', name_style))
story.append(Paragraph('Product Designer | UI/UX Designer | Software Developer', body_style))
story.append(Paragraph('Ghana • 055 258 1864 • phiking451@gmail.com', small_style))
story.append(Paragraph('linkedin.com/in/marvin-lavoe • github.com/marvinlavoe', small_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph('PROFESSIONAL SUMMARY', section_style))
story.append(Paragraph('Product Designer and UI/UX Designer with a BTech in Computer Technology and hands-on experience designing digital products for real users and organizations. Experienced in user research, personas, user journeys, information architecture, wireframing, prototyping, usability testing, design systems, responsive design, and developer handoff. Currently a UI/UX & Product Designer at the Ministry of Youth Development and Empowerment, contributing to the design and testing of enterprise digital solutions and workflows.', body_style))
story.append(Spacer(1, 0.08*inch))

story.append(Paragraph('EXPERIENCE', section_style))
story.append(Paragraph('UI/UX & Product Designer — National Service | January 2026 – Present', body_style))
story.append(Paragraph('Ministry of Youth Development and Empowerment', small_style))
story.append(ListFlowable([
    'Design user interfaces and digital experiences for enterprise applications and workflow-management systems.',
    'Conduct requirements analysis and translate organizational needs into practical product and user-experience solutions.',
    'Create user flows, wireframes, prototypes, and high-fidelity interfaces in Figma.',
    'Contribute to the design of the Smart Workplace / Ministry ERP, supporting the digitalization of organizational workflows.',
    'Improve usability, navigation, and information architecture through user-centered design principles.'
], bulletType='bullet', bulletFontName='Helvetica', bulletFontSize=8.5, leftIndent=18, spaceAfter=6))
story.append(Paragraph('Intern | 2023 – 2024', body_style))
story.append(Paragraph('Wise Ant Publications', small_style))
story.append(ListFlowable([
    'Contributed to the development of a Sales Management application using Flutter and Firebase.',
    'Supported software and IT-related activities and assisted with customer engagement and technology tasks.'
], bulletType='bullet', bulletFontName='Helvetica', bulletFontSize=8.5, leftIndent=18, spaceAfter=8))

story.append(Paragraph('SELECTED PROJECTS', section_style))
story.append(Paragraph('Smart Workplace / Ministry ERP | Product Design · UI/UX · Enterprise Software', body_style))
story.append(Paragraph('Designed experiences for an enterprise platform that digitalizes organizational workflows, translating business processes into user flows and interfaces.', body_style))
story.append(Paragraph('ElectroManager | Product Design · Flutter · Firebase · GetX', body_style))
story.append(Paragraph('Designed and developed a complete mobile business-management app, including UX and interface design across multiple business workflows.', body_style))
story.append(Paragraph('Sales Management App | Flutter · Firebase', body_style))
story.append(Paragraph('Developed a mobile sales-management app with real-time data storage and authentication, and designed its interfaces and workflows.', body_style))

story.append(Paragraph('EDUCATION', section_style))
story.append(Paragraph('BTech, Computer Technology | 2025', body_style))
story.append(Paragraph('Kumasi Technical University | GPA: 4.0 / 5.0', small_style))
story.append(Paragraph('WASSCE — General Science | 2018', body_style))
story.append(Paragraph('Winneba Secondary School', small_style))

story.append(Paragraph('CERTIFICATIONS', section_style))
story.append(Paragraph('Agile Scrum Methodology — Leanicon Technology, 2026', body_style))
story.append(Paragraph('Data Analytics with Power BI — Ghana-India Kofi Annan Centre of Excellence in ICT (GI-KACE), 2024', body_style))

story.append(Paragraph('SKILLS', section_style))
story.append(Paragraph('User Research • User Interviews • User Personas • User Journeys • Information Architecture • User Flows • Wireframing • Prototyping • Usability Testing • Design Systems • Responsive Design • Mobile App Design • Web & Desktop Design • Design-to-Code • Developer Handoff', body_style))

story.append(Paragraph('TOOLS', section_style))
story.append(Paragraph('Figma • Adobe Photoshop • Flutter • Dart • Python • C++ • Firebase • GetX • ESP32 • Arduino • MQTT • Git • GitHub', body_style))

doc.build(story)
print(out_path)
