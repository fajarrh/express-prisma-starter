declare namespace Express {
  interface Request {
    id?: string;
    user?: {
      id?: number;
      uuid?: string;
    };
    now: () => Date;
    getQuery: (key: string, defaulValue?: any) => any;
    validation: (
      schema: (yup: typeof import("yup")) => import("yup").AnyObjectSchema,
      opt?: import("yup").ValidateOptions
    ) => Promise<any>;
  }
}
