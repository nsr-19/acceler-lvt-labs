/**
 * Central error handler. Anything thrown or passed to next(err)
 * inside a route lands here.
 */
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500).json({
    error: err.expose ? err.message : 'internal server error',
  });
}
