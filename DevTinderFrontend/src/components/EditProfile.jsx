import { useState } from "react";
import UserCard from "./UserCard";

const EditProfile = (user) => {
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [age, setAge] = useState(user.user.age);
  const [gender, setGender] = useState(user.user.gender);
  const [about, setAbout] = useState(user.user.about);
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl);

  return (
    <div className="flex justify-center space-x-10">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your Firstname..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your Lastname..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your Age..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your Gender..."
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your About..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label className="label">PhotoUrl</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your PhotoUrl..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <button className="btn bg-blue-700 mt-4">Save Profile</button>
      </fieldset>

      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
