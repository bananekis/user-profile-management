# User Profile Management Application

A Next.js application for managing user profiles with authentication.

## Features

-   User authentication (sign up, sign in, sign out)
-   Create, read, update, and delete user profiles
-   Responsive design with Tailwind CSS

## Setup

1. Clone the repository and install dependencies:

    ```
    git clone https://github.com/bananekis/user-profile-management.git
    cd user-profile-management
    npm install
    ```

2. Set up environment variables:
   Create a `.env` file in the root directory with:

    ```
    DATABASE_URL="mysql://username:password@localhost:3306/your_database_name"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

    Generate NEXTAUTH_SECRET:

    ```
    openssl rand -base64 32
    ```

3. Set up the database:
    ```
    npx prisma generate
    npx prisma db push
    ```

## Running the Application

1. Start the development server:

    ```
    npm run dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Management

If tables are deleted or the database is empty:

```
npx prisma generate
npx prisma db push
```

For production, use migrations:

```
npx prisma migrate dev --name init
npx prisma migrate deploy
```

## Technologies Used

-   Next.js 15 (App Router)
-   React 19
-   TypeScript
-   NextAuth.js
-   Prisma ORM
-   MySQL
-   Tailwind CSS

## License

This project is licensed under the MIT License.
