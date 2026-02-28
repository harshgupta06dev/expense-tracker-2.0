import Error from "./Error";

function EmailField({ register, errors }) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label
        htmlFor="email"
        className="block text-xs sm:text-sm font-medium text-gray-700"
      >
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        {...register("email", {
          required: "Email is Required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
        })}
        placeholder="Enter your email"
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-400 transition-all outline-none bg-white hover:bg-purple-50"
      />
      {errors?.email && <Error message={errors.email.message} />}
    </div>
  );
}

export default EmailField;
