# Practica Modelo Relacional.

La siguiente practica evalua su conocimiento de consultas con Modelo Relacional.

## Como enviar sus respuesta.

1. Debe crear este archivo en su `fork` con el mismo nombre.
2. Debe copiar el contenido.
3. Debe comenzar a resolver las consultas.
4. Debe guardar el progreso en cada paso, puede cambiar la respuesta las veces que quiera, pero debe guardar el progreso cada vez. (Muy importante).

## Guardar progreso.

Para guardar su progreso cada vez que termine un ejercicio, o cambie una consulta. Ejecuta lo siguiente en un nuevo terminal:

```bash
git add .
git commit -m "Enviando progreso"
git push
```

## Ejercicios:

1. Listar la cantidad de tiendas por ciudad.

Salida:
```
+---------+------------+-------------+
| city_id | city       | store_count |
+---------+------------+-------------+
|     300 | Lethbridge |           1 |
|     576 | Woodridge  |           1 |
+---------+------------+-------------+
```

Respuesta:
```sql
-- Su respuesta aqui:

SELECT city.city, COUNT(*) as NumeroDeTiendas
FROM store
    INNER JOIN address ON store.address_id = address.address_id
    INNER JOIN city ON address.city_id = city.city_id
GROUP BY city.city;

```

2. Listar la cantidad de películas que se hicieron por lenguaje.

Salida:
```
+-------------+----------+------------+
| language_id | language | film_count |
+-------------+----------+------------+
|           1 | English  |       1000 |
|           2 | Italian  |          0 |
|           3 | Japanese |          0 |
|           4 | Mandarin |          0 |
|           5 | French   |          0 |
|           6 | German   |          0 |
+-------------+----------+------------+
```

Respuesta:
```sql
-- Su respuesta aqui:

SELECT l.name language, COUNT(f.film_id) film_count
FROM language l LEFT JOIN film f ON l.language_id = f.language_id
GROUP BY l.name;



```

3.  Seleccionar todos los actores que participaron mas de 35 peliculas.

Salida:

```
+----------+------------+-----------+------------+
| actor_id | first_name | last_name | film_count |
+----------+------------+-----------+------------+
|       23 | SANDRA     | KILMER    |         37 |
|       81 | SCARLETT   | DAMON     |         36 |
|      102 | WALTER     | TORN      |         41 |
|      107 | GINA       | DEGENERES |         42 |
|      181 | MATTHEW    | CARREY    |         39 |
|      198 | MARY       | KEITEL    |         40 |
+----------+------------+-----------+------------+
6 rows in set (0.01 sec)
```

Respuesta:
```sql
-- Su respuesta aqui:

SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.actor_id) AS film_count
FROM actor a
    INNER JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id
HAVING COUNT(fa.actor_id) > 35;
```

4. Mostrar el listado de los 10 de actores que mas peliculas realizó en la categoria `Comedy`.

Salida:
```
+----------+------------+-----------+-------------------+
| actor_id | first_name | last_name | comedy_film_count |
+----------+------------+-----------+-------------------+
|      196 | BELA       | WALKEN    |                 6 |
|      143 | RIVER      | DEAN      |                 5 |
|      149 | RUSSELL    | TEMPLE    |                 5 |
|       82 | WOODY      | JOLIE     |                 4 |
|      127 | KEVIN      | GARLAND   |                 4 |
|       58 | CHRISTIAN  | AKROYD    |                 4 |
|       24 | CAMERON    | STREEP    |                 4 |
|      129 | DARYL      | CRAWFORD  |                 4 |
|       83 | BEN        | WILLIS    |                 4 |
|       37 | VAL        | BOLGER    |                 4 |
+----------+------------+-----------+-------------------+
```

Respuesta:
```sql
-- Su respuesta aqui:



SELECT a.actor_id, a.first_name, a.last_name, COUNT(*) AS comedy_film_count
FROM actor a
    JOIN film_actor fa ON a.actor_id = fa.actor_id
    JOIN film_category fc ON fa.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Comedy'
GROUP BY a.actor_id
ORDER BY comedy_film_count DESC
LIMIT 10;


```

5. Obtener la lista de actores que NO han participado en ninguna película de categoría "Comedy":

Salida:
```
+----------+------------+-------------+
| actor_id | first_name | last_name   |
+----------+------------+-------------+
|        3 | ED         | CHASE       |
|        6 | BETTE      | NICHOLSON   |
|        7 | GRACE      | MOSTEL      |
|        8 | MATTHEW    | JOHANSSON   |
|        9 | JOE        | SWANK       |
... Se corta por longitud
|      189 | CUBA       | BIRCH       |
|      190 | AUDREY     | BAILEY      |
|      195 | JAYNE      | SILVERSTONE |
|      200 | THORA      | TEMPLE      |
+----------+------------+-------------+

53 filas total
```
Respuesta:
```sql
-- Su respuesta aqui:

SELECT actor.actor_id, actor.first_name, actor.last_name
FROM actor
WHERE actor.actor_id NOT IN (
    SELECT DISTINCT actor.actor_id
    FROM actor
    JOIN film_actor ON actor.actor_id = film_actor.actor_id
    JOIN film_category ON film_actor.film_id = film_category.film_id
    JOIN category ON film_category.category_id = category.category_id
    WHERE category.name = 'Comedy'
);


```
