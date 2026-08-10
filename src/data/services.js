// Adapted from services.dart — keeps the same id -> "title: description" text,
// paired with its matching image from src/assets/services/{id}.jpeg.
const images = import.meta.glob('../assets/services/*.jpeg', {
  eager: true,
  import: 'default',
})

const RAW_SERVICES = {
  1: 'Terapia Psicológica cognitivo conductual: Evaluación, patrones, cogniciones, estrategias, cambio, adicciones, vicios.',
  2: 'Terapia Psicológica psicoanalítica: Pasado, profunda, inconsciente, introspectiva, interpretativa, autoexploración.',
  3: 'Terapia Psicológica humanista: Empatía, autoexploración, autenticidad, crecimiento, autorrealización.',
  4: 'Terapia Psicológica sistémica: Familia, interacciones, relaciones, dinámicas, roles, soluciones.',
  5: 'Terapia Psicológica gestal: Presente, conciencia, exploración, integración, autenticidad.',
  6: 'Terapia Psicológica Sexualidad: Exploración, identidad, orientación sexual, satisfacción, comunicación.',
  7: 'Terapia Psicológica psicocorporal: Cuerpo, emociones, movimiento, liberación, integración, contacto físico.',
  8: 'Terapia Psicológica tanatología: Afrontamiento, pérdida, duelo, sentido, apoyo.',
  9: 'Terapia Psicológica transgeneracional: Árbol genealógico, patrones, lealtades, herencias, sanación.',
  10: 'Terapia holística: Equilibrio, integración, cuerpo-mente, energía, bienestar.',
}

export const SERVICES = Object.entries(RAW_SERVICES).map(([id, text]) => {
  const [title, description] = text.split(/:\s*/)
  return {
    id: Number(id),
    title,
    description,
    image: images[`../assets/services/${id}.jpeg`],
  }
})
