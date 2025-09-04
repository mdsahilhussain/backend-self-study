class ApiResponse {
  // 👉 Yahaan ek class banayi gayi hai jiska naam hai ApiResponse
  //    Iska kaam hai ek common response object structure dena API ke liye.

  constructor(statusCode, data, message = "Success") {
    // 👉 constructor ek special method hai jo tab run hota hai jab class ka naya object banega.
    //    Yahaan 3 parameters pass ho rahe hain: statusCode, data aur message (default value = "Success").

    this.statusCode = statusCode;
    // 👉 response ka status code (jaise 200, 404, 500) yahaan store ho raha hai.

    this.data = data;
    // 👉 API se jo bhi data aayega (user details, product list, error info), woh yahaan rakha ja raha hai.

    this.message = message;
    // 👉 Ek custom message (default "Success"), jaise "User created", "Invalid input" etc.

    this.success = statusCode < 400;
    // 👉 Yahaan ek smart property banayi gayi hai:
    //    Agar statusCode 400 se chhota hai (matlab success), toh success = true
    //    warna (jaise 404 ya 500), success = false.
  }
}

/* //! Note: Samajhne ka simple flow:
	1.	Jab bhi API se response bhejna ho, toh is class ka ek object banega.
	2.	Us object me hamesha statusCode, data, message aur success flag honge → ek consistent structure milta hai har API ke liye.
	3.	Isse frontend developer ko asaani hoti hai, kyunki woh har API response me same format expect karega.
*/