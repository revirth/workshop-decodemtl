//////////////////////////////////////////////////////////////////////////////////
// MESSAGES
//////////////////////////////////////////////////////////////////////////////////

let html_li_message = messages => {
  let html = [];

  messages.forEach(message => {
    html.push(`<li class="list-group-item">`);

    if (message.images.length > 0) {
      html.push("<div>");
      message.images.forEach(img =>
        html.push(`<img src='` + img + `' width='100%' />`)
      );
      html.push("</div><br />");
    }

    html.push(message.user, ": ", message.msg, "</li>");
  });

  return html.join("");
};

let fetchAndUpdate = () => {
  fetch("/messages/" + document.getElementById("chat-room").value)
    .then(response => response.json())
    .then(messages => {
      document.getElementById("msg-list").innerHTML = html_li_message(messages);
    });
};
let fetchDirectMessage = () => {
  fetch("/directMessages")
    .then(response => response.json())
    .then(messages => {
      document.getElementById("dm-msg-list").innerHTML = html_li_message(
        messages
      );
    });
};

document.getElementById("chat-form").addEventListener("submit", event => {
  event.preventDefault();

  let formData = new FormData(event.target);
  formData.append("chatroom", document.getElementById("chat-room").value); // add chatRoom index

  // TODO: should I delete `chat-room` property ??

  fetch("/messages", {
    method: "POST",
    body: formData
  });

  event.target.reset();
  document.getElementById("msg-list").scrollTop = 0;
});

//////////////////////////////////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////////////////////////////////

let getCookie = key =>
  document.cookie
    .split(";")
    .map(c => c.trim().split("="))
    .filter(arr => arr[0] === key)[0][1];

let fetchActiveUsers = () => {
  fetch("/activeUsers")
    .then(respo => respo.json())
    .then(users => {
      let html = ['<ul class="list-group nav-stacked">'];

      users.forEach(u =>
        html.push(
          `<li class="list-group-item" style="background-color:` +
            u.color +
            `">` +
            u.name +
            `</li>`
        )
      );

      html.push("</ul>");

      try {
        let unm = getCookie("unm");
        let color = users.filter(u => u.name === unm)[0].color;

        if (document.getElementsByName("color")[0].value !== color)
          document.getElementsByName("color")[0].value = color;
      } catch (error) {
        console.error(error);
      }

      document.querySelector("#activeUsers").innerHTML = html.join("");
    });
};

let fetchAllUsers = () => {
  fetch("/allUsers")
    .then(respo => respo.json())
    .then(users => {
      let selectAllUsers = document.getElementById("target-user");

      users.forEach(user => {
        let option = Object.assign(document.createElement("option"), {
          innerText: user,
          value: user
        });

        selectAllUsers.appendChild(option);
      });
    });
};

document
  .getElementById("change-name-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    fetch("/changeName", {
      method: "POST",
      body: new FormData(event.target)
    }).then(res => console.table(res));
  });

document
  .getElementById("change-color-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    fetch("/changeColor", {
      method: "POST",
      body: new FormData(event.target)
    }).then(res => fetchActiveUsers());
  });

//////////////////////////////////////////////////////////////////////////////////
// CHAT ROOM
//////////////////////////////////////////////////////////////////////////////////

let chatRoomList = [];
let fetchChatRoom = () =>
  fetch("/chatroomlist")
    .then(res => res.json())
    .then(rooms => {
      if (rooms.every(r => chatRoomList.indexOf(r) > -1)) return;

      chatRoomList = rooms;

      let selectChatRoom = document.getElementById("chat-room");
      selectChatRoom.innerHTML = "";

      chatRoomList.forEach((room, i) => {
        let option = Object.assign(document.createElement("option"), {
          innerText: room,
          value: i
        });

        selectChatRoom.appendChild(option);
      });
    });

document
  .getElementById("create-chat-room-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    fetch("/createChatRoom", {
      method: "POST",
      body: new FormData(event.target)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) fetchChatRoom();
        else alert("already exist !!");
      });

    event.target.reset();
  });

//////////////////////////////////////////////////////////////////////////////////
// Initial
//////////////////////////////////////////////////////////////////////////////////
fetchChatRoom();
fetchAllUsers();

//////////////////////////////////////////////////////////////////////////////////
// setInterval
//////////////////////////////////////////////////////////////////////////////////

setInterval(() => {
  fetchAndUpdate();
  fetchDirectMessage();
  fetchActiveUsers();
  fetchChatRoom();
}, 2000);

setInterval(() => {
  document.querySelector("#activeUsers").innerHTML = "";
  fetchActiveUsers();
}, 5000);
