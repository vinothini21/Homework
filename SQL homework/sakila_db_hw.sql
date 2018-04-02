
-- 1a. Display the first and last names of all actors from the table `actor`. 

SELECT first_name, last_name 
FROM sakila.actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`. 
SELECT CONCAT(first_name , '  ' , last_name) AS `Actor Name`
FROM actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." 
-- What is one query would you use to obtain this information?
SELECT * FROM actor WHERE first_name='JOE';

--  2b. Find all actors whose last name contain the letters `GEN`:
SELECT * FROM actor WHERE last_name 
LIKE '%G%' OR last_name LIKE '%E%' OR last_name LIKE '%N%' ;

-- 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:

SELECT * FROM actor WHERE last_name LIKE '%L%' OR last_name LIKE '%I%' ;
ORDER BY first_name, last_name;

-- 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:

SELECT * FROM  country WHERE country IN ( 'Afghanistan', 'Bangladesh', 'China' )

-- 3a. Add a `middle_name` column to the table `actor`. Position it between `first_name` and `last_name`. Hint: you will need to specify the data type.
ALTER TABLE actor 
ADD middle_name varchar(50) AFTER first_name;

-- 3b. You realize that some of these actors have tremendously long last names. Change the data type of the `middle_name` column to `blobs`.

ALTER TABLE actor 
MODIFY middle_name BLOB;

-- 3c. Now delete the `middle_name` column.
ALTER TABLE actor
DROP COLUMN middle_name;

-- 4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name,COUNT(*) as count 
FROM actor 
GROUP BY last_name 
ORDER BY count DESC;

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
-- orderby always at the end
SELECT last_name, COUNT(*) AS count
FROM actor
GROUP BY last_name
HAVING count > 1
ORDER BY count DESC;

-- 4c. Oh, no! The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`, 
-- the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.

UPDATE actor
SET first_name = 'HARPO' 
WHERE first_name = 'GROUCHO' AND last_name= 'WILLIAMS';

-- 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
SHOW CREATE TABLE sakila.address;

-- 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:
USE sakila;
SELECT staff.first_name, staff.last_name, address.address
FROM staff
INNER JOIN address ON staff.address_id=address.address_id;

--  6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`. 

SELECT staff.first_name, staff.last_name, sum(payment.amount)
FROM staff
INNER JOIN payment ON staff.staff_id=payment.staff_id
WHERE payment_date between '2005-08-01' and '2005-08-31'
GROUP BY staff.first_name, staff.last_name;

-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.

SELECT film.title, count(film_actor.actor_id)
FROM film_actor
INNER JOIN film ON film_actor.film_id=film.film_id
GROUP BY film.title;

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT * FROM sakila.film WHERE title='Hunchback Impossible';
SELECT count(*) FROM sakila.inventory WHERE film_id=439;

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:

SELECT customer.first_name, customer.last_name, sum(payment.amount)
FROM customer
INNER JOIN payment ON customer.customer_id=payment.customer_id
GROUP BY customer.first_name, customer.last_name;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters 
-- K and Q have also soared in popularity. 
-- Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
SELECT * FROM sakila.film WHERE title LIKE 'K%' OR title LIKE 'Q%'  AND language_id in 
(
SELECT language_id FROM sakila.language WHERE language_id=1 
);

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT * FROM sakila.actor WHERE actor_id in 
(
  SELECT actor_id FROM sakila.film_actor WHERE film_id in 
  (
    SELECT film_id FROM sakila.film WHERE title= 'Alone Trip'
  )
);

-- 7c. You want to run an email marketing campaign in Canada, for which 
-- you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
SELECT customer.first_name, customer.last_name, customer.email FROM sakila.customer WHERE address_id in
(
  SELECT address_id FROM sakila.address WHERE city_id in
  (
   SELECT city_id FROM sakila.city WHERE country_id in
  (
    SELECT country_id FROM sakila.country WHERE country = 'Canada'
  )
  )
);

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
-- Identify all movies categorized as famiy films.

SELECT film.title FROM sakila.film WHERE film_id in
(
  SELECT film_id FROM sakila.film_category WHERE category_id in
  (
    SELECT category_id FROM sakila.category WHERE name='Family'
  )
);



