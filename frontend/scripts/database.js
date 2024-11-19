const url = "http://localhost:8080/api/";

const db = {
    updateData: async function (endpoint, id, data) {
        try {
            const response = await fetch(`${url}${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'  // Set the Content-Type header to application/json
                },
                body: JSON.stringify(data)  // Send the updated data as JSON
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();  // Return the updated object as JSON
        } catch (error) {
            console.error('There has been a problem with your update operation:', error);
        }
    },

    addData: async function (endpoint, data) {
        try {

            console.log(data);

            const response = await fetch(url + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Set the Content-Type header to application/json
                },
                body: JSON.stringify(data)  
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            /*const rawResponse = await response.text();  // Get the raw response as text
            console.log("Raw response:", rawResponse);   // Check the raw response
            const data = JSON.parse(rawResponse);        // Manually parse the response if needed
            return data;*/

            

            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your create operation:', error);
        }
    },

    deleteDataById: async function(endpoint, id){
        try {
            const response = await fetch(`${url}${endpoint}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return the response as JSON if needed
        } catch (error) {
            console.error('There has been a problem with your delete operation:', error);
        }
    },

    // Generic method for fetching data
    getData: async function (endpoint) {
        try {
            const response = await fetch(url + endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    },
    getDataById: async function (endpoint, id) {
        try {
            const response = await fetch(`${url}${endpoint}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    },

    // Token verify
    verifyToken: async function (token) {
        try {
            const response = await fetch(url + "verifyToken", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }), // Send the token in the request body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json(); // Expecting a boolean response
        } catch (error) {
            console.error('There has been a problem with your token verification operation:', error);
        }
    },

    // Image
    sendMultipartFile: async function (file, fileNum) {
        try {
            const formData = new FormData();
            formData.append('file', file);  // Append the file to the form data
            formData.append('fileNum', fileNum);

            const response = await fetch(url + "image", {
                method: 'POST',
                body: formData,  // Send form data with the file
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            return await response.json();  // Expecting a response indicating success
        } catch (error) {
            console.error('There has been a problem with the file upload operation:', error);
        }
    }
    
}

export default db;