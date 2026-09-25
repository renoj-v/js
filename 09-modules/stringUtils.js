// Another small "given" library module. This one has a DEFAULT
// export (a module can have at most one) plus a named export
// alongside it — a common real-world pattern.

export default function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shout(str) {
  return `${str.toUpperCase()}!`;
}
