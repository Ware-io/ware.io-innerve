import NavBar from "./NavBar";
import { Card, Form, Button } from 'react-bootstrap';
import "./style.css"

export default function Add () {
    return (
        <>
        <NavBar />
            <div className="centered-form">
      <Card>
        <Card.Header>
          <h4>Add Packages</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label className="my-3">Package Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Package Name" required />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" placeholder="Enter Quantity" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Date Of Entry</Form.Label>
              <Form.Control type="date" placeholder="Enter Date Of Entry" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Date Of Exit</Form.Label>
              <Form.Control type="date" placeholder="Enter Date Of Exit" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Date Of Expiry</Form.Label>
              <Form.Control type="date" placeholder="Enter Date Of Expiry" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Selling Price" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Cost Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Cost Price" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Date Of Notification</Form.Label>
              <Form.Control type="date" placeholder="Enter Date Of Notification" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Map Location</Form.Label>
              <Form.Control type="text" placeholder="Your Map Location" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" required/>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Package Size</Form.Label>
              <Form.Select required>
        <option>Default select</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>

      </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center">
              <Button variant="primary" type="submit" className="my-3">
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