export default class ModelSnapshot<T = any, V = any> {
  private _model: T;
  private _value: Record<keyof V, any>;
  constructor(model: T) {
    this._model = model;
  }

  dirtyValue(value: any) {
    return Object.fromEntries(
      Object.entries(this._model as any).map(([key, val]) => {
        if (value[key] !== undefined) {
          if (value[key] !== val) {
            val = value[key];
          }
        }
        return [key, val];
      })
    );
  }
}
