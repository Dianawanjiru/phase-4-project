import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles/Index";
import Login from "./Login";

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLog, setShowLog] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        specialization,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (

    <div>
      {showLog ? (

        <form className="style-form" onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>
          
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </FormField>
          <FormField>
            <Label htmlFor="password">Password Confirmation</Label>
            <Input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            />
          </FormField>
          <FormField>
        <Label htmlFor="imageUrl">Profile Image</Label>
        <Input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="specialization">Specialization</Label>
        <Textarea
          rows="3"
          id="specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </FormField>

          <FormField>
            <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
          </FormField>
          <p> Already have an account?
                <Button className='btn btn-success' onClick={()=>{setShowLog(false)}}> Log In</Button>
              </p>
          <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      ) : (
             <Login  onLogin={onLogin} />
      )
      }

    </div>

  );
}

export default Signup