let globalLastUpdate = Date.now();

export const setLastUpdate = (time: number) => { globalLastUpdate = time; };

export default {
  async getLastUpdate(ctx) {
    ctx.body = { timestamp: globalLastUpdate };
  },
};