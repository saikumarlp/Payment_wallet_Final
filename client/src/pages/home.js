import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './Home.css'; // We'll add some custom styles

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200); // Add entrance delay
  }, []);

  return (
    <div className="home-wrapper text-white">
      <Container className={`home-content ${show ? 'fade-in' : ''}`}>
        <marquee behavior="scroll" direction="left" scrollamount="5" className="welcome-banner">
          <strong>✨ Welcome to JustPay — The Future of Digital Payments ✨</strong>
        </marquee>
        <Row className="align-items-center mt-4">
          <Col md={6}>
            <h1 className="display-4 fw-bold">Fast & Secure <span className="highlight-text">Online Payments</span></h1>
            <p className="lead mt-3">
              Experience seamless transactions with <strong>JustPay</strong>. Whether you're a small business or an enterprise,
              we provide the perfect solution for effortless payment processing.
            </p>
            <ul className="features-list mt-4">
              <li>🚀 Easy integration with websites & apps</li>
              <li>🌐 Accept payments globally in multiple currencies</li>
              <li>📊 Real-time transaction monitoring & analytics</li>
              <li>🖱️ Just Click to Pay – lightning-fast checkout</li>
            </ul>
          </Col>
          <Col md={6} className="text-center">
            <Image
              src="/just-pay.jpeg"
              alt="JustPay Illustration"
              fluid
              rounded
              className="img-shadow"
            />
          </Col>
        </Row>
        <Row className="mt-5 text-center">
          <Col>
            <Button variant="light" size="lg" href="/signup" className="cta-button">
              🚀 Get Started with JustPay
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
