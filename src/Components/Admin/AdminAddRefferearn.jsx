import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Table, Alert, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const ReferralPricingDashboard = () => {
  const [pricing, setPricing] = useState({
    baseReward: 100,
  });

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    fetchCurrentPricing();
    fetchPricingHistory();
  }, []);

  const fetchCurrentPricing = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8774/api/admin/getCurrentPricing');
      if (res.data.success) {
        setPricing(res.data.success);
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
      setAlertMsg({ type: 'danger', message: 'Failed to load current pricing.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPricingHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await axios.get('http://localhost:8774/api/admin/getPricingHistory');
      if (res.data.success) {
        setHistory(res.data.success);
        
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setPricing(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8774/api/admin/setReferralPricing', pricing);
      if (res.status === 200) {
        swal("Success!", "Referral pricing updated successfully!", "success");
        fetchCurrentPricing();
        fetchPricingHistory();
      }
    } catch (error) {
      console.error("Error updating pricing:", error);
      swal("Error", error.response?.data?.error || "Failed to update pricing", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Referral Program Configuration</h2>

      {alertMsg && (
        <Alert variant={alertMsg.type} onClose={() => setAlertMsg(null)} dismissible>
          {alertMsg.message}
        </Alert>
      )}

      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">Update Current Referral Pricing</Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Base Reward (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="baseReward"
                      value={pricing.baseReward}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </Form.Group>
                </Col>
           
              
              </Row>

              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Save Changes'}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

    </div>
  );
};

export default ReferralPricingDashboard;
