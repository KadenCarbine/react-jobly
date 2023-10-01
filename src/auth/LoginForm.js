import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  //to do - write and return the HTML and programmatic components of the physical form

  return (
    <div>
    <h3 className="offset-md-3 offset-lg-4">Log In</h3>
    <Form
      onSubmit={handleSubmit}
      bg="white"
      className="container col-md-4 offset-md-3 col-lg-4 offset-lg-4 bg-white p-4 rounded-4"
    >
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={FormData.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={FormData.password}
          onChange={handleChange}
        />
      </Form.Group>
      {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null
              }
      <Button
        variant="primary"
        type="submit"
        onSubmit={handleSubmit}
        className="d-flex justify-content-end"
      >
        Submit
      </Button>
    </Form>
  </div>
  );
}

export default LoginForm;
