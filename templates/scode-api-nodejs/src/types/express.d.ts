import "express";

declare global {
  namespace Express {
    interface Payload {
      id: number;
      realm: string;
    }

    interface Request {
      payload?: Payload;
    }
  }
}

export {};
