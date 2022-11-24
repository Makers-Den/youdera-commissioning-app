export function getByName(name: string) {
  return cy.get(`[name="${name}"]`);
}
