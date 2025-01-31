export interface GenerateSKUParams {
  productName: string;
  categoryId: string;
  option: {
    value: string; // we should use string cause of forms issue
    unit: string;
  };
}

const cleanString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

const generateSKU = ({
  productName,
  categoryId,
  option,
}: GenerateSKUParams): string => {
  // Категория (2 символа)
  const categoryPrefix = cleanString(categoryId).substring(0, 2).toUpperCase();

  // Название продукта (3 символа)
  const productPrefix = cleanString(productName).substring(0, 3).toUpperCase();

  // Значение и единица измерения
  const valueSuffix = `${option.value}${option.unit.toUpperCase()}`;

  // Дата в формате YYMMDD
  const date = new Date();
  const dateSuffix = date.toISOString().slice(2, 10).replace(/-/g, '');

  // Случайное число (2 цифры)
  const randomSuffix = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');

  return `${categoryPrefix}${productPrefix}-${valueSuffix}-${dateSuffix}-${randomSuffix}`;
};

export { generateSKU };

// Для кофе "Arabica" в категории "Coffee" весом 250г: "COARB-250G-240104-01"
// Для кофе "Arabica" в категории "Coffee" весом 1kg: "COARB-1KG-240104-01"
