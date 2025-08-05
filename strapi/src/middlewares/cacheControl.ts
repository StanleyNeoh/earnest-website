import { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    await next();

    // Check if the request is for uploads (adjust path as needed)
    if (ctx.path.startsWith('/uploads/')) {
      // Set cache control headers for 1 year (adjust as needed)
      ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
  };
};
