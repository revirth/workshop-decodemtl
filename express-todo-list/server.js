let express = require("express");
let multer = require("multer");
let fs = require('fs');

let app = express();
let mul = multer();


let showIndexField = false;
let typeOfIndexField = () => (showIndexField ? "text" : "hidden");
let showTodoListIndex = -1;

let new_Todo = todo => ({
  todo: todo,
  done: false
});

let new_TodoList = title => ({
  title: title != undefined ? title : "List",
  todos: []
});


let TodoListList = [new_TodoList()];  // default TodoList
let TodoJsonFile = "todolist.json";
try {
  let fileContents = fs.readFileSync(TodoJsonFile);

  if(fileContents.length > 0 ) 
    TodoListList = JSON.parse(fileContents);
} catch (error) {}

let TodoListToJson = () => {
  fs.writeFileSync(TodoJsonFile, JSON.stringify(TodoListList));;
}

let instructions = () => "<h3>add a todo item</h3>";

let todoListNavigator = () => {
  let ret = [`<div class="todoListNav"><div><a href="/">All</a></div>`];

  TodoListList.forEach((list,listIndex) => ret.push(
    `<div>
      <a href="/` + listIndex + `">` + list.title + `</a>
      <form action="/delTodoList" method="POST" enctype="multipart/form-data">
        <input type="` + typeOfIndexField() +`" name="listIndex" value="` + listIndex + `" />
        <input type="submit" value="-" />
      </form>
    </div>`));

  ret.push(`
    <div>
      <form action="/addTodoList" method="POST" enctype="multipart/form-data">
        <input type="submit" value="add TodoList" />
      </form>
    </div>
    <div>
      <form action="/removeAll" method="POST" enctype="multipart/form-data">
        <input type="submit" value="remove All" />
      </form>
    </div>
  </div>`);

  return ret.join('');
}

let todoListItems = () => {
  let ret = [];

  TodoListList.forEach((todolist, listIndex) => {

    if(showTodoListIndex > -1 && todolist !== TodoListList[showTodoListIndex]) return;

    ret.push(
      `<br/><div class='todolist'>
          <div class='title'>
            <form action='/changeTitle' method='POST' enctype='multipart/form-data'>
              <input type="text" name="title" value="` + todolist.title +`" />
              <input type="` + typeOfIndexField() +`" name="listIndex" value="` + listIndex + `" />
              <input type="submit" value="change Title" />
            </form>
          </div>
          <div class='list'>
          <ul>`);

    todolist.todos.forEach((todo, todoIndex) => {
      ret.push(`<li><div style="display:flex;">`);

      if (todo.done) {
        
        ret.push(`<label class="done">` + todo.todo + `</label> `);

      } else {
        ret.push(`<label>` + todo.todo + `</label>
           <form action='/done' method='POST' enctype='multipart/form-data'>
            <input type="` + typeOfIndexField() +`" name="todoIndex" value="` + todoIndex +`">
            <input type="` + typeOfIndexField() +`" name="listIndex" value="` + listIndex +`" />
            <input type="submit" value="DONE">
          </form>
          <form action='/delTodoItem' method='POST' enctype='multipart/form-data'>
            <input type="` + typeOfIndexField() +`" name="todoIndex" value="` + todoIndex +`">
            <input type="` + typeOfIndexField() +`" name="listIndex" value="` + listIndex +`" />
            <input type="submit" value="delete Item">
          </form>`);
      }
      ret.push(`</div></li>`);
    });

    ret.push(`</ul></div>
              <form action="/add" method="POST" enctype="multipart/form-data">
                <input type="text" name="todo" />
                <input type="` + typeOfIndexField() +`" name="listIndex" value="` + listIndex + `" />
                <input type="submit" value="add Todo Item" />
              </form>
            </div></div>`);
  });

  return ret.join('');
};

let makeTodoHtml = () =>
  `<html>
    <head>
      <link href="/static/style.css" rel="stylesheet" />
    </head>

    <body>` +

    instructions() +

    todoListNavigator()+

    todoListItems() +

  ` <script>
        document.getElementsByName("todo")[0].focus();
    </script>

    </body>
  </html>`;


app.get("/", (req, res) => {
  showTodoListIndex = -1;

  res.send(makeTodoHtml());
});

app.get("/json", (req, res) => {
  // let fileContents = fs.readFileSync(TodoJsonFile);
  // res.send({fileContents});  
  res.sendfile(TodoJsonFile);
});

app.get("/:listIndex", (req, res) => {
  
  console.log("/:listIndex", req.params.listIndex, TodoListList[req.params.listIndex]);

  if(req.params.listIndex && TodoListList[req.params.listIndex] !== undefined)
    showTodoListIndex = req.params.listIndex;
  else
    res.redirect("/");

  res.send(makeTodoHtml());
});

// todo
app.post("/add", mul.none(), (req, res) => {
  let list = TodoListList[req.body.listIndex];
  list.todos.push(new_Todo(req.body.todo));

  // console.log(req.headers);
  TodoListToJson();

  res.redirect(req.headers.referer.replace(req.headers.origin, ''));
});

app.post("/done", mul.none(), (req, res) => {
  let list = TodoListList[req.body.listIndex];
  let todo = list.todos[req.body.todoIndex];
  todo.done = true;

  TodoListToJson();

  res.redirect(req.headers.referer.replace(req.headers.origin, ''));
});

// todoList
app.post("/changeTitle", mul.none(), (req, res) => {
  let todoList = TodoListList[req.body.listIndex];
  todoList.title = req.body.title;

  TodoListToJson();

  res.redirect(req.headers.referer.replace(req.headers.origin, ''));
});

app.post("/removeAll", (req, res) => {
  TodoListList = [new_TodoList()];
  TodoListToJson();

  res.redirect("/");
});

app.post("/addTodoList", (req, res) => {
  TodoListList.push(new_TodoList("List" + (TodoListList.length + 1)));
  TodoListToJson();

  res.redirect("/" + (TodoListList.length - 1));
});

app.post("/delTodoList", mul.none(), (req, res) => {
  TodoListList.splice(req.body.listIndex, 1);
  TodoListToJson();

  res.redirect("/");
});

app.post("/delTodoItem", mul.none(), (req, res) => {
  let todoList = TodoListList[req.body.listIndex];
  todoList.todos.splice(req.body.todoIndex, 1);
  TodoListToJson();

  res.redirect("/");
});

app.use("/static", express.static(__dirname + "/public"));

app.listen(4000);
