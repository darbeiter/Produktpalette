  /* Konvertiert den Preis (number) in EUR (Währung) */


  export function getCurrencyStringFromNumber(value: number): string {
    const formatter = new Intl.NumberFormat('de-DE', {
      style: "currency",
      currency: 'EUR'
    })
    return formatter.format(value);
}