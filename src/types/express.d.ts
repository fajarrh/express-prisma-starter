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

    /**
     * Retrieves a query parameter from the request.
     *
     * @param key - The query parameter key to retrieve.
     * @param defaulValue - The default value to return if the key is not found.
     * @returns {any} The query parameter value or the default value if not found.
     */
    // getQuery: (key: string, defaulValue?: any) => any;

    /**
     * Validates request data against a Yup schema.
     *
     * @param schema - A function that receives Yup as an argument and returns a schema.
     * @param opt - Optional validation options.
     * @returns {Promise<any>} A promise that resolves when validation succeeds or rejects on failure.
     * @example
     * ```typescript
     * //use validation class
     * import Validation from "frexp/lib/Validation";
     *
     * const validator = new Validation((yup) => yup.object({
     *   name: yup.string().required(),
     *   age: yup.number().min(18).required(),
     * }), req.body)
     *
     * if (await validator.fails()){
     *  return res.status(400).json(validator.errors())
     * }
     *
     * console.log(validator.validated, 'validated data')
     * ```
     */

    validation: <T extends import("zod").ZodObject>(
      schema: T,
      params?: import("zod").util.InexactPartial<import("zod").ParseParams>
    ) => Promise<import("zod").infer<T>>;
  }
}
