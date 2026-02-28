import { Eye, EyeOff } from "lucide-react";
import Error from "./Error";

function PasswordField({ showPassword, setShowPassword, register, errors }) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label
        htmlFor="password"
        className="block text-xs sm:text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 12,
              message: "Password cannot exceed 12 characters",
            },
          })}
          placeholder="Enter your password"
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-11 sm:pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-400 transition-all outline-none bg-white hover:bg-purple-50"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 hover:scale-125 transition-all duration-200 p-1 rounded-full hover:bg-purple-100"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
      {errors?.password && <Error message={errors.password.message} />}
    </div>
  );
}

export default PasswordField;
