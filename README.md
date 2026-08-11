# EventLogix

EventLogix is a full-stack event logging and monitoring application for capturing, filtering, inspecting, and exporting user activity in near real time.

Live deployment: https://event-logix.vercel.app

## What it demonstrates

EventLogix is primarily a full-stack systems project rather than a UI demo. It combines a typed React/Next.js frontend with PostgreSQL persistence, Prisma data access, schema validation, cached client-side fetching, containerized local development, and API-side error handling.

## Core capabilities

- Real-time-style event monitoring with a live-view mode
- Filtering by actor, action, target, date range, and metadata
- Debounced search to avoid unnecessary requests while typing
- Expandable rows for inspecting full event payloads
- Incremental "Load More" pagination for larger datasets
- CSV export
- Mock-data seeding for local development
- Docker-based local environment

## Architecture

```text
Browser / React UI
├── filters and search
├── event table and expandable details
├── live-view refresh behavior
└── CSV export
        │
        ▼
Next.js application
├── pages / UI rendering
├── API routes
├── validation and error handling
└── server-side application logic
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

### Client data flow

SWR is used for fetching, caching, and revalidation. Search input is debounced so rapid typing does not translate directly into a burst of API requests.

The UI intentionally uses incremental pagination rather than attempting to fetch the entire event history into the browser.

### Data layer

Prisma provides the typed database boundary between the Next.js application and PostgreSQL. Local development can run against a normal PostgreSQL instance or through Docker Compose.

Zod is used where runtime validation is needed rather than relying on TypeScript types alone at runtime boundaries.

## Engineering tradeoffs

### SWR polling/revalidation instead of a dedicated streaming transport

**Benefit:** simpler deployment and fewer moving parts while still supporting a useful live-monitoring experience.

**Cost:** it is not a true push-based event stream. A WebSocket/SSE architecture would be more appropriate if very low latency or very high event volume became a hard requirement.

### Load-more pagination instead of loading everything

**Benefit:** predictable browser memory use and smaller responses.

**Cost:** the client does not have the complete dataset available locally for arbitrary analysis.

### Prisma instead of handwritten SQL everywhere

**Benefit:** typed application-level data access and easier schema evolution.

**Cost:** some highly specialized queries may eventually be clearer or faster as explicit SQL.

## Reliability considerations

The API layer is expected to fail explicitly and return useful errors rather than allowing malformed requests or database failures to become silent UI problems.

The project also keeps mock-data seeding and containerized setup close to the application so development does not depend on manually recreating an undocumented environment.

## Known limitations

- The current live-view model is designed for application-scale monitoring, not a high-throughput distributed log platform.
- There is no dedicated message broker or durable event-streaming layer.
- Automated test coverage and CI are areas that should be expanded before treating the project as production infrastructure.
- The project currently uses an older Next.js 14 stack and should be upgraded deliberately rather than through an unreviewed dependency sweep.

## Stack

### Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- SWR
- Framer Motion

### Backend / data

- Next.js API routes
- Prisma
- PostgreSQL
- Zod

### Development / deployment

- Docker / Docker Compose
- Vercel deployment
- Prettier / ESLint

## Local development

### Prerequisites

- Node.js
- PostgreSQL

Clone and install:

```bash
git clone https://github.com/BTawaifi/EventLogix.git
cd EventLogix
npm install
```

Create `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/eventlogix
```

Prepare the database:

```bash
npx prisma migrate dev
npx prisma generate
```

Run the application:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Docker development

Create `.env_docker` with values matching the database service in `docker-compose`:

```env
DATABASE_URL="postgresql://user:password@db:5432/eventlogix"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=eventlogix
```

Then run:

```bash
docker-compose up --build
```

## Next engineering steps

If this project were being promoted from portfolio application to production logging infrastructure, the next priorities would be:

1. add integration tests around filtering, pagination, validation, and database failures;
2. add CI for formatting, type checking, tests, and production builds;
3. define event retention/indexing strategy for larger datasets;
4. evaluate SSE/WebSockets or a broker-backed ingestion path if push latency becomes important;
5. add observability for API latency, failed queries, and refresh behavior.
