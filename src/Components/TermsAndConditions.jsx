// src/TermsAndConditions.js
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsAndConditions = () => {
  const headerStyle = {
    color: '#ac199f',
    fontWeight: 'bold',
  };

  const linkStyle = {
    color: '#ac199f',
    textDecoration: 'underline',
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h1" className="text-center" style={{ backgroundColor: '#ac199f', color: 'white' }}>
          Terms and Conditions
        </Card.Header>
        <Card.Body>
          <section>
            <h2 style={headerStyle}>1. Definitions</h2>
            <ul>
              <li><strong>“Company”</strong> refers to Arivubodhi Shikshak Talent LLP.</li>
              <li><strong>“Platform”</strong> includes the website [Insert Website URL] and the mobile application under the brand “Pariksha Shikshak.”</li>
              <li><strong>“User”</strong> refers to any individual or entity accessing or using the Platform, including but not limited to schools, teachers, students, and parents.</li>
              <li><strong>“Services”</strong> refer to the provision of digital question papers, exam evaluation services, and related educational support.</li>
              <li><strong>“Data”</strong> refers to personal information collected from Users for service enhancement and marketing purposes.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>2. User Eligibility & Registration</h2>
            <ul>
              <li>To access certain features of the Platform, Users must complete the registration process by providing accurate and up-to-date information.</li>
              <li>Users must be at least 18 years of age or have legal parental/guardian consent to use the Platform.</li>
              <li>The Company reserves the right to verify User identity and suspend or terminate accounts with incorrect or misleading information.</li>
              <li>Users are responsible for maintaining the confidentiality of their login credentials and any activities conducted under their account.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>3. Scope of Services</h2>
            <h5 style={headerStyle}>3.1 Web Services</h5>
            <ul>
              <li>The Platform provides teachers, schools, students, and parents access to government-approved question papers for educational assessments.</li>
              <li>Schools and teachers may avail themselves of exam evaluation services.</li>
              <li>The Company reserves the right to modify or discontinue any part of the Services without prior notice.</li>
            </ul>

            <h5 style={headerStyle}>3.2 Mobile Application</h5>
            <ul>
              <li>Users can download and access question papers via the mobile app.</li>
              <li>The app may offer real-time notifications and updates regarding assessments.</li>
              <li>The Company may introduce new features, subject to compliance with these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>4. Acceptable Use Policy</h2>
            <ul>
              <li>Users shall not misuse the Platform for unlawful, fraudulent, or unauthorized purposes.</li>
              <li>Users shall not copy, distribute, or resell any content provided by the Platform without prior written consent from the Company.</li>
              <li>Any attempt to hack, modify, disrupt, or exploit the Platform will result in immediate termination of access and possible legal action.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>5. Intellectual Property Rights</h2>
            <ul>
              <li>All content, including but not limited to question papers, assessments, software, and proprietary materials, is the sole intellectual property of the Company.</li>
              <li>Unauthorized reproduction, modification, distribution, or commercial use of Platform content is strictly prohibited and may result in legal consequences.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>6. Data Privacy & User Consent</h2>
            <ul>
              <li>The Company collects and processes User Data to improve services and for future marketing initiatives.</li>
              <li>Data collection and processing comply with applicable laws, including the Indian IT Act 2000 and relevant data protection regulations.</li>
              <li>Users may request the deletion of their Data by submitting a formal request to <a href="mailto:ganesh.m@shikshakworld.com" style={linkStyle}>ganesh.m@shikshakworld.com</a>.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>7. Payment, Fees & Refund Policy</h2>
            <ul>
              <li>Certain premium features of the Platform may be subject to charges as outlined in the pricing structure.</li>
              <li>Payments must be made using authorized methods, and all transactions are non-refundable unless stated otherwise.</li>
              <li>Refund requests, if applicable, will be processed in accordance with the Company’s refund policy.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>8. Limitation of Liability</h2>
            <ul>
              <li>The Platform and Services are provided on an “AS IS” basis without warranties of any kind.</li>
              <li>The Company shall not be liable for any loss, damage, or disruption arising from service interruptions, technical failures, or unauthorized access.</li>
              <li>Users acknowledge that reliance on any content or services provided by the Platform is at their own risk.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>9. Third-Party Links & Services</h2>
            <ul>
              <li>The Platform may contain links to third-party websites or services.</li>
              <li>The Company does not endorse, control, or assume responsibility for any third-party content, products, or services.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>10. Termination & Suspension of Services</h2>
            <ul>
              <li>The Company reserves the right to suspend or terminate a User’s access to the Platform without prior notice for violations of these Terms.</li>
              <li>Users may voluntarily deactivate their accounts by contacting <a href="mailto:ganesh.m@shikshakworld.com" style={linkStyle}>ganesh.m@shikshakworld.com</a>.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>11. Governing Law & Dispute Resolution</h2>
            <ul>
              <li>These Terms shall be governed and construed in accordance with the laws of India, specifically under the jurisdiction of Karnataka.</li>
              <li>Any disputes shall be first attempted to be resolved through arbitration before any legal proceedings are initiated.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>12. Modifications & Updates</h2>
            <ul>
              <li>The Company reserves the right to update or modify these Terms at its sole discretion.</li>
              <li>Significant changes will be communicated to Users through email or Platform notifications.</li>
              <li>Continued use of the Platform after modifications indicates acceptance of the revised Terms.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>13. Contact Information</h2>
            <p>
              For queries, support, or complaints, Users can contact:
              <br /><br />
              <strong>Arivubodhi Shikshak Talent LLP</strong>
              <br />
              Email: <a href="mailto:ganesh.m@shikshakworld.com" style={linkStyle}>ganesh.m@shikshakworld.com</a>
              <br />
              Phone: 7337875208
            </p>
          </section>
        </Card.Body>
        <Card.Footer className="text-center" style={{ backgroundColor: '#ac199f', color: 'white' }}>
          BY USING THIS PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ AND AGREED TO THESE TERMS AND CONDITIONS.
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default TermsAndConditions;