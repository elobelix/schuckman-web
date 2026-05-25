import { defineField, defineType } from 'sanity';

export const STAGES = [
  { title: 'Diseño', value: 'diseno' },
  { title: 'Aprobación municipal', value: 'aprobacion' },
  { title: 'Estructura', value: 'estructura' },
  { title: 'Mampostería y servicios', value: 'mamposteria' },
  { title: 'Terminación', value: 'terminacion' },
  { title: 'Entregado', value: 'entregado' },
];

export const AMENITIES = [
  { title: 'Pileta', value: 'pileta' },
  { title: 'Parrilla', value: 'parrilla' },
  { title: 'SUM', value: 'sum' },
  { title: 'Gimnasio', value: 'gimnasio' },
  { title: 'Spa', value: 'spa' },
  { title: 'Solarium', value: 'solarium' },
  { title: 'Cocheras', value: 'cocheras' },
  { title: 'Bicicletero', value: 'bicicletero' },
  { title: 'Lavandería', value: 'lavanderia' },
  { title: 'Sauna', value: 'sauna' },
];

export default defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fieldsets: [
    { name: 'identidad', title: 'Identidad', options: { collapsible: false } },
    { name: 'ficha', title: 'Ficha técnica', options: { collapsible: true, collapsed: false } },
    { name: 'amenities', title: 'Amenities', options: { collapsible: true, collapsed: true } },
    { name: 'avance', title: 'Avance de obra (solo en curso)', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: 'Fotos', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({ name: 'name', title: 'Nombre del proyecto', type: 'string', validation: r => r.required(), fieldset: 'identidad', description: 'Ej: Edificio Chêne. La última palabra se renderiza en itálica acento.' }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: r => r.required(), fieldset: 'identidad' }),
    defineField({
      name: 'status', title: 'Estado', type: 'string', fieldset: 'identidad',
      options: { list: [{ title: 'En curso', value: 'en_curso' }, { title: 'Terminado', value: 'terminado' }], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'address', title: 'Dirección', type: 'string', fieldset: 'identidad', description: 'Ej: Mitre 1480' }),
    defineField({ name: 'neighborhood', title: 'Localidad', type: 'string', fieldset: 'identidad', initialValue: 'Ituzaingó' }),
    defineField({ name: 'year', title: 'Año', type: 'number', fieldset: 'identidad', description: 'Año de inicio (en curso) o de entrega (terminado).' }),

    defineField({ name: 'superficie', title: 'Superficie (m²)', type: 'number', fieldset: 'ficha' }),
    defineField({ name: 'pisos', title: 'Pisos', type: 'number', fieldset: 'ficha' }),
    defineField({ name: 'unidades', title: 'Unidades', type: 'number', fieldset: 'ficha' }),
    defineField({ name: 'cocheras', title: 'Cocheras', type: 'number', fieldset: 'ficha' }),
    defineField({ name: 'bauleras', title: 'Bauleras', type: 'number', fieldset: 'ficha' }),
    defineField({
      name: 'tipologias', title: 'Tipologías', type: 'string', fieldset: 'ficha',
      description: 'Texto libre. Ej: "Monoambiente · 2 · 3 · 4 ambientes con terraza propia"',
    }),

    defineField({
      name: 'amenities', title: 'Amenities (lista predefinida)', type: 'array', fieldset: 'amenities',
      of: [{ type: 'string', options: { list: AMENITIES } }],
      options: { layout: 'tags' },
      description: 'Tickear los que aplican. Cada uno trae su ícono.',
    }),
    defineField({
      name: 'customAmenities', title: 'Amenities adicionales', type: 'array', fieldset: 'amenities',
      of: [{ type: 'object', fields: [{ name: 'name', title: 'Nombre', type: 'string' }] }],
      description: 'Para amenities que no están en la lista. Se muestran con un ícono genérico.',
    }),

    defineField({
      name: 'currentStage', title: 'Etapa actual', type: 'string', fieldset: 'avance',
      options: { list: STAGES, layout: 'radio' },
      hidden: ({ document }) => document?.status !== 'en_curso',
    }),
    defineField({
      name: 'stages', title: 'Fechas de etapas completadas', type: 'array', fieldset: 'avance',
      hidden: ({ document }) => document?.status !== 'en_curso',
      of: [{
        type: 'object',
        fields: [
          { name: 'stage', title: 'Etapa', type: 'string', options: { list: STAGES } },
          { name: 'date', title: 'Fecha (ej: "Jul 2024")', type: 'string' },
        ],
        preview: { select: { stage: 'stage', date: 'date' }, prepare: ({ stage, date }) => ({ title: `${stage} — ${date || 'sin fecha'}` }) },
      }],
    }),
    defineField({
      name: 'instagramUrl', title: 'Link Instagram (highlight de obra)', type: 'url', fieldset: 'avance',
      hidden: ({ document }) => document?.status !== 'en_curso',
      description: 'Link al highlight de Instagram con avances de esta obra.',
    }),

    defineField({
      name: 'coverImage', title: 'Foto de tapa (grid del home)', type: 'image', fieldset: 'media',
      options: { hotspot: true }, validation: r => r.required(),
    }),
    defineField({
      name: 'gallery', title: 'Galería (página interior)', type: 'array', fieldset: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Mínimo 6 fotos recomendado. Primera foto = imagen grande de la portada.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'neighborhood', status: 'status', media: 'coverImage' },
    prepare: ({ title, subtitle, status, media }) => ({
      title, media,
      subtitle: `${status === 'en_curso' ? '🟠 En curso' : '⚪ Terminado'} · ${subtitle || ''}`,
    }),
  },
});
