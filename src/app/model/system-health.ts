export interface SystemHealth {
  status: string;
  components: {
    db: {
      status: string;
      details: {
        database: string;
        validationQuery: string;
      }
    }
    diskSpace: {
      status: string,
      details: {
        total: any,
        free: number | string,
        threshold: number,
        exists: boolean
      }
    },
    ping: {
        status: string
    }
  };
}
