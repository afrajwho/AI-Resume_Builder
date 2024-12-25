# Installation

Follow the steps below to install and setup the project:

1. **Clone the repository**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/afrajwho/AI-Resume_Builder.git
   ```

2. **Install Node.js**

   The project requires Node.js version 13.4.19 or later. You can download it from [here](https://nodejs.org/en/download/).

3. **Install the required dependencies**

   Run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

   This will install all the dependencies listed in the `package.json` file, including Next.js, React, React DOM, Axios, Stripe, Tailwind CSS, and other specific dependencies such as "@aws-sdk/client-s3" and "@clerk/nextjs".

4. **Setup environment variables**

    Create a `.env` file in the root directory of your project and add the required environment variables.

5. **Run the project**

    Now, you can run the project using the following command:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.