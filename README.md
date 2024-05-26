# EventLogix

EventLogix is a powerful event logging and monitoring system that captures, filters, and logs user activities in real-time. It offers advanced features like efficient data fetching, debounced search, and comprehensive error handling, making it an indispensable tool for developers and system administrators.

## Features

- **Real-Time Event Logging**: Capture and log events in real-time to keep track of user activities. This feature ensures that you always have up-to-date information on what's happening within your system.
- **Advanced Filtering**: Apply various filters to search and analyze specific events. Filters can be applied based on actor, action, target, date range, and custom metadata.
- **Expandable Event Rows**: View detailed information about each event with expandable rows. Click on any event to see comprehensive details including metadata, timestamps, and associated entities.
- **Live View**: Enable live view mode to automatically update the event log with new entries. This feature is particularly useful for monitoring ongoing activities without manually refreshing the page.
- **Load More Pagination**: Navigate through event logs with ease using the "Load More" button. This ensures that large sets of data are broken down into manageable chunks, improving both performance and usability.
- **Export Capability**: Export event data for offline analysis or reporting. The export functionality is in CSV format.
- **Efficient Data Fetching**: Utilizes SWR for efficient data fetching, caching, and revalidation, ensuring the UI is always up-to-date with minimal network requests.
- **Debounced Search**: Implements debounced search functionality to reduce the number of API calls while typing, improving performance and user experience.
- **Prisma ORM**: Uses Prisma ORM for type-safe database interactions, ensuring robust and maintainable code.
- **Docker Support**: Supports Docker for containerized deployment, making it easy to set up and run the application in any environment.
- **Mock Data Seeding**: Includes scripts to seed the database with mock data, facilitating development and testing.
- **Error Handling**: Comprehensive error handling in API routes to provide meaningful error messages and ensure stability.
- **TypeScript**: Written in TypeScript for enhanced code quality and developer experience.

## Technologies Used

**Frontend**

- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- SWR: A React Hooks library for data fetching.
- Framer Motion: An animation library for React.
- React Spinners: A collection of loading spinner components for React.

**Backend**

- Next.js: A React framework for server-side rendering and API routes.
- Prisma ORM: An open-source database toolkit for TypeScript and Node.js.
- PostgreSQL: A powerful, open-source object-relational database system.

**Other**

- TypeScript: For enhanced code quality and developer experience.
- Axios: For making HTTP requests.
- Lodash: A utility library for JavaScript.
- Zod: For schema validation.
- Docker: A platform for developing, shipping, and running applications in containers.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

Clone the repository:

```sh
git clone https://github.com/BTawaifi/EventLogix.git
cd EventLogix
```

Install dependencies:

```sh
npm install
```

Set up environment variables: Create a `.env` file in the root directory and add your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/eventlogix
```

Set up the database:

```sh
npx prisma migrate dev
```

Generate Prisma client:

```sh
npx prisma generate
```

Start the development server:

```sh
npm run dev
```

Open your browser: Go to `http://localhost:3000` to view the application.

### Docker Installation

Clone the repository:

```sh
git clone https://github.com/BTawaifi/EventLogix.git
cd EventLogix
```

Create a `.env_docker` file:

Make sure you connect to `@db` which is the name of the database container in the `docker-compose` file.

```env
DATABASE_URL="postgresql://user:password@db:5432/eventlogix"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=eventlogix
```

Build and run the Docker containers:

```sh
docker-compose up --build
```

Open your browser: Go to `http://localhost:3000` to view the application.
