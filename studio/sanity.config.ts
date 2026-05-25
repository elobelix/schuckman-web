import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Replace these values during deploy (or use env vars).
// SANITY_PROJECT_ID comes from creating a project at sanity.io/manage
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ma97g40c';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'schuckman-cms',
  title: 'Schuckman & Asoc. CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Settings is a singleton — only one document of this type
            S.listItem()
              .title('Configuración del sitio')
              .id('settings')
              .child(
                S.document().schemaType('settings').documentId('settings')
              ),
            S.divider(),
            // Proyectos
            S.listItem()
              .title('Proyectos')
              .child(
                S.documentTypeList('proyecto')
                  .title('Proyectos')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
