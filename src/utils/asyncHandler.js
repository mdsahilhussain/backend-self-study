const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export default asyncHandler;

/* //! note: this is a utility function to handle async functions in express routes
 it takes a function as an argument and returns a function that calls the original function and catches any errors
 and passes them to the next middleware

 this is useful to avoid try catch blocks in every route handler
 it is used like this:
 app.get('/route', asyncHandler(async (req, res, next) => {
    your code here
 }));
*/

/* const asyncHandler = () => {};
const asyncHandler = (fn) => {() => {}};
const asyncHandler = (fn) => async () => {};
*/

/* //! try catch block is used to catch errors in async functions
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
*/

/* //! better way is to use Promise.resolve and catch this way we don't have to use try catch block

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export default asyncHandler;
*/
