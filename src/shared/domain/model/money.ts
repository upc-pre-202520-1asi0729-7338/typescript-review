import {Currency} from "./currency";

/**
 * Money Value Object
 *
 * @remarks
 * Represents a monetary amount in a specific currency.
 * Provides methods for formatting, addition, and multiplication.
 * Ensures immutability and value equality.
 *
 * @example
 * ```typescript
 * const usd = new Currency('USD', '$');
 * const amount1 = new Money(100, usd);
 * const amount2 = new Money(50, usd);
 * const total = amount1.add(amount2); // Money { amount: 150, currency: usd }
 * const formatted = total.format('en-US'); // "$150.00"
 * ```
 *
 * @author Open-Source Application Development Team
 * @version 1.0.0
 * @since 2025-09-09
 */
export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency;

    /**
     * Creates a new Money instance.
     * @param {number} amount - The monetary amount (must be non-negative).
     * @param {Currency} currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount: number, currency: Currency) {
        if (amount < 0) throw new Error(`Amount cannot be negative: ${amount}`);
        this._amount = amount;
        this._currency = currency;
    }

    /**
     * Gets the monetary amount.
     * @returns {number} The amount.
     */
    get amount(): number {
        return this._amount;
    }

    /**
     * Gets the currency of the amount.
     * @returns {Currency} The currency.
     */
    get currency(): Currency {
        return this._currency;
    }

    /**
     * Formats the monetary amount according to the specified locale.
     * @param {string} [locale='en-US'] - The locale for formatting (default is 'en-US').
     * @returns {string} The formatted monetary amount.
     */
    public format = (locale: string = 'en-US'): string => {
        return this._currency.formatAmount(this._amount, locale);
    }

    /**
     * Returns a string representation of the Money instance.
     * @returns {string} A string in the format "CURRENCY_CODE AMOUNT".
     */
    public toString(): string {
        return `${this._currency.code} ${this._amount.toFixed(2)}`;
    }

    /**
     * Adds another Money instance to this one.
     * Both Money instances must have the same currency.
     * @param {Money} other - The other Money instance to add.
     * @returns {Money} A new Money instance representing the sum.
     * @throws {Error} If the currencies do not match.
     */
    public add = (other: Money): Money => {
        if (this._currency.code !== other.currency.code)
            throw new Error(`Cannot add amounts with different currencies: ${this._currency.code} and ${other.currency.code}`);
        return new Money(this._amount + other.amount, this._currency);
    }

    /**
     * Multiplies the monetary amount by a non-negative factor.
     * @param {number} factor - The factor to multiply by (must be non-negative).
     * @returns {Money} A new Money instance representing the product.
     * @throws {Error} If the factor is negative.
     */
    public multiply = (factor: number): Money => {
        if (factor < 0) throw new Error(`Factor cannot be negative: ${factor}`);
        return new Money(this._amount * factor, this._currency);
    }
}