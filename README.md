# India Insight React News Portal
Welcome to India Insight React News Portal! This application allows users to browse news articles fetched from a public API. Users can filter articles by categories, implement pagination for navigation, and view detailed article information.
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo Video](#demo-video)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Advanced Features](#advanced-features)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

- ## Overview

India Insight React News Portal is a responsive React application that utilizes a public news API to fetch and display news articles. Users can filter articles by categories such as Business, Technology, and Entertainment. Pagination is implemented to navigate through multiple pages of articles. Additionally, users can click on article summaries to view detailed information on a separate page.

- Display a list of news articles with titles, images, and summaries.
- Filter articles by categories using dropdown or buttons.
- Implement pagination for efficient navigation through articles.
- Detailed article view page with full content including media.
- Handle loading states and errors during API calls.
- Search feature to search articles by keywords.
- Favorites feature to save articles using local storage.

## Demo Video

For a detailed walkthrough of the India Insight React News Portal, please watch the [demo video](#) hosted on [YouTube](#).

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **Redux Toolkit**: State management library for managing application state.
- **Axios**: Promise-based HTTP client for making API requests.
- **CSS Modules**: CSS file in which all class and animation names are scoped locally by default.
- **Vite**: Fast, modern development build tool for front-end projects.

To run the India Insight React News Portal locally on your machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/India-Insight.git
   cd India-Insight

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install

3. **Set up environment variables:**

   Create a .env file in the root directory and add the following:
   
   ```bash
   REACT_APP_NEWS_API_KEY=your_news_api_key
   Replace your_news_api_key with your actual News API key.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev

## API Integration
The India Insight React News Portal integrates with the NewsAPI to fetch news articles. Bright Data was used to scrape news article data as NewsAPI didn't provide complete article data.

## State Management
Redux Toolkit is used for state management in the application. Actions and reducers are organized using Redux slices to handle user inputs, API responses, and application state.

## Contributing
Contributions to India Insight React News Portal are welcome! To contribute, please fork the repository and submit a pull request with your proposed changes.







