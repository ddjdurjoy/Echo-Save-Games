# Echo Save Games

A browser-based gaming platform where users can play games for free and save their progress.

## Features

- Multiple online web games
- User authentication with Google and Facebook
- Progress saving for registered users
- Guest mode with localStorage support
- Global leaderboard system
- Responsive design with Tailwind CSS

## Tech Stack

- Frontend: Next.js 14 with TypeScript
- Styling: Tailwind CSS
- Authentication: NextAuth.js
- Database: MongoDB
- Hosting: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ddjdurjoy/Echo-Save-Games.git
   cd echo-save-games
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri_here
   GOOGLE_ID=your_google_client_id_here
   GOOGLE_SECRET=your_google_client_secret_here
   FACEBOOK_ID=your_facebook_client_id_here
   FACEBOOK_SECRET=your_facebook_client_secret_here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here # Generate with: openssl rand -base64 32
   ```

4. Set up authentication providers:
   - Create a Google OAuth application at [Google Cloud Console](https://console.cloud.google.com/)
   - Create a Facebook OAuth application at [Facebook Developers](https://developers.facebook.com/)
   - Add the credentials to your `.env.local` file

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── games/            # Game pages
│   └── leaderboard/      # Leaderboard page
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── providers/            # React context providers
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 