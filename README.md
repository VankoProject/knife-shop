# How to run locally
Requirements
- Node.js (version 18+ recommended)
- Git installed

Setup: 
- git clone: https://github.com/VankoProject/knife-shop.git
- cd knife-shop
- npm install
- npm run dev

Open in Browser
- http://localhost:5173

You can run these commands in any terminal or in your IDE terminal.
 
# Architecture overview

The project follows Feature-Sliced Design.

Main layers:
 - `app` - app initialization, router and Pinia setup
 - `pages` - router-level pages
 - `widgets` - large UI blocks used  by pages
 - `features` - user actions, for example auth and cart actions
 - `entities` - business entities such as product, user and cart
 - `shared` - reusable UI components, common types, constants and utilities

## Mock API
Mock API is implemented with MSW

## Mock Data
Application data (product, cart, orders) is stored locally in a fake database inside the project 

## State management 
Application state (including page UI states) is managed with Pinia.

# Implemented Features

## Authentication
- Login page with mock authentication
- Redirect to catalog after successful login

## Catalog
- Display product list from mock database
- Products cards with image, title, price. rarity and stock status
- Add to cart action on the product cards
- Filter panel (search, filters and sort)
- Pagination

## Product Page
- Product details page
- Add to cart action

## Cart
- Cart page with selected items
- Increase / decrease quantity
- Remove item
- Subtotal calculation
- Optimistic UI updates

## Checkout
- Checkout form
- Successful order flow
- Cart reset after checkout

# What I Would Improve With More Time
- Complete min/max price filter synchronization
- Move hardcoded strings and common app sizes, spacing to design system
- Add unit tests for stores and business logic
- Add loading skeletons
- Move API and business logic into repositories and use cases
- Add mappers between API models, domain models and UI models
