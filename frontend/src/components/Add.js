import NavBar from "./NavBar";
import { Card, Form, Button } from 'react-bootstrap';
import "./style.css"
import { useRef } from "react";
import axios from 'axios';

export default function Add() {
  const package_name = useRef();
  const quantity = useRef();
  const date_of_entry = useRef();
  const date_of_exit = useRef();
  const date_of_expiry = useRef();
  const selling_price = useRef();
  const cost_price = useRef();
  const date_of_notification = useRef();
  const map_location = useRef();
  const owner_name = useRef();
  const size = useRef();


  let rec;
  const handleSubmit = () => {
    rec = {
      "package_name": package_name.current.value,
      "quantity": quantity.current.value,
      "date_of_entry": date_of_entry.current.value,
      "date_of_exit": date_of_exit.current.value,
      "date_of_expiry": date_of_expiry.current.value,
      "selling_price": selling_price.current.value,
      "cost_price": cost_price.current.value,
      "date_of_notification": date_of_notification.current.value,
      "owner_name": owner_name.current.value,
      "map_location": map_location.current.value,
      "size": size.current.value
    }
    const postFormData = async () => {
      try {
        // const data = JSON.stringify(rec);
        const response = await axios.post('http://localhost:5000/packages/add', rec);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    postFormData()
  }


  return (
    <>
      <NavBar />
      <div className="centered-form">
        <Card style={{ display: "flex", width: "calc(100% - 8rem)", margin: "0rem 0rem -2rem 0rem", boxShadow: "0rem 0rem 3rem lightgray" }}>
          <Card.Header style={{ padding: "1rem 0rem .5rem 1rem" }}>
            <h5>Add Packages</h5>
          </Card.Header>
          <Card.Body style={{ display: "flex" }}>
            <Form style={{ width: "100%", padding: "1rem", marginTop: "-0.5rem" }}>
              <Form.Group>
                <Form.Label className="my-3">Package Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Package Name" ref={package_name} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter Quantity" ref={quantity} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Date Of Entry</Form.Label>
                <Form.Control type="date" placeholder="Enter Date Of Entry" ref={date_of_entry} required
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Date Of Exit</Form.Label>
                <Form.Control type="date" placeholder="Enter Date Of Exit" ref={date_of_exit} required />
              </Form.Group>
            </Form>
            <Form style={{ width: "100%", padding: "1rem" }}>
              <Form.Group className="my-3">
                <Form.Label>Date Of Expiry</Form.Label>
                <Form.Control type="date" placeholder="Enter Date Of Expiry" ref={date_of_expiry} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter Selling Price" ref={selling_price} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Cost Price</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter Cost Price" ref={cost_price} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Date Of Notification</Form.Label>
                <Form.Control type="date" placeholder="Enter Date Of Notification" ref={date_of_notification} required />
              </Form.Group>
            </Form>
            <Form style={{ width: "100%", padding: "1rem" }}>
              <Form.Group className="my-3">
                <Form.Label>Map Location</Form.Label>
                <Form.Control type="text" placeholder="Your Map Location" ref={map_location} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" ref={owner_name} required />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Package Size</Form.Label>
                <Form.Select required ref={size}>
                  <option disabled>Select Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-center align-items-center" style={{
                marginTop: "2rem"
              }}>
                <Button variant="primary" className="my-3" style={{
                  width: "100%"
                }} onClick={() => { handleSubmit() }}>
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>

  )
}