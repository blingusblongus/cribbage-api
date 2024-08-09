export function getEnumKeyByValue<T extends object>(
  enumObj: T,
  value: number,
): string {
  return (
    Object.keys(enumObj).find((key) => (enumObj as any)[key] === value) || ""
  );
}
