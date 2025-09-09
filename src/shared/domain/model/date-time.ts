/**
 * DateTime Value Object
 *
 * @remarks
 * This class represents a date and time value object. It ensures that the date is valid and not in the future.
 * It provides methods to format the date in different ways.
 *
 * @example
 * ```typescript
 * const dateTime = new DateTime('2023-10-05T14:48:00.000Z');
 * console.log(dateTime.toString()); // '2023-10-05T14:48:00.000Z'
 * console.log(dateTime.format('en-GB')); // '05/10/2023, 14:48:00'
 * ```
 */
export class DateTime {
    private readonly _date: Date;

    /**
     * Creates a new DateTime instance.
     * If no value is provided, it defaults to the current date and time.
     * @param {Date | string} [value] - The date value as a Date object or an ISO 8601 string.
     * @throws {Error} If the provided date is invalid or in the future.
     */
    constructor(value?: Date | string) {
        const now = new Date();
        if (value) {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime())) throw new Error(`Invalid date format: ${value}.`);
            if (parsedDate > now) throw new Error(`Date cannot be in the future: ${value}.`);
            this._date = parsedDate;
        } else this._date = now;
    }

    /**
     * Gets the underlying Date object.
     * @returns {Date} The Date object.
     */
    public get value(): Date {
        return this._date;
    }

    /**
     * Returns the ISO string representation of the date.
     * @returns {string} The ISO string representation of the date.
     */
    public toString(): string {
        return this._date.toISOString();
    }

    /**
     * Formats the date according to the specified locale.
     * Defaults to 'en-US' if no locale is provided.
     * @param {string} [locale='en-US'] - The locale to format the date.
     * @returns {string} The formatted date string.
     */
    public format(locale: string = 'en-US'): string {
        return this._date.toLocaleDateString(locale, {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }

}