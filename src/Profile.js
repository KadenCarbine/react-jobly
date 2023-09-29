import React, { useState, useContext } from "react";
import Alert from "./common/Alert";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Profile = () => {
    const currentUser = useContext(UserContext);
    const [formData, setFormData] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
  
    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
  
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
  
      let username = formData.username;
      let updatedUser;
  
      try {
        updatedUser = await JoblyApi.saveProfile(username, profileData);
      } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
      }
  
      setFormData(f => ({ ...f, password: "" }));
      setFormErrors([]);
      setSaveConfirmed(true);
  
      // trigger reloading of user information throughout the site
      currentUser(updatedUser);
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }
    return(
        <div>
      <h3 className="offset-md-3 offset-lg-4">Sign Up</h3>
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
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={FormData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={FormData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={FormData.email}
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
    )
}

export default Profile