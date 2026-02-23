"use client";
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA STRUCTURE ---
const sectionsData = [
  {
    id: 1,
    category: "THE FRONT END",
    mainTitle: "All about the UI and client logic. Take a closer look at how I approached the front end with real production code snippets.",
    techIcons: ["React", "Clerk", "TailwindCSS"], // Replace with actual SVGs later
    tabs: [
      {
        id: "custom-hooks",
        label: "Custom Hooks",
        description: "In this snippet, I've created a custom hook that fetches a film/tv Review data. This encapsulates the fetch logic and all of its related code like refetch and fetchMore for cursor based fetching which separates concerns from the rest of the parent component.",
        codeSnippet: (
          <pre className="text-sm font-mono leading-relaxed">
            <span className="text-[#c678dd]">export const</span> <span className="text-[#61afef]">useFetchReview</span> = (<span className="text-[#e06c75]">reviewId</span>, <span className="text-[#e06c75]">replyCommentId</span>) <span className="text-[#c678dd]">=&gt;</span> {'{\n'}
            {'  '}<span className="text-[#c678dd]">const</span> [ review, setReview ] = <span className="text-[#56b6c2]">useState</span>(<span className="text-[#98c379]">''</span>){'\n'}
            {'  '}<span className="text-[#c678dd]">const</span> {'{'} user : clerkUser {'}'} = <span className="text-[#56b6c2]">useUser</span>(){'\n'}
            {'  '}<span className="text-[#c678dd]">const</span> {'{'} data : ownerUser, refetch : refetchOwner {'}'} = {'\n'}
            <span className="text-[#56b6c2]">useFetchOwnerUser</span>({'{'}<span className="text-[#d19a66]">email</span>:clerkUser.emailAddresses[<span className="text-[#d19a66]">0</span>].emailAddress{'}'}){'\n'}
            {'  '}<span className="text-[#c678dd]">const</span> [ isLoading, setIsLoading ] = <span className="text-[#56b6c2]">useState</span>(<span className="text-[#d19a66]">true</span>){'\n'}
            {'  '}<span className="text-[#c678dd]">const</span> [ error, setError ] = <span className="text-[#56b6c2]">useState</span>(<span className="text-[#d19a66]">null</span>){'\n'}
            {'  '}<span className="text-[#c678dd]">const</span> [ interactedComments, setInteractedComments ] = <span className="text-[#56b6c2]">useState</span>({'{\n'}
            {'      '}<span className="text-[#d19a66]">upvotes</span> : [],
          </pre>
        )
      },
      {
        id: "infinite-scrolling",
        label: "Infinite Scrolling",
        description: "Implementing infinite scrolling using Intersection Observer and React Query to dynamically load content as the user reaches the bottom of the feed.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// Infinite Scrolling snippet here...</pre>
      },
      {
        id: "optimistic-ui",
        label: "Comment Interactions & Optimistic UI Updates",
        description: "Providing instant feedback by updating the UI immediately when a user likes or comments, syncing with the server in the background.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// Optimistic UI snippet here...</pre>
      },
      {
        id: "global-state",
        label: "Global State Management with useContext",
        description: "Using React's Context API to manage global application state, avoiding prop drilling for themes, user sessions, and modals.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// Global State snippet here...</pre>
      }
    ]
  },
  {
    id: 2,
    category: "THE BACK END",
    mainTitle: "A robust backend is needed to support the front end. Here are snippets from my production server code.",
    techIcons: ["Node.js", "PostgreSQL", "AWS", "Docker"], // Replace with actual SVGs later
    tabs: [
      {
        id: "cursor-pagination",
        label: "Cursor Based Pagination for Infinite Scrolling",
        description: "Using Prisma ORM with PostgreSQL, I'm using cursor based pagination so I dont fetch repeated data for the infinite scrolling feature in the front end. This is accomplished by using the id of the final item fetched and using that as a cursor with skipping the first element to avoid repeats.",
        codeSnippet: (
          <pre className="text-sm font-mono leading-relaxed">
            <span className="text-[#61afef]">ListRouter</span>.<span className="text-[#56b6c2]">get</span>(<span className="text-[#98c379]">'/infinite'</span>, <span className="text-[#c678dd]">async</span> (req,res) <span className="text-[#c678dd]">=&gt;</span> {'{\n'}
            {'  '}<span className="text-[#c678dd]">const</span> {'{'} limit, userId, cursor {'}'} = req.query{'\n\n'}
            {'  '}<span className="text-[#c678dd]">try</span> {'{\n'}
            {'    '}<span className="text-[#c678dd]">const</span> listParams = {'{\n'}
            {'      '}where : {'{\n'}
            {'        '}userId : <span className="text-[#56b6c2]">Number</span>(userId),{'\n'}
            {'      '}{'}'},{'\n'}
            {'      '}orderBy : {'{\n'}
            {'        '}createdAt : <span className="text-[#98c379]">'desc'</span>
          </pre>
        )
      },
      {
        id: "redis",
        label: "In Memory Store Caching with Redis",
        description: "Implementing Redis to cache heavy database queries and session data, significantly reducing latency and server load.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// Redis caching snippet here...</pre>
      },
      {
        id: "aws-s3",
        label: "AWS S3 to Store User Uploaded Media with a CDN",
        description: "Generating secure pre-signed URLs on the server to allow clients to upload images directly to S3 buckets, served via CloudFront CDN.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// AWS S3 snippet here...</pre>
      },
      {
        id: "parsing",
        label: "Parsing Text to Extract a URL Preview Thumbnail",
        description: "A server-side utility that parses user comments for URLs, scrapes the target metadata, and generates link preview thumbnails.",
        codeSnippet: <pre className="text-sm font-mono text-gray-400">// URL parsing snippet here...</pre>
      }
    ]
  }
];

export default function HorizontalScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [activeTabs, setActiveTabs] = useState<{ [key: number]: string }>(() => {
    const initialState: { [key: number]: string } = {};
    sectionsData.forEach(section => {
      initialState[section.id] = section.tabs[0].id;
    });
    return initialState;
  });

  const handleTabClick = (sectionId: number, tabId: string) => {
    setActiveTabs(prev => ({ ...prev, [sectionId]: tabId }));
  };

  useGSAP(() => {
    const slider = containerRef.current;
    if (!slider) return;

    // Calculate exactly how much to move: (Total Width - One Screen Width)
    const amountToScroll = slider.offsetWidth - window.innerWidth;

    gsap.to(slider, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        // Calculate snap based on index: 0, 1, 2...
        snap: 1 / (sectionsData.length - 1),
        start: "top top", // Starts exactly when the top of the trigger hits the top of viewport
        end: () => `+=${amountToScroll}`, // Length of scroll equals distance moved
        invalidateOnRefresh: true, // Fixes math on resize
      },
    });
  }, { scope: triggerRef });

  return (
    /* The outer div acts as the trigger. 
       We set w-full to prevent the parent's 'align-items: center' 
       from shrinking the pin-spacer. 
    */
    <div ref={triggerRef} className="w-full bg-[#111111] overflow-hidden">
      <div 
        ref={containerRef} 
        className="flex flex-nowrap h-screen will-change-transform"
        style={{ width: `${sectionsData.length * 100}vw` }}
      >
        {sectionsData.map((section) => {
          const activeTab = section.tabs.find(tab => tab.id === activeTabs[section.id]) || section.tabs[0];

          return (
            <section 
              key={section.id} 
              className="w-screen h-screen flex flex-col justify-center px-8 md:px-[10vw] flex-shrink-0"
            >
              <div className="max-w-6xl mx-auto w-full">
                {/* ... (Your Content: Category, Title, Tabs, Code Snippet) ... */}
                <h4 className="text-[#3b82f6] text-xs font-bold tracking-[0.3em] uppercase mb-6">
                  {section.category}
                </h4>
                <h2 className="text-2xl md:text-[2.5rem] font-medium text-[#e5e7eb] mb-8">
                  {section.mainTitle}
                </h2>
                
                {/* Tabs & Code Window as per your original code */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {section.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(section.id, tab.id)}
                      className={`rounded-full px-5 py-2 text-sm border ${
                        activeTabs[section.id] === tab.id ? 'bg-white text-black' : 'text-gray-400 border-white/20'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6 overflow-hidden">
                  {activeTab.codeSnippet}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}