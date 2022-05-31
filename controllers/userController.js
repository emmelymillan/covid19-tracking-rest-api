// REQUIRE MODEL
import User from "../models/user.js";

export function getUsers(req, res, next) {
  User.get()
    //.then(data => console.log(data))
    //.then(data => res.render('index', { data }))
    .then((data) =>
      res
        .status(200)
        .json({ title: "Retreived all Users", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}
export function createUser(req, res, next) {
  // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
  const { title, content } = req.body;

  User.create(title, content)
    .then(res.status(201).json({ success: true, msg: "User Created" }))
    .catch((err) => res.status(400).json({ err }));
}
export function updateUser(req, res, next) {
  // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
  const { title, content } = req.body;
  // ID OF ARTICLE TO UPDATE
  let id = req.params.id;

  User.update(title, content, id)
    .then(res.status(200).json({ success: true, msg: "User Updated" }))
    .catch((err) => res.status(400).json({ err }));
}
export function deleteUser(req, res, next) {
  let id = req.params.id;

  User.delete(id)
    .then(res.status(200).json({ success: true, msg: "User Deleted" }))
    .catch((err) => res.status(400).json({ err }));
}
