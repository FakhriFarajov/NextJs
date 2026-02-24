export const sectionsData = [
  {
    id: 1,
    category: "THE FRONT END",
    mainTitle: "All about the UI and client logic. Take a closer look at how I approached the front end with real production code snippets.",
    techIcons: ["React", "Clerk", "TailwindCSS"],
    tabs: [
      {
        id: "custom-hooks",
        label: "Custom Hooks",
        description: "In this snippet, I've created a custom hook that fetches a film/tv Review data. This encapsulates the fetch logic and all of its related code like refetch and fetchMore for cursor based fetching which separates concerns from the rest of the parent component.",
        codeSnippet: "custom-hooks"
      },
      {
        id: "infinite-scrolling",
        label: "Infinite Scrolling",
        description: "Implementing infinite scrolling using Intersection Observer and React Query to dynamically load content as the user reaches the bottom of the feed.",
        codeSnippet: "infinite-scrolling"
      },
      {
        id: "optimistic-ui",
        label: "Comment Interactions & Optimistic UI Updates",
        description: "Providing instant feedback by updating the UI immediately when a user likes or comments, syncing with the server in the background.",
        codeSnippet: "optimistic-ui"
      },
      {
        id: "global-state",
        label: "Global State Management with useContext",
        description: "Using React's Context API to manage global application state, avoiding prop drilling for themes, user sessions, and modals.",
        codeSnippet: "global-state"
      }
    ]
  },
  {
    id: 2,
    category: "THE BACK END",
    mainTitle: "A robust backend is needed to support the front end. Here are snippets from my production server code.",
    techIcons: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    tabs: [
      {
        id: "cursor-pagination",
        label: "Cursor Based Pagination for Infinite Scrolling",
        description: "Using Prisma ORM with PostgreSQL, I'm using cursor based pagination so I dont fetch repeated data for the infinite scrolling feature in the front end. This is accomplished by using the id of the final item fetched and using that as a cursor with skipping the first element to avoid repeats.",
        codeSnippet: "cursor-pagination"
      },
      {
        id: "redis",
        label: "In Memory Store Caching with Redis",
        description: "Implementing Redis to cache heavy database queries and session data, significantly reducing latency and server load.",
        codeSnippet: "redis"
      },
      {
        id: "aws-s3",
        label: "AWS S3 to Store User Uploaded Media with a CDN",
        description: "Generating secure pre-signed URLs on the server to allow clients to upload images directly to S3 buckets, served via CloudFront CDN.",
        codeSnippet: "aws-s3"
      },
      {
        id: "parsing",
        label: "Parsing Text to Extract a URL Preview Thumbnail",
        description: "A server-side utility that parses user comments for URLs, scrapes the target metadata, and generates link preview thumbnails.",
        codeSnippet: "parsing"
      }
    ]
  }
];
