import {Money} from "../../../shared/domain/model/money";

/**
 * Customer aggregate representing a customer in the CRM bounded context.
 *
 * @remarks
 * This class encapsulates the properties and behaviors of a customer entity.
 * It includes validation to ensure that the customer's name is not empty.
 * The lastOrderPrice property is optional and can be set to null if there are no orders.
 * The unique identifier for each customer is generated using UUID.
 *
 * @example
 * ```typescript
 * const customer = new Customer("John Doe");
 * customer.lastOrderPrice = new Money(100, "USD");
 * ```
 */
export class Customer {
    private readonly _id: string;
    private readonly _name: string;
    private _lastOrderPrice: Money | null;

    /**
     * Creates a new Customer instance.
     * @remarks
     * The constructor generates a unique identifier for the customer and validates the name.
     * @param {string} name - The name of the customer. Must not be empty.
     * @throws {Error} If the name is empty or consists only of whitespace.
     */
    constructor(name: string) {
        if(!name || name.trim().length === 0) throw new Error("Name cannot be empty");
        this._id = crypto.randomUUID();
        this._name = name;
        this._lastOrderPrice = null;
    }

    /**
     * Gets the unique identifier of the customer.
     * @returns {string} The unique identifier of the customer.
     */
    get id(): string {
        return this._id;
    }

    /**
     * Gets the name of the customer.
     * @returns {string} The name of the customer.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Gets the last order price of the customer.
     * @returns {Money | null} The last order price of the customer, or null if there are no orders.
     */
    get lastOrderPrice(): Money | null {
        return this._lastOrderPrice;
    }

    /**
     * Sets the last order price of the customer.
     * @param {Money} value - The last order price to set.
     */
    set lastOrderPrice(value: Money) {
        this._lastOrderPrice = value;
    }
}