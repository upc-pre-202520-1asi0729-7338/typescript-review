/**
 * Module for handling currency codes and formatting amounts.
 *
 * @remarks
 * This module defines a `Currency` class that encapsulates a three-letter currency code
 * and provides methods for formatting amounts in that currency.
 * @module Currency
 *
 * @example
 * ```typescript
 * const usd = new Currency('USD');
 * console.log(usd.formatAmount(1234.56)); // "$1,234.56"
 * console.log(usd.code); // "USD"
 * ```
 */


/**
 * Type representing a three-letter uppercase currency code.
 * Each letter must be an uppercase English alphabet character (A-Z).
 */
type UpperCaseLetter = | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'
    | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/**
 * Type alias for a three-letter uppercase currency code.
 */
export type CurrencyCode = `${UpperCaseLetter}${UpperCaseLetter}${UpperCaseLetter}`;

/**
 * Value object representing a currency with a three-letter code.
 * Provides methods for formatting amounts in that currency.
 */
export class Currency {
    private readonly _code: CurrencyCode;

    /**
     * Creates a new Currency instance.
     * @param {CurrencyCode} code - A three-letter uppercase currency code (e.g., 'USD', 'EUR').
     */
    constructor(code: CurrencyCode) {
        this._code = code;
    }

    /**
     * Gets the currency code.
     * @returns {string} The three-letter uppercase currency code as a string.
     */
    public get code(): string {
        return this._code;
    }

    /**
     * Formats a numeric amount according to the currency code and specified locale.
     *
     * @remarks
     * This method uses the `toLocaleString` function to format the amount.
     * It defaults to the 'en-US' locale if none is provided.
     * @param {number} amount - The numeric amount to format.
     * @param {string} [locale='en-US'] - The locale to use for formatting (default is 'en-US').
     * @returns {string} The formatted currency string.
     */
    public formatAmount = (amount: number, locale: string = 'en-US'): string => {
        return amount.toLocaleString(locale, {
            style: 'currency',
            currency: this._code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    /**
     * Returns the string representation of the currency code.
     * @returns {string} The three-letter uppercase currency code.
     */
    public toString = (): string => this._code;
}