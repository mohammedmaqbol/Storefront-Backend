# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Database schema
#### Products table
- id - serial primary key 
- name - varchar - Cannot be null
- price - numeric(17,2) - Cannot be null
- category - varchar

#### Users table
- id - serial primary key
- userName - varchar unique - Cannot be null
- firstName - varchar - Cannot be null
- lastName - varchar - Cannot be null
- password - varchar  - Cannot be null

#### Orders table
- id - serial primary key
- user_id bigint references users(id)  - Cannot be null
- complete (boolean) - Cannot be null


#### Order_Products table
- id - serial primary key
- quantity - integer  - Cannot be null
- order_id - bigint references orders(id)  - Cannot be null
- product_id - bigint references products(id)  - Cannot be null

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
