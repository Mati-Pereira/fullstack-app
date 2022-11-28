import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post('/api/auth/register', data).then(() => alert("Usuário enviado"))
  };
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="border-2 p-16 rounded">
        <h1 className="text-5xl mb-12 text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-6">
            <label
              htmlFor="Username"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              minLength={3}
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="username"
              aria-describedby="username"
              placeholder="Enter username"
              {...register("username", { required: true })}
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              minLength={6}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword1"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
          <p className="text-gray-800 mt-6 text-center">
            Already a member?{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            >
              Signin
            </Link>
          </p>
          {(errors.password || errors.username) && (
            <span>Fill every field</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default signup;
