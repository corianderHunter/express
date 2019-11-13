import { Request, Response, NextFunction } from "express";
declare type MiddlewareFunctionType = (req: Request, res: Response, next: NextFunction) => any;
export default function Middleware(middleware: MiddlewareFunctionType): ClassDecorator;
export {};
