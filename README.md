# Frempco - Frontend code

Frempco lets teachers pair up classmates for text-based improvised chats. Students build up real-world friendships through collaboration and storytelling. The word "Frempco" stands for "Friendships + Empowerment = Community," the equation that powers what we do.

## Hosting

- Dev site: [dev.frempco.com](https://dev.frempco.com/)
- Live site: [frempco.com](https://www.frempco.com/)
- Frontend hosted on Vercel
- Backend hosted on Heroku

## Tech stack (frontend)

- React.js
- Next.js
- TypeScript
- SocketIO
- MaterialUI

## Setup instructions

1. Download the [backend repo](https://github.com/Frempco/web-server) and run it separately
2. `npm install`
3. `npm run dev`
4. Visit [http://localhost:3000](http://localhost:3000)

## Git workflow

- Our production branch is `main`, and our development branch is `dev`
- All development branches come from `dev`
- Pull requests are merged into `dev`
- Every so often, we merge `dev` into `main`
