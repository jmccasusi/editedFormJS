import React, { Component } from 'react';
import {
  Form,
  Button,
  FormControl,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
//import Datepicker from "react-bootstrap-date-picker";
// import ControlLabel from "react-bootstrap/InputGroup";
// import FormCheck from "react-bootstrap/FormCheck";
// import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
// import ApplicantRecap from "./ApplicantRecap";


class Forms extends Component {
  constructor() {
    super();
    this.state = {
      // cohort_id: ,
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      birth_date: '',
      gender: '',
      ethnicity: '',
      linkedin: '',
      github: '',
      extra_link: '',
      cover_letter: '',
      highest_degree: '',
      college_major: '',
      college_location: '',
      is_employed: false,
      employer: '',
      is_military: false,
      income: '',
      has_laptop: false,
      why_interested: '',
      how_heard: '',
      skill_level: '',
      app_status: '',
      reviewer_comments: '',
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ cohort_id: this.props.location.state.cohort_id });
}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxes = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  async handleSubmit(event) {
    event.preventDefault();
    const applicantData = this.state;

    delete applicantData.redirect;

    // console.log(applicantData);
    const newData = await axios
      .post("http://localhost:3000/applications", applicantData)
      .catch(err => {
        console.log(err);
        return null;
      });

    console.log(newData.data);

    // this.props.history.push("/recap");

    console.log('id is: ' + newData.data.id);

    this.setState({
      redirect: true,
      newId: newData.data.id
    })
  }

  handleEthnicity = event => {
    this.setState({ ethnicity: event.target.value });
  };

  handleDate = date => {
    // let dbFriendlyDate = date.toISOString();
    this.setState({
      birth_date: date,
    });
  };

  mainBodyForm() {
    return(
      <div>
        <h2>Application Form</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email address"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="phone"
              name="phone"
              placeholder="(XXX) XXX-XXXX"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter street address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              >
                <option>Choose...</option>
                <option>CT</option>
                <option>NJ</option>
                <option>NY</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                name="zip"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthdate: </Form.Label>

              <DatePicker
                name="birth_date"
                selected={this.state.birth_date}
                onChange={this.handleDate}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender: </Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option>Choose...</option>
                <option>Female</option>
                <option>Male</option>
                <option>Binary</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <fieldset>
            <Form.Group as={Row} controlId="formEthnicity">
              <Form.Label as="legend" column sm={2}>
                Ethnicity:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Hispanic"
                  value="Hispanic"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  onChange={this.handleEthnicity}
                />
                <Form.Check
                  type="radio"
                  label="African American"
                  Value="African American"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  onChange={this.handleEthnicity}
                />
                <Form.Check
                  type="radio"
                  label="Asian"
                  Value="Asian"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                  onChange={this.handleEthnicity}
                />
                <Form.Check
                  type="radio"
                  label="Other"
                  value="Other"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios4"
                  onChange={this.handleEthnicity}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group controlId="formLinkedin">
            <Form.Label>Linked In:</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter your LinkedIn url"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGitHub">
            <Form.Label>GitHub:</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter your GitHub url"
              name="github"
              value={this.state.github}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formExtralink">
            <Form.Label>Personal Website:</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter your personal website url"
              name="extra_link"
              value={this.state.extra_link}
              onChange={this.handleChange}
            />
          </Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Cover Letter: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="cover_letter"
              value={this.state.cover_letter}
              onChange={this.handleChange}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEducation">
              <Form.Label>Degree: </Form.Label>
              <Form.Control
                placeholder="Enter your highest degree"
                name="highest_degree"
                value={this.state.highest_degree}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridMajor">
              <Form.Label>Major: </Form.Label>
              <Form.Control
                placeholder="Enter your major"
                name="college_major"
                value={this.state.college_major}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCollege">
              <Form.Label>University: </Form.Label>
              <Form.Control
                placeholder="Enter your University/College"
                name="college_location"
                value={this.state.college_location}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formIsEmployed">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check
                  label="Employed?"
                  name="is_employed"
                  value={this.state.is_employed}
                  onChange={this.handleCheckboxes}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="formEmployer">
              <Form.Label>Employer: </Form.Label>
              <Form.Control
                placeholder="Enter your employer"
                name="employer"
                value={this.state.employer}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formIsVeteran">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check
                  label="Veteran?"
                  name="is_military"
                  value={this.state.is_military}
                  onChange={this.handleCheckboxes}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="formIncome">
              <Form.Label>Income: </Form.Label>
              <Form.Control
                as="select"
                name="income"
                value={this.state.income}
                onChange={this.handleChange}
              >
                <option>Choose...</option>
                <option>Under $30,000</option>
                <option>$30,001 - $65,000</option>
                <option>$65,001 - $100,000</option>
                <option>Above $100,000</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <fieldset>
            <Form.Group as={Row} controlId="formLaptop">
              <Form.Label as="legend" column sm={2}>
                Do you own a laptop?
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  label="Yes"
                  name="has_laptop"
                  value={this.state.has_laptop}
                  onChange={this.handleCheckboxes}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Why did you choose Inclusion: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              label="Veteran?"
              name="why_interested"
              value={this.state.why_interested}
              onChange={this.handleChange}
            />
          </InputGroup>
          <Form.Group controlId="formHowHeard">
            <Form.Label>How did you hear about Inclusion?</Form.Label>
            <Form.Control
              placeholder="Enter your source"
              name="how_heard"
              value={this.state.how_heard}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSkillLevel">
            <Form.Label>Skill Level: </Form.Label>
            <Form.Control
              as="select"
              name="skill_level"
              value={this.state.skill_level}
              onChange={this.handleChange}
            >
              <option>Choose...</option>
              <option>Beginner</option>
              <option>Mid-level</option>
              <option>Advanced</option>
            </Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="formStatus">
            <Form.Label>Status: </Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
            >
              <option>Choose...</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </Form.Control>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Reviewer's comments: </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="reviewers_comment"
                value={this.state.reviewer_comments}
                onChange={this.handleChange}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }

  render() {
    if(this.state.redirect) {
      return (
        <Redirect
          // to="/recap"
          to={{
            pathname: "/recap",
            state: { id: this.state.newId }
          }}
        />
      );
    } else {
      return this.mainBodyForm();
    }
  }
}
export default withRouter(Forms);
