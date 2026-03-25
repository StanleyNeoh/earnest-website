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
      const { action, model } = event;
      
      if (['afterCreate', 'afterUpdate', 'afterDelete', 'afterCreateMany', 'afterUpdateMany', 'afterDeleteMany'].includes(action)) {
        
        if (!model || !model.uid) {
            strapi.log.warn(`Lifecycle event ${action} triggered without model UID`);
            return;
        }

        // Log the event for debugging
        strapi.log.info(`Lifecycle event triggered: ${action} for ${model.uid}`);
        
        // Only invalidate if it's a content type we care about (api::)
        if (model.uid.startsWith('api::')) {
          try {
            const contentType = strapi.contentTypes[model.uid];
            
            if (!contentType) {
                strapi.log.warn(`Content type definition not found for UID: ${model.uid}`);
                return;
            }

            const tag = contentType.info.pluralName;

            if (tag) {
              const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
              const secret = process.env.REVALIDATION_TOKEN;

              // Clear local backend cache middleware
              if ((strapi as any).customCache) {
                const pattern = `/api/${tag}`;
                strapi.log.info(`Clearing backend cache for pattern: ${pattern}`);
                (strapi as any).customCache.deletePattern(pattern);
              }
              
              if (!secret) {
                strapi.log.warn('REVALIDATION_TOKEN not set in Strapi environment, skipping revalidation request');
                return;
              }

              strapi.log.info(`Sending revalidation request for tag: ${tag} (${action})`);

              const res = await fetch(`${frontendUrl}/api/revalidate?tag=${tag}&secret=${secret}`, {
                method: 'GET',
              });
              
              if (res.ok) {
                strapi.log.info(`Successfully triggered revalidation for tag: ${tag}`);
              } else {
                const body = await res.text();
                strapi.log.error(`Failed to revalidate tag: ${tag}. Status: ${res.status}. Response: ${body}`);
              }
            } else {
               strapi.log.warn(`No pluralName (tag) found for ${model.uid}`);
            }
          } catch (error) {
            strapi.log.error(`Error processing lifecycle event for ${model.uid}:`, error);
          }
        }
        
        // Handle media library updates (images/files)
        if (model.uid === 'plugin::upload.file') {
          // Since we don't know which content types use the updated file, 
          // we revalidate all user-defined content types (api::) to be safe.
          const apiContentTypes = Object.values(strapi.contentTypes).filter(
            (ct: any) => ct.uid.startsWith('api::')
          );
          
          const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
          const secret = process.env.REVALIDATION_TOKEN;

          if (!secret) {
             strapi.log.warn('REVALIDATION_TOKEN not set, skipping revalidation request for file upload');
             return;
          }

          for (const ct of apiContentTypes) {
             // @ts-ignore
             const tag = ct.info.pluralName;
             if (tag) {
               try {
                  const res = await fetch(`${frontendUrl}/api/revalidate?tag=${tag}&secret=${secret}`, {
                    method: 'GET',
                  });
                  if (res.ok) {
                    strapi.log.info(`Successfully triggered revalidation for tag: ${tag} due to file update`);
                  }
               } catch (error) {
                  strapi.log.error(`Error revalidating ${tag} on file update:`, error);
               }
             }
          }
        }
      }
    });
  },
};
