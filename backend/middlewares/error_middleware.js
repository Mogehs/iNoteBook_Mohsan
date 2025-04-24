const error_middleware = (err, req, res, next) => {
  
    const status = err.status || 401;
  
    if (err.name === 'ZodError') {
      const Errormessage = err.errors[0].message || "failed Zod validation";
      const ExtraDetailes = err.errors[0].path[0] || "unknown field";
  
      return res.status(status).json({
        success: false,
        message: Errormessage,
        field: ExtraDetailes
      });
    }
  
    const ExtraDetailes = err.ExtraDetailes || "no details";
    const message = err.message || "failed API";
  
    return res.status(status).json({
      success: false,
      message,
      details: ExtraDetailes
    });
  };
  
  module.exports = error_middleware;
  