import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Configuración del sitio',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero (portada)', options: { collapsible: true, collapsed: false } },
    { name: 'team', title: 'Sección Nuestro Equipo', options: { collapsible: true, collapsed: true } },
    { name: 'services', title: 'Sección Cómo Trabajamos', options: { collapsible: true, collapsed: true } },
    { name: 'contact', title: 'Datos de contacto', options: { collapsible: true, collapsed: true } },
    { name: 'social', title: 'Redes', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'hero', title: 'Hero', type: 'object', fieldset: 'hero',
      fields: [
        { name: 'meta', title: 'Texto pequeño superior', type: 'string', initialValue: 'Estudio de arquitectura y diseño' },
        { name: 'titleLine1', title: 'Título — primera línea', type: 'string', initialValue: 'Diseñar. Dirigir.' },
        { name: 'titleLine2', title: 'Título — palabra acento (itálica copper)', type: 'string', initialValue: 'Construir' },
        { name: 'subtitle', title: 'Bajada', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'officeImage', title: 'Foto de la oficina (hero)', type: 'image',
      options: { hotspot: true }, fieldset: 'hero',
    }),

    defineField({
      name: 'team', title: 'Nuestro Equipo', type: 'object', fieldset: 'team',
      fields: [
        { name: 'intro', title: 'Frase introductoria (itálica)', type: 'text', rows: 2, description: 'Usá **palabras** entre dobles asteriscos para destacarlas en copper.' },
        { name: 'p1', title: 'Párrafo 1', type: 'text', rows: 3 },
        { name: 'p2', title: 'Párrafo 2', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'teamImage', title: 'Foto del equipo', type: 'image',
      options: { hotspot: true }, fieldset: 'team',
    }),

    defineField({
      name: 'services', title: 'Servicios', type: 'array', fieldset: 'services',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'description', title: 'Descripción', type: 'text', rows: 5, description: 'Usá *frase* entre asteriscos simples para resaltarla en itálica.' },
        ],
        preview: { select: { title: 'title' } },
      }],
      validation: r => r.length(3).error('Deben ser 3 servicios.'),
    }),

    defineField({
      name: 'contact', title: 'Contacto', type: 'object', fieldset: 'contact',
      fields: [
        { name: 'email', title: 'Email', type: 'string', initialValue: 'r.schuckman@schuckman.com.ar' },
        { name: 'phone', title: 'Teléfono (display)', type: 'string', initialValue: '+54 11 3024-4030' },
        { name: 'phoneRaw', title: 'Teléfono (tel: link, sin espacios ni guiones)', type: 'string', initialValue: '+541130244030' },
        { name: 'whatsapp', title: 'WhatsApp (solo números, sin +)', type: 'string', initialValue: '541130244030' },
        { name: 'addressLine1', title: 'Dirección — línea 1', type: 'string', initialValue: 'Lavalle 898, 1er piso' },
        { name: 'addressLine2', title: 'Dirección — línea 2', type: 'string', initialValue: 'Ituzaingó, Buenos Aires' },
      ],
    }),

    defineField({
      name: 'instagramUrl', title: 'Instagram del estudio (URL completa)', type: 'url', fieldset: 'social',
      initialValue: 'https://www.instagram.com/schuckman_asoc/',
    }),
  ],
  preview: { prepare: () => ({ title: 'Configuración del sitio' }) },
});
