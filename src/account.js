import React, { useState } from "react";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
// eslint-disable-next-line no-unused-vars
import { Container, TextField, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];
const Account = () => {
  //state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [listOfCountries, setListOfCountries] = useState(countryList);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
          p: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",

            maxWidth: 600,
            padding: 5,
          }}
        >
          <form
            style={{
              marginLeft: -1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography>Personal Information</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Grid container direction="column">
                <Grid item>
                  <Typography>First Name</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    value={firstName}
                    sx={{ marginTop: 1 }}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography>Last Name</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    value={lastName}
                    sx={{ marginTop: 1 }}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography>Email</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="outlined-required"
                    label="Email Address"
                    value={emailAddress}
                    sx={{ marginTop: 1 }}
                    onChange={(event) => setEmailAddress(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography>Phone Number</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone Number"
                    value={phoneNumber}
                    sx={{ marginTop: 1 }}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid item>
                  <Typography>Home Address</Typography>
                </Grid>

                <Grid item>
                  <TextField
                    required
                    id="outlined-required"
                    label="Home Address"
                    value={homeAddress}
                    sx={{ marginTop: 1 }}
                    onChange={(event) => setHomeAddress(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography>Date of Birth</Typography>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                  <input
                    type="date"
                    value="2017-06-01"
                    style={{ width: 220, height: 55 }}
                  />
                </Grid>

                <Grid item>
                  <Typography>Gender</Typography>
                </Grid>
                <Grid item>
                  <FormControl sx={{ mt: 1, minWidth: 225 }} size="small">
                    <InputLabel id="demo-select-small">Gender</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={gender}
                      label="Gender"
                      onChange={handleChange}
                      sx={{ height: 55 }}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Typography>Country</Typography>
                </Grid>
                <Grid item>
                  <FormControl sx={{ mt: 1, minWidth: 225 }} size="small">
                    <InputLabel id="demo-select-small">Country</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={country}
                      label="Gender"
                      onChange={handleCountryChange}
                      sx={{ height: 55 }}
                    >
                      {listOfCountries.map((country, index) => {
                        return (
                          <MenuItem value={country} key={index}>
                            {country}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginTop: 2, ml: -11 }}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
                spacing={2}
              >
                <Grid item spacing>
                  <Button variant="contained" size="large">
                    <EditIcon />
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" size="large">
                    <CheckIcon />
                    Save
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button variant="contained" size="large">
                    <RestartAltIcon />
                    Reset
                  </Button>
                </Grid> */}
                <Grid item>
                  <Button variant="contained" size="large">
                    <CancelIcon />
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Account;
