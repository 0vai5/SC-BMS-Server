interface AuthUserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      currentUser?: any;
    }
  }
}

export {};
