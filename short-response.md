# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

1. **Endpoint URLs** are describing the resources, not the actions. Uses `/api/todos` instead of `/api/getTodos`.

2. Responses all include the correct status code corresponding to the method of the request. (`200`: OK, `201`: CREATED, `204`: SUCCESS NO CONTENT, `400`: INVALID, `404`: NOT FOUND).

3. Uses proper **HTTP methods** for creating endpoints, (`app.get`, `app.post`, `app.delete`, and `app.patch`), and creating configs for our fetch helpers, (`config = { method: methodName }`).

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:
The problem caused is a reduction in the testability, readability, and reusability/scalability of code because the **controllers** data logic and request/response logic are coupled together, this means you can't reuse certain logic without rewriting them and the code gets harder and harder to read at production scale. Separating them allows us to test data logic in an isolated manner and reuse logic functions elsewhere without repeating the logic. The con is that it becomes harder to follow logic/data flow between files.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

1. `main.js`: function `handleTodosListClick` is called and gets the current checkbox status and passes it into `updateTodos` function from `fetch-helpers.js`.

2. `fetch-helpers.js`: `updateTodos` runs and requests from our endpoint with the **patch** method and new `isDone` value as a property in our request body, `/api/todos/:id`.

3. `index.js`: runs `app.patch("/api/todos/:id", todoControllers.updateTodos)`, this calls update controller from `todoControllers.js`.

4. `todoControllers.js`: our `updateTodos` controller runs and assigns the id property from the url/endpoint, and our new `isDone` value from our request body to variables, then passes those variables into `todoModel.update` as a parameter then invokes it.

5. `todoModel.js`: our `update` model is called and uses the `id` and `isDone` parameters to first find the specific todo we want to update. Then we do `todo.isDone = isDone`. This updates our `isDone` property in the `todo` object to our new `isDone` value.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1. **Controller**, we pass this into our model for logic, to get property from request body the line needs to be in our request/response controllers.

2. **Controller**, we check if our `task` variable is empty or invalid then use response methods for request/response controllers to set status `400`, input is invalid, and send back an object with an error message.

3. **Model**, the model does the data logic, creating the new object, or adding the new entry to our existing array, our newly created `newTodo` needs to be added to our array which resides in `model.js`

4. **Model**, same as 3, our `todos` array resides in our `model.js`

5. **Controller**, `res.send` and `res.status` are response methods that reside in our controller. Status `201` signifies that a resource was successfully created.

<!-- 1. Deconstructs and assigns the variable `task` to the `task` property of `req.body`, the request body.

2. Checks if `task` is invalid.

3. Assigns response `status` to `400` and `sends` back a message to the client. Status `400`is an `Invalid` error meaning the `task` parameter is empty or is invalid. Also returns at the end to prevent any future `res.send` from attempting to run.

4. Creates and assigns a new todo object following the same format as the other todos in our array, ensuring that it's treated the same in other **controllers**.

5. Adds the `newTodo` to our array `todos`.

6. Sets response `status` to `201` meaning a resource was successfully created and sends our `newTodo` back to the client to confirm the data sent was successful. -->
