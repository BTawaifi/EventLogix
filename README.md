# EventLogix

EventLogix is a comprehensive event logging and monitoring system designed to track, filter, and analyze user activities. It provides real-time insights and an intuitive interface for managing event logs, making it an essential tool for developers and system administrators.

## Features

### Real-Time Event Logging

Capture and log events in real-time to keep track of user activities. This feature ensures that you always have up-to-date information on what’s happening within your system.

### Advanced Filtering

Apply various filters to search and analyze specific events. Filters can be applied based on actor, action, target, date range, and custom metadata.

### Expandable Event Rows

View detailed information about each event with expandable rows. Click on any event to see comprehensive details including metadata, timestamps, and associated entities.

### Live View

Enable live view mode to automatically update the event log with new entries. This feature is particularly useful for monitoring ongoing activities without manually refreshing the page.

### Pagination

Navigate through event logs with ease using pagination. This ensures that large sets of data are broken down into manageable chunks, improving both performance and usability.

### Export Capability

Export event data for offline analysis or reporting. The export functionality supports various formats such as CSV and JSON.

### Customizable Columns

Adjust column widths to fit the content and maintain a consistent layout. This helps in keeping the interface clean and readable, especially when dealing with diverse data types.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **SWR**: A React Hooks library for data fetching.
- **Framer Motion**: An animation library for React.
- **React Spinners**: A collection of loading spinner components for React.

### Backend

- **Next.js**: A React framework for server-side rendering and API routes.
- **Prisma ORM**: An open-source database toolkit for TypeScript and Node.js.
- **PostgreSQL**: A powerful, open-source object-relational database system.

### Hosting

- **Vercel**: A cloud platform for static sites and Serverless Functions.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/EventLogix.git
   cd EventLogix
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your PostgreSQL connection string:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/eventlogix
   ```

4. **Set up the database:**

   ```sh
   npx prisma migrate dev
   ```

5. **Generate Prisma client:**

   ```sh
   npx prisma generate
   ```

6. **Start the development server:**

   ```sh
   npm run dev
   ```

7. **Open your browser:**
   Go to `http://localhost:3000` to view the application.

## Contributions

We welcome contributions from the community! To contribute:

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/YourFeatureName
   ```
3. **Make your changes.**
4. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
5. **Push to the branch:**
   ```sh
   git push origin feature/YourFeatureName
   ```
6. **Submit a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to reach out if you have any questions or suggestions!
