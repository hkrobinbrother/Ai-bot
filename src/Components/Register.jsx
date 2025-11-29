import { Link } from "react-router";
import img1 from "../../public/Group 2.png";
const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("from data", data);

    try {
      const res = await fetch("https://api.winaclaim.com/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log("res status", res.status);
      const result = await res.json();
      console.log(result)
      // console.log(data2);
    } catch (error) {
      console.error("network error", error);
     
    }
  };

  return (
    <div className="bg-[#D8FFEA] flex  justify-center items-center min-h-screen gap-10">
      <form
        onSubmit={handleRegister}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className=" text-2xl  text-green-400 text-center">
          Create Your Account
        </legend>

        <label className="label">Name</label>
        <input
          type="text"
          name="full_name"
          className="input"
          placeholder="name"
        />

        <label className="label">Phone Number</label>
        <input
          type="number"
          name="phone_number"
          className="input"
          placeholder="number"
        />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          className="input"
          placeholder="Address"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
        />

        <button type="submit" className="btn bg-green-400 text-white mt-4">
          Create Account
        </button>
        <h1>
          Already have an account ?
          <Link className="font-bold" to="/">
            Sign in
          </Link>
        </h1>
      </form>
      <div>
        <img src={img1} alt="" />
      </div>
    </div>
  );
};

export default Register;
