import { Router } from 'itty-router';
import reasons from './reasons.json' assert { type: 'json' };

// Create a new router
const router = Router();

// Fallback reasons in case the JSON import fails
const fallbackReasons = [
  "I'm currently unavailable",
  "I need some time to think about it",
  "That's not possible right now"
];

// Helper function for consistent response
const getReasonResponse = () => {
  try {
    // Check if reasons is available and has length
    const reasonsArray = Array.isArray(reasons) && reasons.length > 0 
      ? reasons 
      : fallbackReasons;
    
    const reason = reasonsArray[Math.floor(Math.random() * reasonsArray.length)];
    return new Response(
      JSON.stringify({ reason }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error("Error generating response:", error);
    const fallbackReason = fallbackReasons[Math.floor(Math.random() * fallbackReasons.length)];
    return new Response(
      JSON.stringify({ reason: fallbackReason, error: true }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

// Serve both the root and /no endpoints
router.get('/', () => getReasonResponse());
router.get('/no', () => getReasonResponse());

// Default route
router.all('*', () => new Response('Not Found', { status: 404 }));

// Handler for fetch events
export default {
  async fetch(request, env, ctx) {
    return router.handle(request);
  },
}; 