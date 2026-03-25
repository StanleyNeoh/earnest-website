// Simple controller export for custom route
export default {
  routes: [
    {
      method: 'GET',
      path: '/system/last-update',
      handler: 'system.getLastUpdate',
      config: {
        auth: false,
      },
    }
  ],
};