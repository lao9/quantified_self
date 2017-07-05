# Quantified Self

### Team Members: Jonathan Kidd & Lauren Oliveri

## API Endpoints

### Food CRUD

#### List of All Foods

`GET /api/foods`

#### Show Particular Food

`GET /api/foods/:id`

#### Create a New Food

`POST /api/foods?name=[]&calories=[]`

#### Update an Existing Food

`PUT /api/foods/:id?name=[]&calories=[]`

#### Delete a Food

`DELETE /api/foods/:id`

### Updating Diary

#### List All Foods for a Meal

`GET /api/meals/:id`

#### Add Food to Meal

`POST /api/food_meals?food_id=[]&meal_id=[]`

#### Remove Food from Meal

`DELETE /api/food_meals/:id`
