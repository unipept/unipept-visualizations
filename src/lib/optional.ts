/**
 * An optional type either has a value or is empty
 */
export class Optional<T> {
  /**
   * Create an empty Optional instance
   */
  public static empty<U>(): Optional<U> {
    return new Optional<U>(undefined);
  }

  /**
   * Create an Optional instance that wraps the parameter
   * @param element: The value to wrap in an Optional
   */
  public static of<U>(element: U): Optional<U> {
    return new Optional<U>(element);
  }

  /** The optional value */
  private readonly value: T | undefined;

  private constructor(value: T | undefined) {
    this.value = value;
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * returns an Optional describing the value, otherwise returns an empty Optional.
   * @param predicate: A function that tests a condition
   */
  public filter(predicate: (arg: T) => boolean): Optional<T> {
    if (this.isPresent() && predicate(this.get() as T)) {
      return this;
    }

    return Optional.empty();
  }

  /**
   * Returns the wrapped value (undefined if empty)
   */
  public get(): T | undefined {
    return this.value;
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise does nothing.
   * @param action: A function that performs some operation on the wrapped value.
   */
  public ifPresent(action: (arg: T) => void): void {
    if (this.isPresent()) {
      action(this.get() as T);
    }
  }

  /**
   * If a value is present, returns true, otherwise false.
   */
  public isPresent(): boolean {
    return this.value === undefined;
  }

  /**
   * If a value is present, returns an Optional describing the result of
   * applying the given transformation function to the value,
   * otherwise returns an empty Optional.
   * @param transformer: A function that transforms type T into type U.
   */
  public map<U>(transformer: (arg: T) => U): Optional<U> {
    if (this.isPresent()) {
      return Optional.of(transformer(this.get() as T));
    }

    return Optional.empty();
  }

  /**
   * If a value is present, returns the value, otherwise returns other.
   * @param other: An alternative value
   */
  public orElse(other: T): T {
    if (this.isPresent()) {
      return this.get() as T;
    }

    return other;
  }
}
