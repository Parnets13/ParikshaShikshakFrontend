// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-2">
                <Row>
                    <Col>
                        <ul className="list-unstyled d-flex justify-content-center gap-2">
                            <li>
                                <a href="/terms-and-conditions" className="text-dark">Terms & Conditions</a>
                            </li>
                            <li>
                                <span className="text-dark">|</span>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="text-dark">Privacy Policy</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className="text-center">
                © {new Date().getFullYear()} Arivu Bodhi Shikshak Talent LLP. All rights reserved. Developed by ParNets.
            </div>
            </Container>
          
        </footer>
    );
};

export default Footer;