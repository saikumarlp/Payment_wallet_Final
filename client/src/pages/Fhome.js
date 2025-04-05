import { Container, Row, Col, Button, Image } from 'react-bootstrap';
const Home = () => {
  return (
    
    <div className="bg-light text-center py-5">
      <Container>
      <marquee behavior="scroll" direction="left" scrollamount="5">
      <strong>Welcome to JustPay — The Future of Digital Payments</strong>
      </marquee>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4"> <strong>Fast & Secure Online Payments</strong></h1>
            <p className="lead">
              Experience seamless transactions with Just-Pay. Whether you're a small business holder or an enterprise, our platform offers the tools you need to manage payments effortlessly.
            </p>
            <ul className="list-unstyled">
              <li>✔️ Easy integration with your website or app</li>
              <li>✔️ Accept payments globally in multiple currencies</li>
              <li>✔️ Real-time transaction monitoring and analytics</li>
              <li>✔️ Just Click to Pay</li>
            </ul>
          </Col>
          <Col md={6}>
            <Image src="/just-pay.jpeg" alt="Online payment illustration" fluid />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="primary" size="lg" href="/signup">Get Started</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
  };
  
  export default Home;
  