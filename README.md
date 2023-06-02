Deployed project - https://best-delivery-2023.netlify.app/

Delivery Service - Full-Stack MERN Project

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project for a delivery service application. The front-end of the application is built with React.js, utilizing Redux Toolkit for state management and styled with MUI material. The back-end is developed using Node.js with Express.js. MongoDB is used for data storage. Additionally, Google Maps integration has been implemented for enhanced navigation using @react-google-maps/api.


Getting Started
To run the application, follow these steps:

Create an API in the Google Developers Console at https://console.developers.google.com. Make sure to enable billing for the Google project, as some features may require it. Note that you may receive a warning about the project being for development purposes only.
Obtain the API key from MongoDB as well.
Set the API keys in the appropriate environment variables in the .env file.
Once the above steps are completed, install all the dependencies and run npm start to start the application.


The following features have been implemented in the application:

1. Multiple Shops: Initially, three shops with various food products have been added. All the data is stored in MongoDB. The application is designed to support the addition of more shops seamlessly without any hardcoding.
2. Order Placement: Users can place orders for products from a single shop. Each order is stored in the database.
3. Local Storage and Redux: Local storage is utilized to persist data, and all relevant information stored in Redux is also saved in local storage.
4. Cart Page with Google Maps: The cart page includes a Google Maps integration, allowing users to view the distance and estimated travel duration from the shop they ordered from to their location.
5. Orders History: An orders history page is available, where users can view their past orders. They can also search for orders using email or phone number inputs.
6. Responsive Design: The application is responsive, providing a seamless user experience across various devices, including large screens, tablets, and smartphones.
7. Theme Modes: Two theme modes are available: dark and light. Users can choose their preferred mode.
