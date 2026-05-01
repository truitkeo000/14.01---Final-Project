# CS208 Full Stack Final Project – Downtown Donuts Website

- Name: Keona Truitt
- GitHub: https://github.com/truitkeo000
- Term: CS 208 Spring 2026

---

## Project Description

This is my full-stack final project for CS208. I created a prototype website for a small, family-owned business called Downtown Donuts. The goal of the project was to redesign their website to make it more modern, mobile-friendly, and interactive.

The application is built using Node.js and Express, with Pug templates for the frontend. It includes multiple pages such as a landing page, menu page, about page, and a customer comments page.

The comments page is a full-stack feature where users can submit feedback, which is processed on the server and displayed back on the page.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo
2. Navigate into the project:
cd 14.01---Final Project
3. Install dependencies:
npm install
4. Start the server:
npm start

## Access the Application
- If using Codespaces, forward port 3000
- Open the forwarded link in your browser

You should see the Downtown Donuts homepage.

## Pages Included
- Landing Page – Introduces the business with a modern layout and navigation
- Menu Page – Displays donuts and drinks in a styled menu layout
- About Page – Describes the history and purpose of the business
- Customer Comments Page – Allows users to submit and view comments
- Design Decisions:
   - For the design of my website, I tried to follow the Downtown Donuts brand guidelines while also keeping the layout simple and easy to use. I used the dark green color for the navigation bar, hero sections, and footer so the site has a consistent look. I used the saffron color for buttons and highlights so important things stand out without being too much.

   For fonts, I used Italianno for the Downtown Donuts name/logo because it looks more handwritten and fits the vibe of a small local shop. For everything else, I used Montserrat because it’s clean and easier to read.

   One of the main things I decided to do was make the menu into an actual page instead of just linking the PDF. I think this makes it easier for users to see all the donuts, drinks, and breakfast items directly on the site, especially on mobile.

   I also added links for UberEats, DoorDash, and GrubHub on the menu page so users can quickly order if they want to. Overall, I tried to make the site feel modern but still like a small local business.

## Edge Cases
- What happens if the server/API is unreachable? (The UI should display a friendly message, not break.)
   - If a user tries to submit the form without entering a name or comment, the server rejects it and shows an error message. This prevents blank comments from being added.
- What happens if a user submits a comment with only whitespace?
   - If someone enters only spaces, the input gets trimmed on the backend and treated as empty, so it is rejected just like a blank submission.
- What happens if a user submits extremely long input (e.g., 10,000 characters)?
   - The name field is limited to 40 characters and the comment field is limited to 500 characters. The frontend stops users from typing more, and the backend also checks this in case someone bypasses it.
- What happens if the user rapidly double-clicks the submit button?
   - If a user clicks the submit button multiple times quickly, the button gets disabled while the request is being processed. This helps prevent duplicate comments from being added.


## Challenges & Learnings
One challenge I had was starting with the TODO project and turning it into something completely different. The original code was set up for tasks and a database, so I had to change the routes and pages to match a business website instead.

Another challenge was getting the comments feature to work. I had to connect the form on the frontend to the backend using fetch, and then handle errors correctly. This helped me understand better how frontend and backend communicate with each other.

I also learned more about handling edge cases. For example, I made sure users can’t submit empty comments, only spaces, or really long inputs. I also prevented double submissions by disabling the button while the request is being sent.

On the design side, I learned that small changes like spacing, colors, and hover effects can make a big difference. At first my site looked really basic, but after adding those details it started to feel more like a real website.

Overall, this project helped me understand how everything connects in a full-stack app, from routes and APIs to the frontend and styling.
## Citations
Google Fonts (Italianno, Montserrat)
Downtown Donuts brand guidelines and menu PDF (provided in assignment)