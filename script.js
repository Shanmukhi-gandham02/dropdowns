const countryDropdown = document.getElementById('countryDropdown');
const stateDropdown = document.getElementById('stateDropdown');
const cityDropdown = document.getElementById('cityDropdown');

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
 return(data);
}

const displayCountry = async()=>{
  const countryData = await fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/countries");
  console.log(countryData.data)
  // // Populate the country dropdown
  countryData.data.forEach(country => {
    const option = document.createElement('option');
    option.value = country.id;
    option.text = country.name;
    countryDropdown.appendChild(option);
});
} 
displayCountry();


// // Event listener for country selection
countryDropdown.addEventListener('change', async () => {
    const selectedCountryId = parseInt(countryDropdown.value);
  const stateData = await fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/states");
  console.log(stateData);
    const filteredStates = stateData.data.filter(state => state.country_id === selectedCountryId);

    // Clear existing state and city options
    stateDropdown.innerHTML = '<option value="">Select State</option>';
    cityDropdown.innerHTML = '<option value="">Select City</option>';

    // Populate the state dropdown with filtered states
    filteredStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state.id;
        option.text = state.name;
        stateDropdown.appendChild(option);
    });
});

// // Event listener for state selection
stateDropdown.addEventListener('change', async () => {
    const selectedStateId = parseInt(stateDropdown.value);
        const cityData = await fetchData("https://d32sbion19muhj.cloudfront.net/pub/interview/cities");
    const filteredCities = cityData.data.filter(city => city.state_id === selectedStateId);

//     // Clear existing city options
    cityDropdown.innerHTML = '<option value="">Select City</option>';

//     // Populate the city dropdown with filtered cities
    filteredCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.text = city.name;
        cityDropdown.appendChild(option);
    });
});
