import { Router } from 'itty-router';
import reasons from './reasons.json';

// Create a new router
const router = Router();

// Random rejection reason endpoint
router.get('/no', () => {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  return new Response(
    JSON.stringify({ reason }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
});

// Default route
router.all('*', () => new Response('Not Found', { status: 404 }));

// Handler for fetch events
export default {
  async fetch(request, env, ctx) {
    return router.handle(request);
  },
}; 