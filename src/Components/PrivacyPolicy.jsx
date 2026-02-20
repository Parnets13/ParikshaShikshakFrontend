// src/PrivacyPolicy.js
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Card.Header>
        <Card.Body>
          <section>
            <h2 style={headerStyle}>1. Introduction</h2>
            <p>
              Welcome to Pariksha Shikshak ("App"). This Privacy Policy explains how Arivubodhi Shikshak Talent LLP ("Company," "we," "us," or "our") collects, uses, discloses, and protects your information when you use our mobile application and related services. We are committed to safeguarding your privacy and ensuring compliance with applicable data protection laws.
              <br /><br />
              By downloading, accessing, or using the App, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the App.
            </p>
          </section>

          <section>
            <h2 style={headerStyle}>2. Information We Collect</h2>
            <h5 style={headerStyle}>2.1 Personal Information</h5>
            <p>When you register, use, or interact with our App, we may collect:</p>
            <ul>
              <li>Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Institution Details</li>
              <li>Any other information you voluntarily provide</li>
            </ul>

            <h5 style={headerStyle}>2.2 Non-Personal Information</h5>
            <p>We may collect non-personally identifiable information such as:</p>
            <ul>
              <li>Device Information (model, OS version, unique device identifiers)</li>
              <li>Log Data (IP address, access times, pages viewed, app crashes)</li>
              <li>Usage Data (interactions with the App, features used)</li>
            </ul>

            <h5 style={headerStyle}>2.3 Data from Third Parties</h5>
            <p>If you log in through third-party services (Google, Facebook, etc.), we may receive relevant authentication and profile information as permitted by those platforms.</p>
          </section>

          <section>
            <h2 style={headerStyle}>3. How We Use Your Information</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul>
              <li>To provide and improve our services</li>
              <li>To personalize user experience</li>
              <li>To process and analyze student assessments</li>
              <li>To send notifications and updates</li>
              <li>To monitor and prevent fraudulent activity</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>4. Sharing of Information</h2>
            <p>We do not sell or rent your personal information. However, we may share information under the following circumstances:</p>
            <ul>
              <li>With Service Providers: We may share data with third-party vendors who assist in app functionality, analytics, and customer support.</li>
              <li>Legal Compliance: If required by law, we may disclose information in response to legal processes or regulatory requirements.</li>
              <li>Business Transfers: In case of a merger, acquisition, or asset sale, your data may be transferred to the new entity.</li>
            </ul>
          </section>

          <section>
            <h2 style={headerStyle}>5. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Once the retention period expires, we securely delete or anonymize your data.</p>
          </section>

          <section>
            <h2 style={headerStyle}>6. Security Measures</h2>
            <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or mobile networks is entirely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 style={headerStyle}>7. User Rights and Choices</h2>
            <p>You have the following rights concerning your personal information:</p>
            <ul>
              <li>Access & Correction: You can request access to your data and correct inaccuracies.</li>
              <li>Data Deletion: You may request deletion of your personal data, subject to legal and operational considerations.</li>
              <li>Opt-Out: You may opt-out of marketing communications and push notifications.</li>
              <li>Restrict Processing: You may request to limit data processing in certain circumstances.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:ganesh.m@shikshakworld.com" style={linkStyle}>ganesh.m@shikshakworld.com</a>.</p>
          </section>

          <section>
            <h2 style={headerStyle}>8. Third-Party Links & Services</h2>
            <p>Our App may contain links to third-party websites or services. We are not responsible for the privacy practices of these external platforms. Users are encouraged to review their privacy policies before engaging with such services.</p>
          </section>

          <section>
            <h2 style={headerStyle}>9. Children’s Privacy</h2>
            <p>Our App is not intended for children under 13 years of age. We do not knowingly collect data from minors. If we become aware of such collection, we will take immediate steps to delete the data.</p>
          </section>

          <section>
            <h2 style={headerStyle}>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. Any changes will be communicated through the App or our website. Continued use of the App constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 style={headerStyle}>11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, you can contact us at:
              <br /><br />
              <strong>Arivubodhi Shikshak Talent LLP</strong>
              <br />
              No,1138, 1st Floor, 20th Main Road, 53rd Cross
              <br />
              5th Block Rajajinagar Bangalore- 560010 Karnataka
              <br />
              Email: <a href="mailto:ganesh.m@shikshakworld.com" style={linkStyle}>ganesh.m@shikshakworld.com</a>
              <br />
              Phone: 7337875208
            </p>
          </section>
        </Card.Body>
        <Card.Footer className="text-center" style={{ backgroundColor: '#ac199f', color: 'white' }}>
          By using Pariksha Shikshak, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;