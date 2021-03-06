# FoodShare

- **Author:** Timi Oshin
- **Link to Live Site:** https://foodshareapp.herokuapp.com/


## An application that allows for a safe space for everyday users to share their favorite dishes and build a global communities through tasty meals 


## Technology Used
### JavaScript, EJS, CSS, Nodejs, Express, Bulma (for styling)

## Getting Started 

![image](https://user-images.githubusercontent.com/72947001/115302375-fcae2600-a127-11eb-872f-29d558278922.png)

![image](https://user-images.githubusercontent.com/72947001/115303651-7e528380-a129-11eb-8770-9f35b8c93ea7.png)

![image](https://user-images.githubusercontent.com/72947001/115303754-a17d3300-a129-11eb-9276-d1c2b5ad01fa.png)

## Next Steps

![image](https://user-images.githubusercontent.com/72947001/115304942-2fa5e900-a12b-11eb-9f56-aa28c0ff7fa2.png)



## Models

Dish Model:
    name => String,
    imageUrl => String,
    videoUrl => String,
    description => String,
    likes => {type:Number,default:0}

User Model: 

   username=>  String,
    password=>  String,
    dish =>  [DishSchema]


## Route Map

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/" | Renders Home landing page/localhost:3000 |
|GET| "/auth/signup | Renders signup page views/auth/signup.ejs|
|POST| "/auth/signup | Uses signup page to create a new user, redirects to login page (views/auth/login.ejs)|
|GET| "/auth/login" | Renders login page (views/auth/login.ejs) |
|POST| "/auth/login" | Uses login page to authenticate user then redirects to User dashboard (views/auth/user.ejs)|
|GET| "/auth/logout" | Makes user session null and redirects to home page(/)|
|GET| "/user" | User dashboard with embedded dish model (views/auth/user.ejs) |
|POST| "/user" | Pushes new dish to user dashboard (views/auth/user.ejs) |
|PUT| "/dish/:dishId" | Gets the dish for any particular user and updates it (views/dish.ejs) |
|DELETE| "/dish/:dishId" | Deletes dish for any particular user (views/dish.ejs) |



## Challenges
A major challenge I experienced with this build was knowing how to manipulate the objects in my schema to perform the various functions I needed. Thanks to additional resources, I overcame this obstacle. 

## Existing Bugs
None but currently trying to create a home page that will be able to access all the user sessions/data and render on the homepage with an added functionality for each user to like other users dishes 

## Next Steps 
Create more functionalities for users to be able to comment on each others' dishes 


## References

Boilerplate- Alex Merced
Code along - @alexmercedcoder