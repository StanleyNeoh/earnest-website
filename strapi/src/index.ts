import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe(async (event) => {
      if (['afterCreate', 'afterUpdate', 'afterDelete', 'afterCreateMany', 'afterUpdateMany', 'afterDeleteMany'].includes(event.action)) {
        const { model } = event;
        // Only invalidate if it's a content type we care about (api::)
        if (model.uid.startsWith('api::')) {
          const contentType = strapi.contentTypes[model.uid];
          const tag = contentType.info.pluralName;

          if (tag) {
            try {
              const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
              const secret = process.env.REVALIDATION_TOKEN;
              
              if (!secret) {
                strapi.log.warn('REVALIDATION_TOKEN not set, skipping revalidation request');
                return;
              }

              const res = await fetch(`${frontendUrl}/api/revalidate?tag=${tag}&secret=${secret}`, {
                method: 'POST',
              });
              
              if (res.ok) {
                strapi.log.info(`Successfully triggered revalidation for tag: ${tag}`);
              } else {
                strapi.log.error(`Failed to revalidate tag: ${tag}. Status: ${res.status}`);
              }
            } catch (error) {
              strapi.log.error(`Error sending revalidation request for tag ${tag}:`, error);
            }
          }
        }
      }
    });
  },
};
