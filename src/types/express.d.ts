declare namespace Express {
  interface Request {
    id?: string;

    /**
     * Represents the authenticated user data attached to the request.
     */
    user: {
      /**
       * Optional numeric ID of the user.
       */
      id: number;
      /**
       * Optional UUID of the user.
       */
      uuid: string;
    };

    /**
     * Returns the current date and time.
     *
     * @returns {Date} The current date and time.
     */
    now: () => Date;

    validation: <T extends import("zod").ZodObject>(schema: T) => Promise<import("zod").infer<T>>;
  }
}
