import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import registerUser from "./../strapi/registerUser";
import loginUser from "./../strapi/loginUser";
import { UserContext } from "../context/user";


//handle user

export default function Login() {
  const history = useHistory();
  //set up user context
  const { userLogin, alert, showAlert } = useContext(UserContext);

  //state values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsmember] = useState(true);

  // isEmpty becomes false once all fields are filled
  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsmember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    showAlert({ msg: "accessing user data, please wait..." });
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
      //log in
    } else {
      //register
      response = await registerUser({ email, password, username });
    }
    if (response) {
      console.log(response);
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `${username}, you have successfully logged in` });
      history.push("/products");
    } else {
      //show alert
      showAlert({ msg: "email or password is not correct", type: "danger" });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* username filed for registration */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
