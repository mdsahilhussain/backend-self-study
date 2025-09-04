class ApiError extends Error {
  // 👉 Yahaan ek custom Error class banayi gayi hai jo JavaScript ke built-in `Error` class ko extend kar rahi hai.
  //    Matlab: ApiError ek special error object hoga jisme custom properties bhi hongi.

  constructor(
    statusCode,
    message = "Something went wrong", // default error message
    errors = [], // multiple error details list
    stack = "" // (typo: stack hona chahiye)
  ) {
    super(message);
    // 👉 super(message) ka matlab hai parent `Error` class ka constructor call karna.
    //    Isse Error ka default behaviour (jaise stack trace) maintain rahega.

    this.statusCode = statusCode;
    // 👉 error ka HTTP status code (jaise 400, 401, 404, 500) store ho raha hai.

    this.data = null;
    // 👉 Yahan default me data ko null set kar diya gaya hai, kyunki error ke case me data send nahi hoga.

    this.message = message;
    // 👉 Error message ko apni class ke andar bhi store kar liya gaya hai.

    this.success = false;
    // 👉 Har error ke case me success obviously false hi hoga.

    this.errors = errors;
    // 👉 Agar ek se zyada errors hain (jaise validation errors), unki list yahaan store hoti hai.

    if (stack) {
      this.stack = stack;
      // 👉 Agar developer ne custom stack trace diya hai toh woh use kar lo.
    } else {
      Error.captureStackTrace(this, this.constructor);
      // 👉 Agar stack nahi diya, toh JS ka built-in method call karke stack trace generate kar lo.
    }
  }
}

export default ApiError;
// 👉 Class ko export default kar diya gaya hai taaki dusre files me easily import kiya ja sake.



/* //! Note: Easy Explanation:
	•	ApiError ek custom error handler hai.
	•	Isse API me jab bhi error aayega, toh ek standard format me error response bheja ja sakta hai.
	•	Isme statusCode, message, errors[], stack sab included hote hain → debugging aur frontend ko error dikhane ke liye helpful.
*/