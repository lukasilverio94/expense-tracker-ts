import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

const errorHandlerMiddleware = (
  err: Error | AppError,
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  if(err instanceof AppError){
    return res.status(err.status || 400).json({ message: err.message });
  }

  // default 500 error for unhandled error
  console.log("Unhandled error:", err);
  res.status(500).json({message: "An unexpected error occured" });
}

export { errorHandlerMiddleware } ;
